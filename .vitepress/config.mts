import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jesse's blog",
  description: "Jesse's blog",
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  base: '/Blog/',
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Go',
        items: [
          { text: 'Golang', link: '/Go/Golang' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FriendlyJesse' }
    ],

    outline: {
      level: 'deep'
    }
  }
})
