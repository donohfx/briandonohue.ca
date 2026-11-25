---
title: Night Atlas and Harbour Watch
summary: A live chart of Nova Scotia as my Linux desktop background, and a hosted version anyone can browse.
year: '2026'
order: 0
link: https://harbour.briandonohue.ca
linkLabel: harbour.briandonohue.ca
---

This is one chart in two places: a theme for my own desktop, and a website.

## Night Atlas, the desktop

Night Atlas is my Linux desktop theme. The background is a live nautical-style chart of Nova Scotia that sits under my windows: ships report their positions, lighthouses blink in their charted colours, and at night the sweeping beams stop at the shoreline.

<figure class="shot">
  <img src="/night-atlas-desktop.jpg" alt="A Linux desktop with the Night Atlas chart of Nova Scotia as its background, under a slim top bar" width="1600" height="900" loading="lazy" decoding="async" />
  <figcaption>Night Atlas as my desktop background</figcaption>
</figure>

I can drag and zoom the map, jump between saved views from the bar, and the rest of the desktop takes its colours from the same palette. It runs on Hyprland with the Noctalia shell, and the map pauses when windows cover it.

## Harbour Watch, the website

[Harbour Watch](https://harbour.briandonohue.ca) is the hosted version, for anyone who doesn’t want to rebuild their desktop to look at ferries. Look around the coast, switch between chart and night, or take the tour into Halifax Harbour. It runs on its own small server, separate from my computer.

<figure class="shot">
  <img src="/night-atlas.jpg" alt="Harbour Watch in chart mode: Nova Scotia in dark green, ringed by lighthouse lights" width="1600" height="880" loading="lazy" decoding="async" />
  <figcaption><a href="https://harbour.briandonohue.ca">harbour.briandonohue.ca</a></figcaption>
</figure>

## The fiddly part

Getting the lighthouses to feel right. Charts tell you how a light flashes, not whether anything actually turns, so the beams are a best guess. Please don’t navigate by it.

I built both with Claude Code and OpenAI Codex doing much of the coding. The [code and desktop setup are on GitHub](https://github.com/donohfx/night-atlas), with credits for the data behind it.
