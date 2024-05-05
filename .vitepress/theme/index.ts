import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './css/custom.css'
import Carousel from './components/Carousel.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Carousel', Carousel)
  }
} satisfies Theme