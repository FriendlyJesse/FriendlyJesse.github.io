# NextJS
## 路由
`Next.js`使用了一个基于文件系统的路由器，其中文件夹用于定义路由。路由是嵌套文件夹的单一路径，遵循文件系统层次结构，从根文件夹一直到包含 `page.tsx`的文件
### 嵌套路由
路由中的每个文件夹代表一个路由段。文件夹嵌套之后，每个嵌套的文件夹都映射为**URL**路径。
![](https://cdn.nlark.com/yuque/0/2023/png/21870146/1692620891102-a1f89004-40e9-44cc-9feb-f9464dd3adab.png#averageHue=%23f6f6f6&clientId=ufa3f19e3-69fe-4&from=paste&id=ub95bc36d&originHeight=594&originWidth=1600&originalType=url&ratio=1.25&rotation=0&showTitle=false&status=done&style=none&taskId=u76ae778c-269a-4f57-82d8-d70b3ca8e92&title=)
### 动态路由
#### 普通动态路由
`[folder]`：动态路由
路由：`/Dynamic/1`
_/pages/Dynamic/[state].tsx/_
```tsx
import { useRouter } from 'next/router'

export default function Dynamic () {
  const router = useRouter()
  console.log(router.query) // { state: '1' }
  return (
    <div>dynamic</div>
  )
}
```
#### 获取所有动态路由
`[...folder]`：获取所有的动态路由
路由：`/Dynamic/1/2/3`
_/pages/Dynamic/[...state].tsx/_
```tsx
const router = useRouter()
console.log(router.query) // state: ['1', '2', '3']
```
#### 路由
`[[...folder]]`：将路由分段获取

| **Route** | **Example URL** | **params** |
| --- | --- | --- |
| `pages/shop/[[...slug]].js` | /shop | `{}` |
| `pages/shop/[[...slug]].js` | /shop/a | `{ slug: ['a'] }` |
| `pages/shop/[[...slug]].js` | /shop/a/b | `{ slug: ['a', 'b'] }` |
| `pages/shop/[[...slug]].js` | /shop/a/b/c | `{ slug: ['a', 'b', 'c'] }` |

### 链接和导航
#### Link 组件跳转
```tsx
import React from 'react'
import Link from 'next/link'

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <section>
      我是父组件
      <Link href={'/Dynamic/1'}>去动态页</Link>
      <Link href={'/'}>去首页</Link>
      {children}
    </section>
  )
}
```
传递对象跳转：
```tsx
import Link from 'next/link'
 
function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
 
export default Posts
```
#### hook 跳转
```tsx
import React from 'react'
import Link from 'next/link'

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <section>
      我是父组件
      <Link href={'/Dynamic/1'}>去动态页</Link>
      <Link href={'/'}>去首页</Link>
      {children}
    </section>
  )
}
```
#### 浅跳转
浅跳转可以让路由变动，而不会触发状态更新。而路由会触发更新。
```tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
 
// Current URL is '/'
function Page() {
  const router = useRouter()
 
  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])
 
  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}
 
export default Page
```
需要注意的是，浅跳转只能跳当前页面。
### Api 路由
所谓的`api路由`就是指可以在`Next.js`中编写`Node.Js`的代码。
_/pages/api/upload.ts_
```typescript
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'Hello world!'
  })
}
```
之后我们就可以在：`http://localhost:3000/api/upload`获取到相关的数据。
官方文档：
[Routing: API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
## 获取数据
### CSR(Client Side Rendering)
CSR 也就是客户端渲染，需要使用 JavaScript，调用接口（API）来获取数据，这种方式前后端完全分离。
### SSG(Static Site Generation)
SSG 也就是静态站点生成，为了减缓服务器压力，我们可以在构建时生成静态页面，备注：Next.js 生成的静态页面与普通的静态页面是不一样的，也是拥有 SPA 的能力，切换页面用户不会感受到整个页面在刷新。
**使用 getStaticProps**

- 声明位置：每个 page 不是默认导出一个函数么？把getStaticProps声明在这个函数旁边即可。
- 别忘了加 export
- return props
```tsx
export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props : {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}

```
**静态化的时机：**

- 在**开发环境**，每次请求都会运行一次 getStaticProps，这是为了方便你修改代码重新运行。
- 在**生产环境**，getStaticProps 只在 build 时运行一次，这样可以提供一份 HTML 给所有用户下载

**三种文件类型：**

- posts.html含有静态内容，用于用户直接访问
- posts.js 也含有静态内容，用于快速导航 (与 HTML 对应)
- posts.json 含有数据，跟 posts.js结合得到界面

使用getStaticProps 可以获得静态网页的数据，传递给 Page 函数，便可以生成静态页面。博客列表 URL 是固定的，那么不是固定 URL 的页面，要生成静态页面怎么办呢？比如博客详情页。
```tsx
// pages/blog/[id].tsx
export async function getStaticPaths() {
  const articles = await fetch('https://localhost:3000/api/articles').then((res)=>res.json());
  return {
    paths: articles.map((p) => ({
      params: {
        id: p.id.toString(),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const res = await fetch(`https://localhost:3000/api/articles/${params.id}`).then((res)=>res.json());

  return {
    props: { data: res },
  };
};

export default function Page({ data }: PageProps) {
  return (
    <div>
      <h1>{data.tltle}</h1>
      <div>{data.content}</div>
    </div>
  );
}

```
我们可以使用 getStaticPaths 获得所有文章的路径，返回的paths 参数会传递给getStaticProps，在 getStaticProps中，通过 params 获得文章 id， Next.js 会在构建时，将paths 遍历生成所有静态页面。
SSG 的优点就是快，部署不需要服务器，任何静态服务空间都可以部署，而缺点也是因为静态，不能动态渲染，每添加一篇博客，就需要重新构建。
### SSR(Server Side Rendering)
**getServerSideProps** 服务器端渲染模式下使用，会在每次请求时先获取数据，接着重新生成 html 后再将页面返回到客户端。
```tsx
const index: NextPage<Props> = (props) =>{
  const { browser } = props
  return (
    <div> 你的浏览器是 {browser.name} </div>
  )
}
export default index

export const getServerSideProps: GetServerSideProps = async (context) => {
  const us = context.req.header('use-agent')
  const result = new UAParser(ua).getResult()
  return {
    props:{
      browser: result.browser
    }
  }
}

```
值得注意的是，在`page`函数中，不能使用传统客户端的`window`等对象，而应该放在`userEffect`之中使用。
SSR 解决了白屏问题和 SEO 问题，但是也不是完美的。
SSR 存在的问题：

1. 当请求量增大时，每次重新渲染增加了服务器的开销。
2. 需要等页面中所有接口请求完成才可以返回 html，虽不是白屏，但完成hydrate之前，页面也是不可操作。
### ISR（Incremental Static Regeneration）
于是有了一另一种方案 ISR，增量静态生成，在访问时生成静态页面，在 Next.js 中，它比 SSG 方案只需要加了一个参数revalidate
上面代码表示，当访问页面时，发现 20s 没有更新页面就会重新生成新的页面，但当前访问的还是已经生成的静态页面，也就是：是否重新生成页面，需要根据上一次的生成时间来判断，并且数据会延迟 1 次。
我们可以在页面上显示生成时间：
```tsx
function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const t = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setTime(time);
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);

  return <h1>当前时间：{time}</h1>;
}

export default function Page({ data, time }) {
  return (
    <div style={{ width: 500, margin: "0 auto" }}>
      <h1>
        页面生成时间：<span>{time}</span>
      </h1>
      <Time />
      {data.map((item) => (
        <div key={item.id}>
          <Link href={`/blog/${item.id}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const res = await getList();

  const time = new Date().toLocaleTimeString();

  return {
    props: { data: res, time },
    revalidate: 20,
  };
};

```
### Server component
Server component 是 React18 提供的能力， 与上面的 SSR 不同，相当于是流式 SSR。
传统 SSR 执行步骤

- 在服务器上，获取整个应用的数据。
- 在服务器上，将整个应用程序数据渲染为 HTML 并发送响应。
- 在浏览器上，加载整个应用程序的 JavaScript 代码。
- 在客户端，将 JavaScript 逻辑连接到服务端返回的 HTML（这就是“水合”）。

比如一个传统的博客页面采用 SSR 的方式使用 getServerSideProps 的方式渲染，那么就需要等 3 个接口全部返回才可以看到页面。
```tsx
export async function getServerSideProps() {
  const list = await getBlogList()
  const detail = await getBlogDetail()
  const comments = await getComments()

  return { props: { list,detail,comments } }
}
```
如果评论接口返回较慢，那么整个程序就是待响应状态。
我们可以在 Next.js 13 中开启 app 目录来，使用 Suspense开启流渲染的能力，将 Comments 组件使用 Suspense 包裹。
```tsx
import { SkeletonCard } from '@/ui/SkeletonCard';
import { Suspense } from 'react';
import Comments from './Comments';

export default function Posts() {
  return (
    <BlogList />
    <section>
     <BlogDetail />
      <Suspense
        fallback={
          <div className="w-full h-40 ">
            <SkeletonCard isLoading={true} />
          </div>
        }
      >
        <Comments />
      </Suspense>
    </section>
  );
}
```
组件数据请求使用 use API，就可以实现流渲染了。
```tsx
import { use } from 'react';

async function fetchComment(): Promise<string> {
  return fetch('http://www.example.com/api/comments').then((res)=>res.json())
}

export default function Comments() {
  let data = use(fetchComment());
  return (
    <section>
      {data.map((item)=><Item key={item.id}/>)}
    </section>
  );
}
```
整个渲染流程如下图：
![](https://cdn.nlark.com/yuque/0/2023/webp/21870146/1692695056375-8a169694-5f09-4c97-aa40-2deff29f71ad.webp#averageHue=%23f4f3ed&clientId=u272d329d-3072-4&from=paste&id=ueba37574&originHeight=630&originWidth=611&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua47f5010-21e6-466e-ab04-9fdd5c2e1a0&title=)

- 灰色部分代表 HTML 字符串返回
- loading 状态表示当前部分还在请求
- 绿色部分代表注水成功，页面可以交互

因此，Server component 解决了 SSR 中的 3 个问题

- 不必在服务器上返回所有数据才开始返回 html，相反我们可以先返回一个 HTML 结构，相当于骨架屏。
- 不必等待所有 JavaScript 加载完毕才能开始补水。相反，我们可以利用代码拆分与服务器渲染结合使用，React 将在相关代码加载时对其进行水合。
- 不必等待所有组件水合完成，页面才可以交互。
## App Router(next 14)
### Data Fetch
#### Client Component
```tsx
"use client"

export default async function page({ params: { locale } }: { params: { locale: Locale } }) {
  useEffect(() => {
    // get data
  }, [])
}
```
`client component`获取数据跟普通的获取没啥区别，值得注意的是 `next`默认是 `server component`，需要声明 `use client`。
#### Server Component
Next 官方推荐使用 `fetch`，但是 `axios` 同样能用于服务端。
```tsx
async function getData () {
  const { data } = await getMemberList()
  return data.data.list
}

export default async function page({ params: { locale } }: { params: { locale: Locale } }) {
  const list = await getData()
  return (
    <div className={styles.team}>
      <div className='imgWrapper'>
        <img src='/images/Team-3.jpg' alt='icon' />
      </div>
      <div className='alignwide'>
        <h1>我们的团队</h1>
        <Row gutter={[10, 10]} style={{width: '100%'}}>
          {
            list.map((item: any) => (
              <Col key={item.ID} md={8} sm={24} xs={24}>
                <Staff avatar={getImgUrl(item.avatar)} name={lt(locale, item.name)} title={lt(locale, item.title)} />
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}
```

### i18n
#### 安装依赖
```bash
npm install i18next react-i18next i18next-resources-to-backend next-i18n-router
```

- `react-i18next`、`i18next`：i18n 基础包
- `i18next-resources-to-backend`：加载资源到 server
- `next-i18n-router`用于在 app router 中实现国际化路由和地区检测
#### 改造项目
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1710753109443-5f58909b-42da-417d-8b1c-2523c3da9a04.png#averageHue=%23242930&clientId=u32c4c206-428e-4&from=paste&height=158&id=ue6f5a13d&originHeight=316&originWidth=569&originalType=binary&ratio=2&rotation=0&showTitle=false&size=18205&status=done&style=none&taskId=u468cfdbe-b3dc-41f2-9fce-6b74ca923f9&title=&width=284.5)

- `/app/[locale]`用于传递 locale 路由参数
- `/app/lib/i18n/config.ts`i18n配置
- `/app/lib/i18n/index.ts`翻译函数
- `/app/locales`本地翻译资源
- `_/middleware.ts_`_这里通过 _`next-i18n-router`国际化路由
- `_/app/ui/TranslationsProvider/index.tsx_`_i18n provider for client render_

_/app/lib/i18n/config.ts_
```tsx
export default {
  locales: ['en-US', 'zh-CN'],
  defaultLocale: 'en-US',
  prefixDefault: false
}
```
_/app/lib/i18n/index.ts_
```tsx
import { createInstance, i18n } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import i18nConfig from './config'

// Local i18n
export async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: any
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`) // 读取翻译资源
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  };
}

// BackEnd i18n
export type Locale = 'en-US' | 'zh-CN'
export type LocalizedText<T extends Locale> = {
  [key in T]: string;
}
export function getLocaleText<T extends Locale>(
  locale: T, text: LocalizedText<T>, tryonly?: boolean,
): string {
  if (!text[locale] || text[locale] === '' || text[locale] === '\n') {
    if (!tryonly) {
      for (const key in text) {
        if (text[key]) {
          return text[key];
        }
      }
    } else {
      return '';
    }
  }
  return text[locale];
}

export const lt = getLocaleText
```
_/middleware.ts_（根目录，不要搞错了）
```tsx
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './app/lib/i18n/config';

export function middleware(request: any) {
  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
```
_/app/ui/TranslationsProvider/index.tsx_
```tsx
'use client'

import { I18nextProvider } from 'react-i18next'
import { initTranslations } from '@/lib/i18n'
import { createInstance } from 'i18next'

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: {
  children: React.ReactNode,
  locale: string,
  namespaces: string[],
  resources: any
}) {
  const i18n = createInstance()
  initTranslations(locale, namespaces, i18n, resources)
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
```
#### 使用
_/app/[locale]/layout.tsx_
```tsx
type RootLayoutProps = Readonly<{
  children: React.ReactNode
  params: {
    locale: string
  }
}>
export default function RootLayout({
  children,
  params: {
    locale
  }
}: RootLayoutProps) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <AntdRegistry>
          <Header locale={locale} />
          {children}
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}

```
_/app/ui/Header.tsx_
```tsx
import { initTranslations } from '@/lib/i18n'
import LanguageChanger from '../LanguageChanger' // langChange component
import TranslationsProvider from '../TranslationsProvider' // CR component
import styles from './index.module.scss'
import Image from 'next/image'

const i18nNamespaces = ['home', 'common']
export default async function Header({ locale }: { locale: string }) {
  const { resources, t } = await initTranslations(locale, i18nNamespaces)

  return (
    <div className={styles.header}>
      <div className={styles.imgWrapper}>
        <a href='/'>
          <Image src='/images/logo.jpg' width={500} height={59} alt='logo' />
        </a>
      </div>
      <div className={styles.menuWrapper}>
        <ul className={styles.menu}>
          {
            menus.map((item) => (
              <li key={item.title} className={styles.item}>
                <a href={item.url} className={styles.txt}>{item.title}</a>
              </li>
            ))
          }
          <li>
            {/* Server render */}
            {t('title')}
          </li>
          <li>
            {/* Client Render */}
            <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
              <LanguageChanger />
            </TranslationsProvider>
          </li>
        </ul>
      </div>
    </div>
  )
}
```

- `async/await`只能在 `server component`中使用，所以 `i18n`不能直接在 `client render`中使用。
- `client render`需要在 `server component`的后代组件中使用。
- 在包裹`TranslationsProvider`中的组件可以直接使用`useTranslation`。
#### 切换语言
```tsx
'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18nConfig from '../../lib/i18n/config'
import { Select } from 'antd'
import Cookies from 'js-cookie'

export default function LanguageChanger() {
  const { t, i18n } = useTranslation(['common'])
  const router = useRouter()
  const currentPathname = usePathname()
  const currentLocale = i18n.language

  const handleChange = (value: string) => {
    const newLocale = value

    // set cookie for next-i18n-router
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 30 })

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const options = i18nConfig.locales.map((item) => ({
    label: t(item),
    value: item
  }))

  return (
    <Select
      defaultValue={currentLocale}
      style={{ width: 120 }}
      onChange={handleChange}
      options={options}
    />
  );
}
```

- `next-i18n-router`使用`NEXT_LOCALE`存储 `locale`，那么我们可以借助它来设置区域。
