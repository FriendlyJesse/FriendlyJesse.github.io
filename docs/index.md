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
      link: /技术方案/单点登录
    - theme: alt
      text: 技术栈
      link: /技术栈/NextJS
  image:
    src: /logo.jpg
    alt: Jesse

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPImage {
  border-radius: 50%;
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