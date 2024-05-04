# Antd InputNumber 强制两位小数与千分位
## 设置两位小数
我们都知道给`<InputNumber />`设置小数很简单只需要设置`precision`即可。
```tsx
<InputNumber
  precision={2}
/>
```
但是我们的需求是需要存在千分位。好吧，[Link]()那么我们加上`formatter`也就可以了。但是我们看文档，`precision`会在配置`formatter`时失效！
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21870146/1695094934265-625ed9cc-61e0-4903-8a85-e73e4b12d6bf.png#averageHue=%23f4f4f4&clientId=u1df987ec-bc52-4&from=paste&height=45&id=u19c11741&originHeight=45&originWidth=621&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6711&status=done&style=none&taskId=u2970e500-29ed-45cd-a61b-89d57d02b98&title=&width=621)
## 设置千分位和两位小数（一般没有要求强制两位小数这一步就可以了）
好吧，大不了我们在`formatter`时手写一下。
```tsx
const formatNumberWithThoundsandSeparator = (value: number | string) => {
  return `${value}`.split('.').map((part, index) => index === 0 ? part.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : part).join('.')
}

<InputNumber
  formatter={formatNumberWithThoundsandSeparator}
/>
```
这样应该可以了吧？抱歉还真不行！这段代码确实能够同时存在千分位和两位小数，但是我们的需求是强制两位小数！也就是说`100.00`不能变成`100`，`100.10`不能变成`100.1`。
![Screen Recording 2023-09-19 at 11.50.00.gif](https://cdn.nlark.com/yuque/0/2023/gif/21870146/1695095829669-68f477f9-e80f-4be1-b363-3750086436ef.gif#averageHue=%23686868&clientId=u1df987ec-bc52-4&from=drop&id=ud07d5b9f&originHeight=526&originWidth=700&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1248353&status=done&style=none&taskId=uf3449a0a-f038-4497-9169-937d0794377&title=)
## 设置强制两位小数
我们可以看到上面的formatter函数，对没有小数的情况不会添上，我们做些调整。
```typescript
function formatNumberWithThoundsandSeparator (value: number | string): number | string {
  if (value) {
    if (typeof value !== 'number') value = Number(value)
    // 加上两个小数点
    const formattedValue = value.toFixed(2)
    const parts = formattedValue.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
  return ''
}
```
再来看看交互：
![Screen Recording 2023-09-19 at 13.06.22.gif](https://cdn.nlark.com/yuque/0/2023/gif/21870146/1695100128962-303e3a89-4d52-488f-bc0d-5f2e3568f133.gif#averageHue=%23717171&clientId=ud16966d0-4098-4&from=drop&id=u666b0c27&originHeight=526&originWidth=700&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1247520&status=done&style=none&taskId=u226e31a7-c7cc-431e-a6f2-187b4613b82&title=)
可以看到格式化会影响到用户的输入，显然这也是不行的。
## 最终解决
```typescript
function formatNumberWithThoundsandSeparator (value: number | string, { userTyping }: { userTyping: boolean, input: string }): number | string {
  // 用户输入中，不进行处理
  if (userTyping) return value
  if (value) {
    if (typeof value !== 'number') value = Number(value)
    const formattedValue = value.toFixed(2)
    const parts = formattedValue.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
  return ''
}
```
我们发现`fomatter`提供了一个参数用于标识用户的输入状态。那么就很简单了，我们只需要在用户输入的时候不进行处理就好了。
![Screen Recording 2023-09-19 at 13.12.13.gif](https://cdn.nlark.com/yuque/0/2023/gif/21870146/1695100427712-92e7446f-74e2-4945-aad0-1de3cfff6c66.gif#averageHue=%237e7e7e&clientId=ud16966d0-4098-4&from=drop&id=u2bb29be8&originHeight=526&originWidth=700&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1686330&status=done&style=none&taskId=ua720472d-fd10-49af-867a-ff2627173e4&title=)
