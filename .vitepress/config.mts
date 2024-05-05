import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jesse's blog",
  description: "Jesse's blog",
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }],
    ['link', { rel: 'stylesheet', href: '//unpkg.com/element-plus/dist/index.css' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/logo.jpg', width: 24, height: 24 },
    nav: [
      { text: '主页', link: '/' },
      { text: '旅行', link: '/Travel/庐山之旅' },
      { text: '菜谱', link: '/Cookbook/葱烧鸡腿' },
    ],

    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        scanStartPath: 'Coder',
        resolvePath: '/Coder/',
        collapsed: false,
        sortMenusByFrontmatterOrder: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'Travel',
        resolvePath: '/Travel/',
        collapsed: false,
        sortMenusByFrontmatterOrder: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath: 'Cookbook',
        resolvePath: '/Cookbook/',
        collapsed: false,
        sortMenusByFrontmatterOrder: true
      }
    ]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FriendlyJesse' }
    ],

    editLink: {
      pattern: 'https://github.com/FriendlyJesse/FriendlyJesse.github.io/tree/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '备案信息',
      copyright: `版权所有 © 2017-${new Date().getFullYear()} 简清`
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

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
    
  }
})
