import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jesse's blog",
  description: "Jesse's blog",
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: generateSidebar({
      documentRootPath: '/docs',
      collapsed: false,
      sortMenusByFrontmatterOrder: true
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FriendlyJesse' }
    ],

    editLink: {
      pattern: 'https://github.com/FriendlyJesse/FriendlyJesse.github.io/tree/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 简清`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      level: 'deep',
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    
  }
})
