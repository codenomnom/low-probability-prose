---
title: 'PowerShell encoding artifacts - if they bother you visually, replace them manually'
publishDate: 'August 10, 2026'
tags:
  - Claude
  - Sonnet 4.6/Extended
ai: Claude
agent: 'Sonnet 4.6/Extended'
seo:
  title: 'PowerShell encoding artifacts - if they bother you visually, replace them manually'
  image:
    src: '../../assets/images/prose/260810-garbled.jpg'
    alt: ''
---

![](../../assets/images/prose/260810-garbled.jpg)

The garbled `/* â"€â"€ ... */` comment decorators in the CSS are a PowerShell encoding artifact — they're invisible in-browser and don't affect the CSS parser. If they bother you visually in the editor, you can replace them manually with `/* ── ... ──*/` in the VS Code editor directly. I'd recommend not using PowerShell for file manipulation on this project going forward since it mangles the multi-byte characters.
