---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "我是简清"
  text: "一名前端技术爱好者"
  tagline: 展示技术栈与技术方案
  actions:
    - theme: brand
      text: 开始阅读
      link: /Coder/技术方案/单点登录
    - theme: alt
      text: 技术栈
      link: /Coder/技术栈/React/NextJS
  image:
    src: /logo.jpg
    alt: Jesse

features:
  
  - icon:
      src: /icons/icon_vue.svg
    link: /Coder/技术栈/Vue/vue
    title: Vue
    details: 渐进式 JavaScript 框架
  - icon:
      src: /icons/icon_react.svg
    link: /Coder/技术栈/React/NextJS
    title: React/React Native
    details: 用于构建 Web 和原生交互界面的库
  - icon:
      src: /icons/go-logo-blue.svg
    link: /Coder/技术栈/Go/Golang
    title: Go
    details: 用Go构建简单、安全、可扩展的系统
  - icon:
      src: /icons/icon_node.svg
    link: /Coder/技术栈/Node/NodeJS
    title: NodeJS
    details: JS的后台运行时环境
  - icon:
      src: /icons/icon_linux.svg
    link: /Coder/DevOps/Linux
    title: Linux
    details: 最终在此工作
  - icon:
      src: /icons/icon_docker.svg
    link: /Coder/DevOps/Docker
    title: Docker
    details: 打造一致的运行环境，Docker让部署应用变得轻松无比
  
---


<style lang="scss">
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPNav .VPImage, .VPHero .VPImage {
  border-radius: 50%;
}

.VPFeatures .VPLink {
  .VPImage {
    min-height: 48px;
  }
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>