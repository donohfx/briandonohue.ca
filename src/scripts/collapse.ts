// The page collapses: every word in the main column falls into a pile at the
// bottom of the screen, then can be tidied back into place.
// Loaded only when the easter egg fires, so it costs nothing otherwise.
import Matter from 'matter-js';

type Piece = { el: HTMLElement; body: Matter.Body; x0: number; y0: number; still: number; anchor: [number, number, number]; drawn: [number, number, number] };

const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG']);

function wrapWords(root: HTMLElement): HTMLElement[] {
  const pieces: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p || SKIP.has(p.tagName) || !n.textContent?.trim() || p.closest('.cel')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of node.textContent!.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.append(part);
      } else {
        const s = document.createElement('span');
        s.className = 'fall';
        s.textContent = part;
        frag.append(s);
        pieces.push(s);
      }
    }
    node.replaceWith(frag);
  }
  // Images fall too.
  root.querySelectorAll<HTMLElement>('img').forEach((img) => pieces.push(img));
  return pieces;
}

function unwrap(root: HTMLElement) {
  root.querySelectorAll('span.fall').forEach((s) => s.replaceWith(s.textContent ?? ''));
  root.normalize();
}

// roots: every word inside falls on its own.
// floor: whole elements (the footer) that start at the bottom of the screen and
//   take the weight of everything else.
// late: whole elements (the header) that come down last, on top of the pile.
export async function collapse(
  roots: HTMLElement[],
  { floor = [], late = [] }: { floor?: HTMLElement[]; late?: HTMLElement[] } = {},
): Promise<() => Promise<void>> {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  document.documentElement.classList.add('collapsing');
  const chunks = [...floor, ...late];
  const isFloor = new Set(floor);
  const all = [...roots.flatMap((r) => wrapWords(r)), ...chunks];
  chunks.forEach((c) => c.classList.add('chunk'));
  floor.forEach((c) => c.classList.add('floor'));
  let top = 0;
  // The footer words keep their own layout and are set down on the floor as a block;
  // the scale bar is laid across their tops.
  const legRects = floor.filter((el) => !el.classList.contains('neatline')).map((el) => el.getBoundingClientRect());
  const legsTop = Math.min(...legRects.map((r) => r.top + r.height * 0.09));
  const legsBottom = Math.max(...legRects.map((r) => r.bottom - r.height * 0.09));
  const setDown = legRects.length ? vh - 1 - legsBottom : 0;
  // Words below the footer's new top start above the screen and rain down.
  const cutoff = legRects.length ? legsTop + setDown - 12 : vh;

  // Everything falls. Text above the screen drops from where it is; text below
  // the screen is lifted above it, in order, so it rains down after.
  const pieces: Piece[] = [];
  const { Engine, Bodies, Composite, Body } = Matter;
  // Extra solver passes so a heavy pile doesn't squash the footer through the floor.
  const engine = Engine.create({ gravity: { x: 0, y: 1.1 }, positionIterations: 16, velocityIterations: 8 });
  const wall = { isStatic: true, friction: 0.9 };
  Composite.add(engine.world, [
    // Thick and tall, so nothing squeezed hard enough can pop out the other side.
    Bodies.rectangle(vw / 2, vh + 500, vw * 3, 1000, wall),
    Bodies.rectangle(-500, vh - 10000, 1000, 22000, wall),
    Bodies.rectangle(vw + 500, vh - 10000, 1000, 22000, wall),
  ]);

  // Measure everything before anything moves. Words below the footer line get
  // stacked above the highest word on the page, so nothing starts overlapping.
  const rects = new Map(all.map((el) => [el, el.getBoundingClientRect()]));
  const highest = Math.min(0, ...roots.flatMap((r) => r.getClientRects().length ? [r.getBoundingClientRect().top] : []));

  for (const el of all) {
    const r = rects.get(el)!;
    if (r.width < 1 || r.height < 1) continue;
    el.classList.add('falling');
    const x0 = r.left + r.width / 2;
    const y0 = r.top + r.height / 2;
    const isLine = el.classList.contains('neatline');
    const h = Math.max(isLine ? 8 : 0, r.height * 0.82);
    let startY: number;
    // Footer words are already on the floor, slumped where they stand, holding up the
    // scale bar, which holds up everything else.
    if (isFloor.has(el)) startY = isLine ? legsTop + setDown - h / 2 - 3 : y0 + setDown;
    else if (late.includes(el)) startY = top - 160 - late.indexOf(el) * 70;
    else {
      startY = y0 > cutoff ? highest - 60 - (y0 - cutoff) : y0;
      top = Math.min(top, startY);
    }
    const body = Bodies.rectangle(x0, startY, r.width, h, {
      isStatic: isFloor.has(el),
      angle: isFloor.has(el) ? (Math.random() - 0.5) * (isLine ? 0.012 : 0.06) : 0,
      friction: 0.6,
      frictionAir: 0.012,
      restitution: 0.15,
      density: 0.001,
      chamfer: { radius: Math.min(3, r.height / 4) },
    });
    Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: Math.random() * 0.5 });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
    pieces.push({ el, body, x0, y0, still: 0, anchor: [x0, startY, 0], drawn: [NaN, NaN, NaN] });
  }
  Composite.add(engine.world, pieces.map((p) => p.body));
  document.querySelectorAll<HTMLElement>('main .shot, main .then-now, main .index, main .quote, main .path ol, main .path li').forEach((el) => el.classList.add('unframed'));

  let running = true;
  let last = performance.now();
  const started = last;
  // Only repaint a piece when it has visibly moved, so sub-pixel shuffling in the
  // pile doesn't read as trembling.
  const draw = () => {
    for (const p of pieces) {
      const { x, y } = p.body.position;
      const a = p.body.angle;
      const [dx, dy, da] = p.drawn;
      if (Math.abs(x - dx) < 0.4 && Math.abs(y - dy) < 0.4 && Math.abs(a - da) < 0.004) continue;
      p.drawn = [x, y, a];
      p.el.style.transform = `translate(${x - p.x0}px, ${y - p.y0}px) rotate(${a}rad)`;
    }
  };
  const tick = (now: number) => {
    if (!running) return;
    Engine.update(engine, Math.min(now - last, 32));
    // Words dropping from far up the page would punch through the pile.
    for (const p of pieces) {
      if (p.body.isStatic) continue;
      const v = p.body.velocity;
      if (v.y > 22) Body.setVelocity(p.body, { x: v.x, y: 22 });
      // Once a piece has landed and barely moved for half a second, it's done: freeze
      // it. Anything falling later lands on it like it would on the floor. Judged on
      // net movement, because the solver makes speeds flicker frame to frame.
      if (++p.still < 30) continue;
      const [ax, ay, aa] = p.anchor;
      const { x, y } = p.body.position;
      if (now - started > 1200 && Math.hypot(x - ax, y - ay) < 3 && Math.abs(p.body.angle - aa) < 0.05) {
        Body.setStatic(p.body, true);
      }
      p.anchor = [x, y, p.body.angle];
      p.still = 0;
    }
    last = now;
    draw();
    // Let it settle, then stop burning battery.
    if (now - started < 20000) requestAnimationFrame(tick);
  };
  if (reduced) {
    for (let i = 0; i < 900; i++) Engine.update(engine, 16);
    draw();
  } else {
    requestAnimationFrame(tick);
  }

  return async function tidy() {
    running = false;
    // Rebuild at the top of the page, header included. Jump there without moving the
    // pile on screen, then let every piece fly back to its place.
    const s = window.scrollY;
    window.scrollTo({ top: 0, behavior: 'instant' });
    await Promise.all(
      pieces.map((p, i) =>
        p.el
          .animate(
            [
              { transform: `translate(${p.body.position.x - p.x0}px, ${p.body.position.y - p.y0 - s}px) rotate(${p.body.angle}rad)` },
              { transform: 'translate(0, 0) rotate(0rad)' },
            ],
            { duration: reduced ? 0 : 700, delay: reduced ? 0 : (i % 40) * 12, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' },
          )
          .finished.then(() => (p.el.style.transform = '')),
      ),
    );
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    document.querySelectorAll('.unframed').forEach((el) => el.classList.remove('unframed'));
    all.forEach((el) => {
      el.style.visibility = '';
      el.style.transform = '';
      el.classList.remove('falling');
      el.getAnimations().forEach((a) => a.cancel());
    });
    roots.forEach((r) => unwrap(r));
    chunks.forEach((c) => c.classList.remove('chunk', 'floor'));
    document.documentElement.classList.remove('collapsing');
  };
}
