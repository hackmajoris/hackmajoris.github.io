// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion


const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hackmajoris\'s blog',
  tagline: 'Blogs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://hackmajoris.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  projectName: 'hackmajoris.github.io', // Usually your repo name.
  organizationName: 'hackmajoris',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'https://avatars.githubusercontent.com/u/3758212?v=4',
      navbar: {
        title: 'Hackmajoris\'s notes',
        logo: {
          alt: 'My Site Logo',
          src: 'https://avatars.githubusercontent.com/u/3758212?v=4',
        },
        items: [
        ],
      },
      prism: {
        theme: lightCodeTheme,
        additionalLanguages: ['java'],
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
