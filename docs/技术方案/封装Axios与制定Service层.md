# 封装Axios与制定Service层
## 一、封装Axios

在项目中我们通常使用的是`axios`，由于我们的项目采用的是`typescript`，以下记录怎么在`ts`中封装`axios`

**1.1 封装的好处**

- 在报头中统一发送`token`
- 统一处理请求与响应

_utils/http.ts_

```typescript
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import state from '@/store/state'

class Interceptors {

  public instance: any

  constructor () {
    // 创建 axios 实例
    this.instance = axios.create({ baseURL: process.env.VUE_APP_API_URL })
    this.initInterceptors()
  }

  public getInterceptors () { // 为了获取初始化好的 axios 实例
    return this.instance
  }

  public initInterceptors () { // 初始化拦截器

    // 请求拦截器
    this.instance.interceptors.request.use((config: any) => {
      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })

    // 响应拦截器
    this.instance.interceptors.response.use((response: any) => {
      this.responseLog(response)
      return response.data
    }, (error: any) => {
      this.errorHandle(error.response)
      return Promise.reject(error)
    })
  }

  /**
  *http 握手错误
  *@param res  响应回调 , 根据不同响应进行不同操作
  */
  private errorHandle (res: any) { // 状态码判断
    switch (res.status) {
    case 401:
      break
    case 403:
      break
    case 404:
      Message.error('请求的资源不存在')
      break
    case 1002: // 如果返回 1002 表示未登录
      Message.error('请登录')
      router.replace('/login')
      break
    default:
        // Message.error(' 连接错误 ')
    }
  }

  protected responseLog (response: any): void {
    if (process.env.NODE_ENV === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      console.log('| 请求地址：', response.config.url)
      console.log('| 请求方式：', response.config.method)
      console.log('| 请求参数：', response.config.data)
      console.log('| 返回数据：', response.data)
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }

}

export default new Interceptors().getInterceptors()
```

之所以使用`class`只是因为更加喜欢这种写法。

## 二、Service 层

_api/users.ts_

```typescript
import http from '@/utils/http'

export const getUsers = (data?: any) => http.get('/api/users', { params: data })
export const removeUser = (data?: any) => http.delete('/api/users', { data })
```

直接定义即可

## 三、使用

```typescript
import { getUsers, removeUser } from '@/api/users'
await getUsers()
```

推荐直接引入而非挂载到`prototype`中，原因：

- 当`api`过多时会使得`Vue`过于臃肿
- 引入可以对编辑器的提示非常友好
