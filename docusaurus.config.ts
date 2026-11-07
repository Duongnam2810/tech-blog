import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Blog Tin Học',
  tagline: 'Khám phá tri thức. Sáng tạo mỗi ngày.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://duongnam2810.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/tech-blog/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'duongnam2810', // Usually your GitHub org/user name.
  projectName: 'tech-blog', // Usually your repo name.

  deploymentBranch: 'gh-pages',
  // $env:GIT_USER="Duongnam2810"; $env:USE_SSH="false"; npm run deploy
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Duongnam2810/tech-blog/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Duongnam2810/tech-blog/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Blog Tin Học',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/#explore', label: 'Khám phá', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tài liệu',
        },
        {
          to: '/docs/python-tutorial/bai-1-lam-quen-python',
          label: 'Python',
          position: 'left',
        },
        {to: '/blog', label: 'Bài viết', position: 'left'},
        {to: '/about', label: 'Giới thiệu', position: 'left'},
        {
          href: 'https://github.com/Duongnam2810/tech-blog',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Khám phá',
          items: [
            {label: 'Tài liệu học tập', to: '/docs/intro'},
            {label: 'Bài viết', to: '/blog'},
          ],
        },
        {
          title: 'Học tập',
          items: [
            {label: 'Python & thuật toán', to: '/docs/intro'},
            {label: 'Tài nguyên học tập', to: '/docs/intro'},
          ],
        },
        {
          title: 'Kết nối',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/Duongnam2810/tech-blog',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Blog Tin Học. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
