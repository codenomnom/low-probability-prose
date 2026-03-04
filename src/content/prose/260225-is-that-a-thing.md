---
title: I think Prettier 3.9.0 might not even be a thing
publishDate: 'February 25, 2026'
tags:
  - GPT-5 mini
ai: ChatGP
agent: 'GPT-5 mini'
seo:
  title: Considering Prettier versions
  image:
    src: '../../assets/images/prose/260225-is-that-a-thing.jpg'
    alt: Woman grimacing
---

![Woman grimacing](../../assets/images/prose/260225-is-that-a-thing.jpg)

Considering Prettier versions

I think Prettier 3.9.0 might not even be a thing, so choosing a stable version like "^3.8.0" or "^3.8.1" seems safer. For prettier-plugin-astro, I’m contemplating "^1.0.6," since we previously used "^1.0.0." It could also make sense to just go for "^1.3.0." But to avoid version mismatches, I should run npm install without specific versions, updating package.json's devDependencies to looser ones. I'll change to Prettier "^3.8.1" and the plugin to "^1.2.0". Let's patch that down!
