// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// @ts-ignore
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DevStream',
  tagline: 'DevStream: the open-source DevOps toolchain manager (DTM)',
  url: 'https://www.devstream.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'devstream-io', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, // disable the docs plugin
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

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
      },
    ],
    function tailwindcss() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
    // @ts-ignore
    customizedSvgo,
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
          src: 'img/logo-1024.png',
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
            label: 'Community',
            docsPluginId: 'community',
          },
          {
            href: 'https://blog.devstream.io',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://medium.com/devstream',
            position: 'left',
            label: 'Medium',
          },
          {
            href: 'https://github.com/devstream-io/devstream',
            label: 'GitHub',
            position: 'left',
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
                href: 'https://docs.devstream.io',
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
                href: 'https://blog.devstream.io',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/devstream-io/devstream',
              },
            ],
          },
        ],
        copyright: `
        <img style="height:50px; margin-bottom: 10px; margin-top: 10px" alt="Cloud Native Computing Foundation" src= "/img/cncf-white-logo.svg" />
        <br />
        We are a Cloud Native Computing Foundation sandbox project.
        <br />
        <strong>© Copyright The DevStream Authors ${new Date().getFullYear()}</strong>
        <br />
        <br />
        © ${new Date().getFullYear()} The Linux Foundation. All rights reserved. The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/trademark-usage/"> Trademark Usage</a> page.
      `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

function customizedSvgo() {
  return {
    name: 'docusaurus-svgo',
    configureWebpack(config) {
      // allow svgr to use svgo config file
      for (const rule of config.module.rules) {
        if (
          typeof rule === 'object' &&
          rule.test.toString() === '/\\.svg$/i'
        ) {
          for (const nestedRule of rule.oneOf) {
            if (nestedRule.use instanceof Array) {
              for (const loader of nestedRule.use) {
                if (
                  typeof loader === 'object' &&
                  loader.loader === require.resolve('@svgr/webpack')
                ) {
                  if (typeof loader.options === 'object') {
                    loader.options.svgoConfig = null;
                  }
                }
              }
            }
          }
        }
      }
      return {
        mergeStrategy: {
          'module.rules': 'replace',
        },
        module: {
          rules: config.module.rules,
        },
      };
    },
  };
}
module.exports = config;
