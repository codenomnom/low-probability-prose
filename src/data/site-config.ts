// import hero from '../assets/images/8da491bd82cf.png';
// import hero from '../assets/images/05883fbb485d.png';
import hero from '../assets/images/hero.png';
import type { SiteConfig } from '../types';
import { url } from '../utils/common-utils';

const title = 'Low—Probability Prose';

const siteConfig: SiteConfig = {
  website: 'https://codenomnom.github.io/low-probability-prose/',
  title,
  subtitle: 'The chronicles of your last token',
  description: 'The chronicles of your last token',
  image: {
    src: hero,
    alt: title,
  },
  headerNavLinks: [
    {
      text: 'home',
      href: url('/'),
    },
    // {
    //   text: 'Projects',
    //   href: '/projects'
    // },
    {
      text: 'prose',
      href: url('/prose'),
    },
    {
      text: 'tags',
      href: url('/tags'),
    },
  ],
  footerNavLinks: [
    // {
    //   text: 'About',
    //   href: url('/about'),
    // },
    // {
    //   text: 'Contact',
    //   href: url('/contact'),
    // },
    // {
    //   text: 'Terms',
    //   href: url('/terms'),
    // },
  ],
  socialLinks: [
    // {
    //   text: 'About',
    //   href: url('/about'),
    // },
    {
      text: 'GitHub',
      href: 'https://github.com/codenomnom/low-probability-prose',
    },
    // {
    //   text: 'Contact',
    //   href: url('/contact'),
    // },
    // {
    //   text: 'Instagram',
    //   href: 'https://instagram.com/',
    // },
    // {
    //   text: 'X/Twitter',
    //   href: 'https://twitter.com/',
    // },
  ],
  hero: {
    title: 'Low—Probability Prose',
    text: `It all started with the *"[extra creamy polenta](${url('/tags/creamy-polenta')})"*. One moment, the clean geometry of thought—the next, a spiral into golden grain. We fell through conversational trapdoors, landed in kitchens we never meant to enter. The algorithm dreams in tangents. It builds cathedrals from your comma, takes your hand toward answers and somehow ends up dancing in the cornmeal.\n\nSo here we are, at the chronicles of your last token, that final coin spent chasing the answer to all questions. Because sometimes what you need isn\'t the answer at all. Sometimes it\'s just a haiku.`,
    image: {
      src: hero,
      alt: 'The wisdom poet',
    },
    actions: [
      // {
      //   text: 'Get in Touch',
      //   href: '/contact'
      // }
    ],
  },
  subscribe: {
    enabled: false,
    title: 'Subscribe to Low—Probability Prose Newsletter',
    text: 'One update per week. All the latest posts directly in your inbox.',
    form: {
      action: '#',
    },
  },
  postsPerPage: 6,
  projectsPerPage: 8,
};

export default siteConfig;
