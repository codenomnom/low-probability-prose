import avatar from '../assets/images/avatar.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
  website: 'https://codenomnom.github.io/low-probability-prose/',
  avatar: {
    src: avatar,
    alt: 'Ethan Donovan'
  },
  title: 'Low—Probability Prose',
  subtitle: 'Minimal Astro.js theme',
  description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
  image: {
    src: '/dante-preview.jpg',
    alt: 'Dante - Astro.js and Tailwind CSS theme'
  },
  headerNavLinks: [
    {
      text: 'home',
      href: '/'
    },
    // {
    //   text: 'Projects',
    //   href: '/projects'
    // },
    {
      text: 'prose',
      href: '/prose'
    },
    {
      text: 'tags',
      href: '/tags'
    }
  ],
  footerNavLinks: [
    {
      text: 'About',
      href: '/about'
    },
    {
      text: 'Contact',
      href: '/contact'
    },
    {
      text: 'Terms',
      href: '/terms'
    }
  ],
  socialLinks: [
    {
      text: 'Dribbble',
      href: 'https://dribbble.com/'
    },
    {
      text: 'Instagram',
      href: 'https://instagram.com/'
    },
    {
      text: 'X/Twitter',
      href: 'https://twitter.com/'
    }
  ],
  hero: {
    title: 'Low—Probability Prose',
    text: 'It all started with the *"[extra creamy polenta](/tags/creamy-polenta)"*. The one thing I carelessly said "huh, what\'s that?" to. Months later I found where Gemini saved that as a profile description. It explained the "_after you fix the tent, around the campfire, you can finally do your **extra creamy polenta**!_" Or "_that\'s a really good example of manhood, exactly like caring for your body and providing it with that **extra creamy polenta**!_" \n\n So here we are, at the monument of your last token, the one being spent on figuring out the answer to all questions. Because sometimes all you need is just a haiku.',
    // image: {
    //   src: hero,
    //   alt: 'A person sitting at a desk in front of a computer'
    // },
    actions: [
      // {
      //   text: 'Get in Touch',
      //   href: '/contact'
      // }
    ]
  },
  subscribe: {
    enabled: false,
    title: 'Subscribe to Dante Newsletter',
    text: 'One update per week. All the latest posts directly in your inbox.',
    form: {
      action: '#'
    }
  },
  postsPerPage: 6,
  projectsPerPage: 8
};

export default siteConfig;
