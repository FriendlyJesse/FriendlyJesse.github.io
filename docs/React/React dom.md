# React
## React 基础
### react 基础包
```bash
npm i react react-dom
```
###  createElement
```javascript
// 参数1：元素名称
// 参数2：元素属性
// 第三个及以后的参数，元素的子节点
const title = React.createElement(
  'p',
  { id: 'p1' },
  'Hello React123',
  React.createElement('span', null, 'Hello, hello'),
  React.createElement('a', { href: 'http://www.baidu.com' }, '百度一下')
)

ReactDOM.render(title, document.getElementById('root'))
```
###  脚手架
```bash
npx create-react-app my-app
npx create-react-app my-app --template typescript ## ts版本
```
脚手架中包含以下依赖：

- react React：框架核心
- react-dom：React视图渲染核心（基于React构建WebApp，也就是HTML）
- react-script：封装了webpack的运行脚本

此外，react 还有 native 版本：

- react-native：构建和渲染 App
## JSX
JSX 需要使用 babel 编译后才能在浏览器环境中使用，脚手架中已经默认有该配置，无需手动配置。
编译 JSX 语法的包：`@bable/preset-react`。
推荐使用**小括号**包裹 JSX ，从而避免 JS 的很多可能的错误，以及能够换行。
`<></>`(fragment)：空文档标签，可以作为根节点，不会增加`HTML`结构。
### 属性
React 元素的属性名使用驼峰命名法。
```jsx
<header className="App-header"></header>
```
特殊属性名：

- class -> className
- for -> htmlFor
- tabindex -> tabIndex
### JS 表达式
```jsx
const name = '呵呵'
const sayHi = () => 'Hi~'
const h2 = <h2>我是h2</h2>
const dom = (
  <div>
    <div>{ name }</div>
  	<div>{ 1 < 2 ? '大于' : '小于' }</div>
    <div>{ sayHi() }</div>
    <div>{ h2 }</div>
  </div>
)
```
大括号中可以使用任何合法的 JS表达式。
###  条件渲染
方式一：
```jsx
let isLoading = true
const loadData = () => {
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>ok</div>
}
const dom = (
  <div>
    <div>{ loadData() }</div>
  </div>
)
```
方式二：
```jsx
let isLoading = true
const dom = (
  <div>
    <div>
      {
        isLoading ? <div>loading...</div> : <div>ok</div>
    	}
    </div>
  </div>
)
```
方式三：
```jsx
let isLoading = true
const dom = (
  <div>
    <div>
      {
        isLoading && <div>loading...</div>
    	}
    </div>
  </div>
)
```
### 列表渲染
如果要渲染一组数据，应该使用数组的 map 方法。
渲染列表时，应该添加 key 属性，key 属性的值要保证唯一。
```jsx
const songs = [
  { id: 1, name: '痴心绝对' },
  { id: 2, name: '南山南' },
  { id: 3, name: '北海北' }
]

const dom = (
  <div>
    <div>
      <ul>
        {
          songs.map(item => <li key={item.id}>{ item.name }</li>)
        }
      </ul>
    </div>
  </div>
)
```
如果我们需要循环渲染多条，那么必须使用数组的map方法，但是它有一个特性，不会循环稀疏数组：
```jsx
{
  new Array(5).fill(null).map((_, index) => {
    return <span>{`循环次数` + (index + 1)}</span>
  })
}
```
### 样式处理
#### style
```jsx
<div style={ { color: 'red', background: 'skyblue' } }>虫虫</div>
```
不能直接写样式字符串，否则会报错。
#### className
```jsx
<div className="div1"></div>
<div className={['div1', 'flat'].join('')}></div>
```
### JSX 底层原理

1. 将 JSX 转化为虚拟DOM（virtual DOM）（这一步是通过 babel 编译的）
2. 将虚拟DOM转化为真实DOM

第一步：第一次染页面是直接从virtual DOM->真实DOM；但是后期视图更新的候，需要经过D0M-DIFF的对比，计算出补丁包PATCH(两次视图差异的部分)，把PATCH补丁包进行渲染! !![image.png](https://cdn.nlark.com/yuque/0/2023/png/21870146/1689946562185-f32523f6-04cb-4df5-844e-57c892d79932.png#averageHue=%23f9f6f5&clientId=u3603d1b1-3f24-4&from=paste&height=472&id=u20f53d3f&originHeight=590&originWidth=1274&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=241812&status=done&style=none&taskId=u2f5b9311-9c51-4739-a3f7-75bc878411e&title=&width=1019.2)
给元素设置属性：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21870146/1692369664705-d7b4edb9-5d32-44c2-a67a-6576ff07ac51.png#averageHue=%23f7eceb&clientId=ue87d743d-c78d-4&from=paste&height=315&id=u5d4a71a1&originHeight=394&originWidth=716&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=202602&status=done&style=none&taskId=u468b0714-1bb9-411c-aae7-162ad62eccd&title=&width=572.8)
## 组件
### 函数组件
函数组件是使用 JS 函数创建的组件，一般有以下约定：

- 函数名称必须以大写字母开头。
- 函数组件必须有返回值，表示该组件的结构。
- 返回值为 `null`，表示不渲染任何内容。
```jsx
const Vote = (props) => {
  const { title } = props
  let supNum = 10
  let oppNum = 5
  return (
    <div className="vote-box">
      <div className="header">
        <h2 className="title">{title}</h2>
        <span>{supNum + oppNum}人</span>
      </div>
      <div className="main">
        <p>支持人数: {supNum}人</p>
        <p>反对人数: {oppNum}人</p>
      </div>
      <div className="footer">
        <button onClick={() => { supNum++; console.log(supNum) }}>支持</button>
        <button onClick={() => {
          oppNum++
          console.log(oppNum)
        }} />
      </div>
    </div >
  )
}
export default Vote
```
**函数组件的渲染：**
第一次渲染组件，然后将函数执行：

1. 产生一个私有的上下文：EC(V)
2. 把解析出来的`props`含`children`传递进来，但是`props`是冻结状态
3. 对函数返回的`JSX`元素（Virtual DOM）进行渲染

当我们点击按钮的时候，会把绑定的小函数执行：

1. 修改上下文EC(V)中的变量
2. 私有变量值发生改变
3. 但是视图不会发生改变

也就是说，函数组件第一次渲染完后，组件的内容不会根据组件内的私有变量再进行更新，所以称它为静态组件。除非在父组件中，重新调用这个函数组件传递不同的属性信息
### 类组件
类组件是使用 ES6 的 class 创建的组件，有以下约定：

- 类名必须以大写字母开头。
- 类组件应该继承 `React.Component`父类，从而可以使用父类中提供的方法或属性。
- 类组件必须提供 `render()`方法。
- `render()`方法必须有返回值，表示该组件的结构。
```jsx
import React from 'react';

class Hello2 extends React.Component {
  render () {
    return <div>Hello Class Component!</div>
  }
}

// 使用
<Hello2 />
```
### 组件状态
函数组件又叫做无状态组件，类组件又叫做有状态组件。

- 状态（state）即数据。
- 函数组件没有自己的状态，只负责数据展示（静）。
- 类组件有自己的状态，负责更新UI，让页面动起来。
#### state
```jsx
class Example extends React.Component {
	// 第一种写法
  constructor () {
    super ()
    // 初始化 state
    this.state = {
      count: 0
    }
  }
  // 第二种写法
  state = {
    count: 0
  }
}
```
#### setSate
React 中不能直接修改状态，必须使用`setState`来进行状态修改。
setSate作用：1. 修改状态，2. 更新UI。
```jsx
class Example extends React.Component {
  state = {
    count: 0,
    test: 'hello'
  }
  
  render () {
    return (
      <div>
        <div>计数器：{this.state.count}</div>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>+1</button>
      </div>
    )
  }
}
```
`setSate`中需要修改哪个数据，把那个数据单独修改即可。
抽离事件处理程序：
```jsx
class Example extends React.Component {
  state = {
    count: 0
  }

  onIncrement () {
    this.setState({
      count: this.state.count + 1
    })
  }

  // 在方法上解决 this 指向问题
  // onIncrement = () => {
  //   this.setState({
  //     count: this.state.count + 1
  //   })
  // }

  render () {
    return (
      <div>
        <div>计数器：{this.state.count}</div>
        {/* 错误，这里会导致处理程序中的 this 是 undefined */}
        <button onClick={this.onIncrement}>+1</button>
        {/* 箭头函数解决 this 指向问题 */}
        <button onClick={ () => this.onIncrement() }>+1</button>
        {/* bind 方法解决 this 指向问题 */}
        <button onClick={this.onIncrement.bind(this)}>+1</button>
      </div>
    )
  }
}
```
这里我们使用了三种解决方法：

- 在 JSX 中使用箭头函数
- 在 JSX 中使用 bind 方法
- 在 class 中声明方法时使用箭头函数
### props
props 是接收传递给组件的数据。
传递数据：给组件标签添加属性。
接收数据：函数组件通过参数`props`接收，类组件通过`this.props`接收。
`props`不能修改成员值、不能新增成员、不能删除成员
```jsx
<Example 
  name="jack"
  age={19}
  colors={['red', 'green', 'blue']}
  fn={() => { console.log('fn') }}
  tag={<p>这是一个标签</p>}
/>

// 类组件
class Example extends React.Component {
  render () {
    const name = this.props.jack
    return <div>{ name }</div>
  }
}
// 拥有构造函数
class Example extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const name = this.props.jack
    return <div>{ name }</div>
  }
}
// 函数组件
function Example (props) {
  const name = props.jack
  return <div>{ name }</div>
}
```

- props 可以传递任意类型的数据，比如 vue 中不能直接传递的标签和组件。
- props 是只读对象，不可修改。
- 使用类组件时，如果写了构造函数，应该将 `props` 传递给 `super()`，否则无法在构造函数中获取到 `props`！
#### children
children 表示标签的子节点。当组件有子节点时，props 就有该属性
children 属性与普通 props 一样，值可以时任意值（文本、标签、组件、函数等）
```jsx
const Wrap = props => {
  return (
    <div>
      <h1>组件标签的子节点：{ props.children }</h1>
    </div>
  )
}

const Root = () => {
  render () {
		<Wrap>我是子节点</Wrap>
  }
}
```
##### children 的工具方法
要知道`children`并不一定是一个数组，我们需要一些东西来处理它。
[Children – React 中文文档](https://react.docschina.org/reference/react/Children)
```jsx
import Demo from './Demo'

function App () {
  return (
    <div className="App">
      <Demo title={'我是标题'}>
        <div>111111</div>
        <div>222222</div>
      </Demo>
    </div>
  )
}
```
```jsx
import React from 'react'

const Demo = (props) => {
  const { title, children } = props
  // 使用 Children 提供的方法将 children 转化为数组
  const newChildren = React.Children.toArray(children)

  return (
    <div>
      {newChildren[0]}
      

      <h2>{title}</h2>
      {newChildren[1]}
    </div>
  )
}
```
##### 模拟具名插槽
我们需要达到将插槽放到指定的地方，而不是只能堆在一起
**第一种方式：**
```typescript
import Demo from './Demo'

function App () {
  return (
    <div className="App">
      <Demo title={'我是标题'} head={<div>111111</div>} foot={<div>222222</div>}/>
    </div>
  )
}
```
```jsx
import React from 'react'

const Demo = (props) => {
  const { title, children, head, foot } = props

  return (
    <div>
      {head}
      

      <h2>{title}</h2>
      {foot}
    </div>
  )
}
```
**第二种方式：**
通过`children`中的`props`判断出来，分别放到指定位置，也就是说需要自己来实现。
```jsx
import Child from './Child'
import './index.less'

function App () {
  return (
    <div className="App">
      <Child title={'我是标题'} renderSlot={(name) => {
      return <span>我是作用域插槽：{name}</span>
    }}>
        <span slot='header'>我是页眉</span>
        <span>我是内容</span>
        <span slot='footer'>我是页脚</span>
      </Child>
    </div>
  )
}

export default App

```
```jsx
const Child = (props) => {
  const { title, children } = props
  const headerSlot = []
  const footerSlot = []
  const defaultSlot = []

  children.forEach((child) => {
    // 通过 slot 判断位置
    const { slot } = child.props
    if (slot === 'header') {
      headerSlot.push(child)
    } else if (slot === 'footer') {
      footerSlot.push(child)
    } else {
      defaultSlot.push(child)
    }
  })

  const name = '超级作用域插槽'

  return (
    <div>
      {headerSlot}
      

      <h2>{title}</h2>
      {/* 作用域插槽与默认插槽 */}
      { props.renderSlot ? props.renderSlot(name) : <div>默认插槽</div> }
      

      {defaultSlot}
      

      {footerSlot}
    </div>
  )
}

export default Child

```
#### props 校验
```tsx
import React, { Component } from 'react'

interface Props {
  name?: string,
  colors: []
}

class Verify extends Component<Props> {
  
  render () {
    const { colors } = this.props
    console.log(colors)
    return (
      <div>123</div>
    )
  }
}

export default Verify
```
### 组件通信
#### 父组件传递数据给子组件
```jsx
import { Component } from 'react'
import Child from './Child'

class Parent extends Component {
  state = {
    lastName: '王'
  }

  render () {
    return (
      <div>
        <Child name={this.state.lastName} />
      </div>
    )
  }
}

export default Parent
```
```jsx
function Child (props) {
  return (
    <div>
      子组件接收到的数据：{ props.name }
    </div>
  )
}

export default Child
```
#### 子组件传递数据给父组件
父组件提供回调函数，子组件触发函数将要传递的数据作为回调函数的参数。
与 `Vue`同样，我们可以通过 `ref`来获取子组件的数据与事件，在父组件主动触发。
```jsx
import { Component, createRef } from 'react'
import Child from './Child'

class Parent extends Component {
  childRef = createRef()

  // 传递的函数
  getChildMsg = (msg) => {
    console.log('接收到子组件的数据', msg)
  }

  // 父组件通过 ref 主动触发
  triggerButton = () => {
    this.childRef.current.handleClick()
  }

  render () {
    return (
      <div>
        <button onClick={this.triggerButton}>父组件触发子组件事件</button>
        <Child ref={this.childRef} getMsg={this.getChildMsg} />
      </div>
    )
  }
}

export default Parent
```
```jsx
import { Component } from 'react'
class Child extends Component {
  state = {
    msg: 'Hello!'
  }
  handleClick = () => {
    this.props.getMsg(this.state.msg)
  }
  render () {
    return (
      <div>
        子组件：<button onClick={this.handleClick}>点我，子传父</button>
      </div>
    )
  }
}

export default Child
```
#### 兄弟组件通信
兄弟组件的通信主要是依靠父组件来管理它们的`状态`与`操作状态的方法`。
```jsx
import { Component } from 'react'

class Counter extends Component {
  state = {
    count: 0
  }
  
  changeCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  
  render () {
    return (
      <div>
        <Child1 count={this.state.count} />
        <Child2 count={this.state.count} changeCount={this.changeCount}  />
      </div>
    )
  }
}

const Child1 = (props) => {
  return <h1>计数器：{ props.count }</h1>
}

const Child2 = (props) => {
  return <button onClick={props.changeCount}>+1</button>
}

export default Counter
```
### Context
Context 用于跨组件传递数据，类似于 Vue 中的 **Provide/Inject**。
Context 提供了两个组件`Provider`、`Consumer`，用于传递数据。
```jsx
import { Component, createContext } from 'react'

// 多文件使用时，将其抽离出一个文件就能给子组件使用了。
const { Provider, Consumer } = createContext('light')

class Context extends Component {
  render () {
    return (
      <Provider value="pink">
        <div>
          <Node />
        </div>
      </Provider>
    )
  }
}

const Node = props => {
  return (
    <div>
      <SubNode />
    </div>
  )
}

const SubNode = props => {
  return (
    <div>
      <Child />
    </div>
  )
}

const Child = props => {
  return (
    <div>
      <Consumer>
        {
          data => <span>我是子节点：{data}</span>
        }
      </Consumer>
    </div>
  )
}

export default Context
```
### 生命周期
只有 **class 组件**有生命周期，如果需要函数式组件有生命周期请用 **hooks**。
![](https://cdn.nlark.com/yuque/0/2022/png/21870146/1666438586256-8f6e1e63-ef19-4244-aa0f-21d04b185b8b.png#averageHue=%23f6f5f2&clientId=uc8d2a1d5-eab4-4&errorMessage=unknown%20error&from=paste&id=u75f2a377&originHeight=643&originWidth=1134&originalType=url&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3d4df2e5-d0c9-484d-b22f-883683ea64e&title=)
#### 执行顺序
挂载时：

- constructor
- render
- componentDidMount()

更新时：（执行时机：setState、forceUpdate、组件接收到新的props）

- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

卸载时：

- componentWillUnmount
#### 生命周期使用
constructor 初始化state、为事件处理程序绑定 this。
render 用于渲染UI，不要在里面调用 setState
componentDidMount 发送网络请求、DOM操作
componentWillUnmount 卸载定时器
### render-props
> “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

如下例：

- Mouse 组件负责封装服用的状态逻辑代码：状态和操作状态的方法。
- 传入的 render prop 负责使用服用的状态来渲染UI结构。
```jsx
import { Component } from 'react'

class Mouse extends Component {
  state = {
    x: 0,
    y: 0
  }

  componentDidMount () {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render () {
    // 关键点
    return this.props.render(this.state)
  }
}

export default Mouse
```
```jsx
<Mouse render={ (mouse) => <p>鼠标当前位置 { mouse.x }，{ mouse.y }</p> } />
<Mouse render={ (mouse) => <img src={cat} alt='cat' style={{
  position: 'absolute',
  top: mouse.y + 200,
  left: mouse.x - 100,
  width: '200px'
}} /> } />
```
#### 使用 children 来代替 props
可以使用`children`来传递事件，来代替`props.render`。
```jsx
// render
render () {
  return this.props.children(this.state)
}
// 使用
<Mouse>{ (mouse) => <p>鼠标当前位置 { mouse.x }，{ mouse.y }</p> }</Mouse>
<Mouse>
  { 
    (mouse) => <img src={cat} alt='cat' style={{
      position: 'absolute',
      top: mouse.y - 100,
      left: mouse.x - 100,
      width: '200px'
    }} /> 
  }
</Mouse>
```
可以感觉这里就像时 Vue 的插槽一样能够传递参数。
### 高阶组件
> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

高阶组件是一个函数，接收要包装的组件，返回增强后的组件。
高阶组件内部创建一个类组件，在这个类组件中提供服用的状态逻辑代码，通过`props`将复用的状态传递给组件`WrappedComponent`。
```jsx
const EnhancedComponent = withHOC(WrappedComponent)
```
例子：
封装了一个鼠标移动的高阶组件
```tsx
import { ComponentClass, ForwardRefExoticComponent, FunctionComponent, useEffect, useState } from "react"

type IReactComponent = ComponentClass | FunctionComponent | ForwardRefExoticComponent<any>

export default function withMouse<T extends IReactComponent>(WrappedComponent: T) : T {
  const HOC = (props: any) => {
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }, [])
    // HOC 包裹逻辑
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX)
      setY(e.clientY)
    }
    // 必要时 HOC 还可以传参，比如 type
    return (
      <>
        <WrappedComponent {...{x, y}} {...props} />
        {/* HOC 可以包裹视图 */}
      </>
    )
  }
  return HOC as T
}

```
使用高阶组件：
```jsx
import { withMouse } from './decorator'

const Position = props => {
  return <p>鼠标当前的位置: x: {props.x}, y: { props.y }</p>
}
const MousePosition = withMouse(Position)

// 直接使用即可
<MousePosition />
```
这是装饰器模式在`react`中的一种运用，此例只是一层包装，如果需要可以进行多重包装。
经典使用场景：某些场景可以复用的UI、某些场景需要上传设备信息之类的、上报用户行为。
注意：

- 不要修改原始组件的原型
- 必要时可以传递参数
#### 设置组件名
目前只有在 react tools中有用...，暂不记录。
## 事件
React 事件绑定语法与 DOM 事件类似：`on + 事件名称={事件处理程序}`
```jsx
class Hello2 extends React.Component {
  handleClick (e) {
    console.log('点击！')
    console.log(e) // 事件对象
    e.preventDefault()
  }
  render () {
    return <div onClick={this.handleClick}>Hello Class Component!</div>
  }
}
```
### 事件对象

- 可以通过事件处理程序的参数获取到事件对象
- React 中的事件对象叫做：合成事件
- 合成事件：兼容所有浏览器，无需担心跨浏览器兼容性问题
## 受控组件与非受控组件
### 受控组件（推荐）
基于修改数据/状态，让视图更新达到需要的效果。在表单中我们可以做到与 Vue 中的双向绑定一样的效果：
```jsx
class Form extends React.Component {
  state = {
    text: '',
    content: '',
    city: 'sh',
    isChecked: false
  }

  handleChange = e => {
    const target = e.target
    // 获取控件的值
    const value = target.type === 'checkbox' ? target.checked : target.value
    // 通过name属性，控件绑定的状态
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render = () => (
    <div>
      {/* 文本框 */}
      <input type="text" name="text" value={this.state.text} onChange={this.handleChange} />
      {/* 多行文本框 */}
      <textarea name="content" value={this.state.content} onChange={this.handleChange} />
      {/* 下拉框 */}
      <select name="city" value={this.state.city} onChange={this.handleChange}>
        <option value="sh">上海</option>
        <option value="bj">北京</option>
        <option value="gz">广州</option>
      </select>
      {/* 复选框 */}
      <input type="checkbox" name="isChecked" checked={this.isChecked} onChange={this.handleChange} />
    </div>
  )
}
```
将表单元素的 value 值绑定为状态中的值，同时监控事件动态变更状态。
### 非受控组件
基于ref获取DOM元素，我们操作DOM元素来实现需求和效果
**ref 的作用：获取 DOM 或组件**
```jsx
class Form extends React.Component {
  textRef = React.createRef()

  getText = () => {
    console.log(this.textRef.current.value)
  }

  render = () => (
    <div>
      <input type="text" ref={this.textRef} />
      <button onClick={this.getText}>获取文本框的值</button>
    </div>
  )
}
```
### 在hook中使用ref
在`hook`中直接使用 ref 是不允许的，我们需要利用`forwardRef`进行转发。
`forwardRef`：帮助子组件拿到父组件中子组件上面绑定的ref，绑定到自己的某一个元素中。这样就将子组件的DOM直接暴露给了父组件。
但是直接使用存在以下几个问题：

1. 直接暴露给父组件带来的问题是某些情况的不可控
2. 父组件可以拿到DOM后进行任意的操作
3. 只是希望父组件可以操作某些方法，并不希望它随意操作其他方法

为了解决以上问题，我们通常会配合`useImperativeHandle`来使用
`useImperativeHandle`：减少暴露给父组件获取的DOM元素属性, 只暴露给父组件需要用到的DOM方法。
```javascript
useImperativeHandle(ref, createHandle, dependencies?)
```
## 虚拟 DOM 和 Diff 算法
React 更新视图的思想时：只要 state 变化就重新渲染视图。特点是思路清晰，但是存在性能开销较大的问题，于是引入了虚拟 DOM 配合 Diff 算法来解决这个问题。
虚拟 DOM：本质上就是一个 JS 对象，用来描述你希望在屏幕上看到的内容（UI）。
```javascript
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello JSX!'
  }
}
```
转化为以下内容
```html
<h1 class="greeting">
  Hello JSX!
</h1>
```
**渲染原理：**

- 初次渲染，React 会根据初始 state（Model），创建虚拟 DOM 对象（树）。
- 根据虚拟 DOM 生成真正的 DOM，渲染到页面中。
- 当数据变化后（setState），重新根据新的数据，创建新的虚拟 DOM 对象（树）。
- 与上一次得到的虚拟 DOM 对象，使用 Diff 算法对比，得到需要更新的内容。
- 最终 React 只将变化的内容更新（patch）到 DOM 中，重新渲染到页面。

**虚拟 DOM 的最大的价值**：
虚拟 DOM 让 React 摆脱了浏览器环境，虚拟 DOM 并不是浏览器中的 DOM，而是一个 JS 对象。能够运行JS 的地方都能够运行 React，这为 React 跨平台的运用起到了一个支撑。React 能够做 native、服务端渲染、VR/AR等的运用就是得益于此。
## HOOK
> _Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### useState
官方示例：
```tsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
`useState`返回一个`state`与操作 state 的方法。
值得注意的是，在初始化 state 时，它同样会触发 effect。
### useEffect
> useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。（我们会在[使用 Effect Hook](https://react.docschina.org/docs/hooks-effect.html) 里展示对比 useEffect 和这些方法的例子。）

从官方文档得知这个副作用拥有三个生命周期的的功能存在，我们可以利用这点模拟生命周期。

- 当数组存在并有值时，如果数组中的任何值发生更改，则每次渲染后都会触发回调。
- 当它不存在时，每次渲染后都会触发回调。
- 当它是一个空列表时，回调只会被触发一次，类似于 componentDidMount。

模拟**生命周期**和 **watch**：
```typescript
// componentDidMount
useEffect(() => {
  console.log('componentDidMount')
}, [])

// componentDidUpdate
const mounted = useRef()
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true
  } else {
  	console.log('componentDidUpdate')
  }
}, [])

// componentWillUnmount
useEffect(() => {
  return () => {
    console.log('will unmount');
  }
}, [])

// watch
useEffect(() => {
  document.title = `You clicked ${count} times`
}, [count]) // 仅在 count 更改时更新
```
#### react 18 中 effect 执行两次的bug
在concurrent mode 和 strict mode 的 开发阶段，为了帮助开发者定位问题，react会故意的两次调用render阶段，他们认为这样能引起开发者的注意。
React18添加了strictMode，npx create-react-app创建新项目默认是带有strictMode严格模式的。这个模式会导致组件加载两次,如果我们关闭掉这个模式，就不会出错了。但是这并没有根除我们的bug，因为正常加载两次也是不会出错的。而且，退一步来说，新项目自带严格模式，说明它是有必要的，官网也提到了它的优点，这里不展开讨论了。
在研究这个问题后得到了大概三种解决方案：

1. 取消react.strictMode模式。
2. 在设置的参数的useEffect中加非空判断（类似 componentDidUpdate 的操作）。
3. 不解决，它只在开发环境起作用。
### useRef
```typescript
const ref = useRef(initialValue)
```
useRef 返回一个只有一个属性的对象:

- current：最初，它被设置为你传递的 initialValue。之后你可以把它设置为其他值。如果你把 ref 对象作为一个 JSX 节点的 ref 属性传递给 React，React 将为它设置 current 属性。

**改变 ref 不会触发重新渲染。** 这意味着 ref 是存储一些不影响组件视图输出的信息的完美选择。
#### 通过 Ref 操作 DOM
首先，声明一个 initial value 为 null 的 ref 对象
```jsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```
然后将你的 ref 对象作为 ref 属性传递给你想要操作的 DOM 节点的 JSX：
```jsx
  // ...
  return <input ref={inputRef} />;
```
当 React 创建 DOM 节点并将其渲染到屏幕时，React 将会把 DOM 节点设置为你的 ref 对象的 current 属性。现在你可以访问 <input> 的 DOM 节点，并且可以调用类似于 [focus()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/focus) 的方法
#### Ref 操作列表
通常外面使用 `ref` 只是获取单独的 `DOM`。但是不可避免的我们可能需要在循环中获取到`ref`，这时候就需要使用到`ref callback`。
```jsx
import { useRef } from 'react'

export default function CatFriends () {
	const itemsRef = useRef(null);
  
  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  
  return <div>
    {
      catList.map(cat => (
        <li
          key={cat.id}
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set(cat.id, node);
            } else {
              map.delete(cat.id);
            }
          }}
        >
          <img
            src={cat.imageUrl}
            alt={'Cat #' + cat.id}
          />
        </li>
      ))
    }
  </div>
}
```
第二种方法：
```jsx
import { useRef } from 'react'

export default function CatFriends () {
	const itemsRef = useRef([])
  
  return <div>
    {
      catList.map(cat => (
        <li
          key={cat.id}
          ref={(node, index) => {
            itemsRef.current[index] = node
          }}
        >
          <img
            src={cat.imageUrl}
            alt={'Cat #' + cat.id}
          />
        </li>
      ))
    }
  </div>
}
```
#### 获取自定义组件的 ref
默认情况下，你自己的组件不会暴露它们内部 DOM 节点的 ref。
为了解决这个问题，首先，找到你想获得 ref 的组件，其包装在 [forwardRef](https://react.docschina.org/reference/react/forwardRef) 里：
```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(({ value, onChange }, ref) => {
  return (
    <input
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
});

export default MyInput;
```
#### 使用`useImperativeHandle`暴露处理方法
```jsx
const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // 自定义方法，只暴露 focus，没有别的
    focus() {
      realInputRef.current.focus();
    },
    // 自定义属性
    // ...
  }));
  return <input {...props} ref={realInputRef} />;
})
```
`useImperativeHandle`可以暴露自定义的方法/属性给父组件。
## 性能优化
### setState
```jsx
this.setState(updater [, callback])
```

- setState 是异步更新的，不要依赖前一次的 setState。
- setState 一个时间段内的状态更新同时进行。
#### setState 首个参数的函数写法
如果需要依赖前一次的 setState 可以使用以下语法：
```jsx
this.setState((state, props) => {
  return {
    count: state.count + 1
  }
})
```
如上所示，使用回调函数的 setState 依旧是异步的，但是回调函数中的state、props是最新的。
#### callback
```jsx
this.setState({
  count: state.count + 1
}, () => {
  console.log(this.state)
})
```
setState 的第二个参数是在状态更新（页面重新完成渲染）后立即执行某个操作。
所以依赖上一次状态更新，也可以在 callback 中使用。
### 避免组件重复渲染
#### 函数式组件优化
memo 允许你的组件在 props 没有改变的情况下跳过重新渲染。
```tsx
import { memo } from 'react'

export default memo(({ info: { name } }: any) => {
  console.log('Render ...')
  return (
    <div>{name}</div>
  )
}, (prevProps, nextProps) => {
  // 如果 props 相同就不重新渲染，false：重新渲染，true: 不渲染
  return JSON.stringify(prevProps) === JSON.stringify(nextProps) 
})
```
#### Class 组件优化
组件更新机制：**父组件更新会引起子组件也被更新**。
在子组件没有变化时也会重新渲染，如果避免不必要的重新渲染？
使用钩子函数`shouldComponentUpdate(nextProps, nextState)`控制该组件是否重新渲染。
```jsx
class Hello extends Component {
  shouldComponentUpdate () {
    // 根据条件返回 true 或 false
  }
  render () {...}
}
```
#### 纯组件
`PureComponent`与 `Component`功能相似，区别在于PureComponent内部自动实现了`shouldComponentUpdate`钩子，不需要手动比较。
```jsx
import { PureComponent } from 'react'
class Hello extends PureComponent {
  return = () => <div>纯组件</div>
}
```
纯组件内部通过分别对比前后两次 props 和 state 的值，来决定是否重新渲染组件。但是它只能进行浅层的比对。
对比方式

- 对于值类型来说：比较两个值是否相同。
- 对于引用类型：只比较对象的引用地址是否相同。
```javascript
state = {
  obj: { num: 0 }
}
// 错误的做法
state.obj.number = 2
setState({ obj: state.obj })
// PureComponent 比较
// 最新的state.obj === 上一次的 state.obj，这样就不会重新渲染组件了

// 正确的做法
const newObj = { ...state.obj, number: 2 }
setState({ obj: state.newObj })
// 这样就可以正确渲染组件了
```
**所以 state 或 props 中属性值为引用类型时，应该创建新数据，不要直接修改原数据！**
### 避免重复计算
#### useMemo
**useMemo 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。**
```tsx
const calculateTotal = useMemo(() => {
  console.Log('重新计算合计');
  return data
    .map((item: any) => item.amount)
    .reduce((pre: number, cur: number) => pre + cur)
}，[data])
```
默认情况下，React 会在每次重新渲染时重新运行整个组件。例如，如果更新了 state 或从父组件接收到新的 props，calculateTotal 函数将会重新运行。我们可以使用 useMemo 缓存结果，当依赖项（data）有变化时才重新计算。
需要注意的是：

- 使用 useMemo 后从函数调用 `{calculateTotal()}` 变成了一个结果 `{calculateTotal}`

**useMemo 还可以帮助你优化重新渲染子组件的性能。**
```tsx
const totalAmountView = useMemo(() => {
  const total = data.map((item: any) => item.amount)
    .reduce((pre: number, cur: number) => pre + cur)
  console.log( 重新渲染合计');
  return (
    <View style={styles.totalLayout}>
      <Text style={styles.totalTxt}>{total}</Text>
      <Text style={styles.totalTxt}>合计: </Text>
    </View>
  )
},[datal)
```
这种做法与上面的做法是等价的。

#### useCallback
`useCallback` 是 `useMemo`用于缓存回调的语法糖。
```tsx
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```
假如没有使用 useCallback，每次都会重新创建一个 handleSubmit 函数。假如 `Form`组件需要缓存，那么这会破坏它，这里我们只有在 `productId, referrer`依赖有变动时创建新的 callback。
## React 路由
现代的前端应用大多都是 SPA（单页应用程序），也就是只有一个 HTML 页面的应用程序。因为它的用户体验更好、对服务器的压力更小，所以更受欢迎，为了有效的使用单个页面来管理原来多页面的功能，前端路由应运而生。
### 创建 router
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    )
  },
  {
    path: "about",
    element: <About />
  }
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
```
### 编程式导航
```jsx
import { useNavigate } from 'react-router-dom'

// 使用
const About = () => {
  const navigate = useNavigate()
  return <div onClick={() => navigate('/')}>About</div>
}
```
`react-router`中使用 Hooks 来跳转路由。
它也能够使用`History`中类似`go`的功能：`navigate(-1)`
### 路由重定向 & 通配符
```jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  // 重定向，顺序不能相反
  {
    path: '/',
    element: <Navigate to='/index' replace />
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'index',
        element: <Index />
      },
      {
        path: 'news',
        element: <News />
      }
    ]
  },
  {
    path: 'city-list',
    element: <CityList />,
  },
  // 通配符跳转
  {
    path: '*',
    element: <Navigate to='/index' />
  }
])
```
**要点：**

- 重定向需要定义两次路由，第一个代表重定向，第二个代表页面。
- 并且重定向应该在页面路由前面，否则不生效。
- 通配符跳转则必须在最后。
### 路由懒加载
```jsx
import { lazy } from 'react'

const About = lazy(() => import('@/view/About'))
```
react中的路由懒加载是使用 lazy 函数实现的。
```tsx
import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'

const About = lazy(() =>import('@/view/About'))
const withLoadingComponent = (Component: ReactNode) => {
  return <Suspense fallback={<div>Loading...</div>}>
    {Component}
  </Suspense>
}

const routes = [
  {
    path: '/about',
    element: withLoadingComponent(<About />)
  }
]
```
对于 懒加载路由，我们需要使用一个 loading 来进行包裹，否则会报错。
## [Create React App](https://create-react-app.bootcss.com/) 配置
### 添加别名
官方并没有指定设置别名的方式，所以我们需要安装以下第三方包：
[react-app-rewired](https://www.npmjs.com/package/react-app-rewired)
```bash
npm install react-app-rewired --save-dev
```
然后在项目根目录创建`config-overrides.js`：
```javascript
const path = require('path')

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@': path.resolve(__dirname, 'src')
    },
  }
  return config
}
```
然后配置ts：
```json
"compilerOptions": {
	"paths": {
      "@/*": ["./src/*"],
    }
}
```
最后修改`create-react-app`启动方式：
```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```
## redux & redux-persist
redux提供了一个最佳实践方案，如下：
[Redux Toolkit | Redux Toolkit](https://redux-toolkit.js.org/)
### 使用
```bash
npm install @reduxjs/toolkit react-redux redux-persist
```

1. `@reduxjs/toolkit`redux 工具集
2. `react-redux`react注入组件
3. `redux-persist`持久化

创建 store：
```typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit'
// 持久化
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// reducers
import user from './features/user'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: [] // 指定reducer
}

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token']
}
// 合并 reducers
const reducers = combineReducers({
  // 持久化嵌套，可以指定状态
  user: persistReducer(authPersistConfig, user)
})
// 使用持久化函数包装 reducer
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: true // 开启 redux tool 选项
})
// 使用持久化函数包装 store
export const persistor = persistStore(store)

// 推断类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

```
reducer 一般放在 `features`文件夹下
```typescript
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface userState {
  token: string
  userInfo: Object | null
}

const initialState: userState = {
  token: '',
  userInfo: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken (state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setUserInfo (state, action: PayloadAction<string>) {
      state.userInfo = action.payload
    }
  }
})

export const { setToken, setUserInfo } = userSlice.actions
export default userSlice.reducer

```
### 向 React 应用程序组件提供 Redux 存储
```tsx
import { store, persistor } from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
```
### 在 axios 中使用 redux
```typescript
import { store } from '@/store'

http.interceptors.request.use((config: any) => {
  const { user: { token } } = store.getState()
  token && (config.headers.Authorization = `${token}`)
  return config
})
```
在非 **UI 组件**中使用，都可以直接将封装好的 **store** 直接导入使用。

