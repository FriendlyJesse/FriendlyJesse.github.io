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

    outline: {
      level: 'deep'
    }
  }
})
