import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import tailwindPlugin from './plugins/tailwind-config.cjs';

const config: Config = {
  title: '주노준호 블로그',
  tagline: '흩어진 생각을 모으는 공간',
  favicon: '/favicon.ico',

  url: 'https://junojunho.com',
  baseUrl: '/',

  organizationName: 'cnaa97',
  projectName: 'cnaa97.github.io',
  deploymentBranch: 'master',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // docs: {
        //   sidebarPath: './sidebars.ts',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: 'https://github.com/cnaa97/cnaa97.github.io/',
        // },
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/cnaa97/cnaa97.github.io/', // TODO
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-9J0KBXN45J',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    tailwindPlugin,
  ],

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'fb:app_id',
        content: '&#123;1758797218023586&#125;"/>',
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `document.addEventListener('DOMContentLoaded', function() {
          if (!document.getElementById('fb-root')) {
            const fbRootDiv = document.createElement('div');
            fbRootDiv.id = 'fb-root';
            document.body.prepend(fbRootDiv);
          }
        });`,
    },
    {
      tagName: 'script',
      attributes: {
        async: 'true',
        defer: 'true',
        id: 'facebook-jssdk',
        src: 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v21.0&appId=1758797218023586',
      },
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '주노준호 블로그',
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        { to: '/about', label: 'About', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Junho Park`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
