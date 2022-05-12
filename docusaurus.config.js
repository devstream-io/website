// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DevStream',
  tagline: 'DevStream: the open-source DevOps toolchain manager (DTM)',
  url: 'https://www.devstream.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'devstream-io', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/devstream-io/website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/devstream-io/website/tree/main/',
          blogSidebarCount: 100,
          blogSidebarTitle: 'All our blogs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      // You can omit a locale (e.g. fr) if you don't need to override the defaults
      fa: {
        direction: 'rtl',
      },
    },
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'DevStream',
        logo: {
          alt: 'DevStream Logo',
          src: 'img/logo-120px.jpg',
        },
        items: [
          {
            href: 'https://docs.devstream.io',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Community'
          },
          {href: 'https://blog.devstream.io', label: 'Blog', position: 'left'},
          {
            href: 'https://medium.com/devstream',
            position: 'left',
            label: 'Medium',
          },
          {
            href: 'https://dev.to/devstream',
            position: 'left',
            label: 'Dev.to',
          },
          {
            href: 'https://github.com/devstream-io/devstream',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/index',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/devstream-io/shared_invite/zt-16tb0iwzr-krcFGYRN7~Vv1suGZjdv4w',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/devstream-io/devstream',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DevStream@Merico Inc, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
