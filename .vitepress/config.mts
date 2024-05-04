import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jesse's blog",
  description: "Jesse's blog",
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: '技术方案',
        items: [
          { text: '单点登录', link: '/技术方案/单点登录' },
          { text: '订单ID生成', link: '/技术方案/订单ID生成' },
          { text: '订单超时自动取消如何实现？', link: '/技术方案/订单超时自动取消如何实现？' },
          { text: '高并发', link: '/技术方案/高并发' },
          { text: '封装Axios与制定Service层', link: '/技术方案/封装Axios与制定Service层' },
          { text: '前端动画展示方案', link: '/技术方案/前端动画展示方案' },
          { text: 'Antd InputNumber 强制两位小数与千分位', link: '/技术方案/Antd InputNumber 强制两位小数与千分位' },
        ]
      },
      {
        text: '技术栈',
        items: [
          {
            text: 'React',
            items: [
              { text: 'React dom', link: '/React/React dom' },
              { text: 'React native', link: '/React/React native' },
              { text: 'NextJS', link: '/React/NextJS' },
            ]
          },
          {
            text: 'Go',
            items: [
              { text: 'Golang', link: '/Go/Golang' },
              { text: 'Gin', link: '/Go/Gin' },
              { text: 'Gorm', link: '/Go/Gorm' },
              { text: 'Casbin', link: '/Go/Casbin' },
              { text: 'GRPC', link: '/Go/GRPC' },
              { text: 'RabbitMQ', link: '/Go/RabbitMQ' },
              { text: 'Go test', link: '/Go/Go test' },
              { text: '自动化测试与爬虫', link: '/Go/自动化测试与爬虫' },
              { text: 'Standard library', link: '/Go/Standard library' },
            ]
          }
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
