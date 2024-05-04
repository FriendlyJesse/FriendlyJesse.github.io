---
order: 6
---

# RabbitMQ
## MQ（Message queue）
### 什么是 RabbitMQ
一句话描述就是：RabbitMQ 是一个消息中间件！用来接收与转发消息的。
RabbitMQ是由erlang语言开发，基于AMQP协议实现的消息队列，它是一种应用程序之间的通信方法，[消息队列](https://www.zhihu.com/search?q=%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3359733499%7D)在分布式系统开发中应用非常广泛。
MQ(message queue)，从字面意思上看，本质是个队列，FIFO 先入先出，只不过队列中存放的内容是 message 而已。
![](https://cdn.nlark.com/yuque/0/2024/webp/21870146/1712794001897-055bf166-6ab7-4c1d-aaf7-442a4ddae65b.webp#averageHue=%23f7f2ec&clientId=u42c65574-4dac-4&from=paste&id=u7333d64f&originHeight=309&originWidth=1080&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u95ebc60a-a798-498f-812f-5465b694942&title=)
### ** 为什么要用MQ？**
#### 流量消峰
以12306为例，假设平时可能买票的人不多，所以订单系统的QPS( 每秒查询率 )也不是很高，每秒也就处理1000个请求，但是一到节假日、春运期间可能抢票的人就非常多，并发量远远大于平时，这个时候，订单系统明显扛不住了。怎么办呢，当然我们可以设计[弹性伸缩](https://www.zhihu.com/search?q=%E5%BC%B9%E6%80%A7%E4%BC%B8%E7%BC%A9&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3359733499%7D)的集群，进行机器扩容，保证高可用。但是我们依然可以采用MQ来解决这个问题。
![](https://cdn.nlark.com/yuque/0/2024/webp/21870146/1712794062236-cd7bb56d-d076-4b16-80a2-2194176f32eb.webp#averageHue=%23f9f9f6&clientId=u42c65574-4dac-4&from=paste&id=u194909ed&originHeight=518&originWidth=1080&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u982c650f-970e-4e30-808d-a44df9d4e97&title=)
所以我们可以设计高可用的MQ，让所有的请求都到MQ，缓存起来。这样一来高峰期的流量和数据都将积压在MQ中，流量高峰就被削弱了（削峰），然后我们的订单系统就避免了[高并发](https://www.zhihu.com/search?q=%E9%AB%98%E5%B9%B6%E5%8F%91&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3359733499%7D)的请求，它可以慢慢的从MQ中拉取自己能力范围内的消息就行处理。这样一来，高峰期积压的消息也终将被消费完，可以叫做填谷。
#### 应用解耦
我购买车票成功后，会收到信息提醒，但是如果短信系统故障了，客户就有可能收到不短信了，这就是各个系统之间的耦合太高了，我们应该解耦。
![](https://cdn.nlark.com/yuque/0/2024/webp/21870146/1712794274479-31cd63b0-2ca8-41f0-be99-ecca2c4ecc84.webp#averageHue=%23fbfaf7&clientId=u42c65574-4dac-4&from=paste&id=u60849699&originHeight=486&originWidth=1080&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uba6a6be9-7980-42dc-b029-4f9c96d9def&title=)
我们在订单系统产生数据后，将订单这条数据发送给MQ，就返回成功，然后让短信、邮件等系统都订阅MQ，一旦发现MQ有消息，他们主动拉取消息，然后解析，进行业务处理。这样一来，就算你短信系统挂了，丝毫不会影响其他系统，而且如果后来想加一个新的系统，你也不用改订单系统的代码了，你只要订阅我们的MQ提供的消息就行了。
#### 异步处理
不用MQ，那么我们的代码必然耦合在一起，下单成功后，依次要通过RPC远程调用这几个系统，然后同步等到他们的响应才能返回给用户是否成功的结果。假设每个系统耗时200ms，那么就得花费600ms。
![](https://cdn.nlark.com/yuque/0/2024/webp/21870146/1712794440976-cc2f98a3-6e77-4afa-bf51-5b29b0c0e740.webp#averageHue=%23fbfaf7&clientId=u42c65574-4dac-4&from=paste&id=ufcf62750&originHeight=258&originWidth=1080&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u3b31266c-8afa-4173-9df0-cec284ebb09&title=)
所以这个逻辑我们可以设计成异步的。我们可以当下单成功后，只需要将订单消息发给MQ，然后立即将结果返回通知客户。这才是正确的打开姿势。这样一来，我订单系统只需要告诉你MQ，我下单成功了，其他模块收到消息后，该发短信的发短信，发邮件的发邮件。因为本来MQ的性能就很好，所以这个效率一下就提升了。
![](https://cdn.nlark.com/yuque/0/2024/webp/21870146/1712794494035-697523b8-06eb-48e7-bcd5-fe91bac3357f.webp#averageHue=%23fbfbf9&clientId=u42c65574-4dac-4&from=paste&id=ue78b3814&originHeight=462&originWidth=1080&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u92ede9da-4cb4-4e47-8e19-321e31e557a&title=)
#### 持久化
RabbitMQ 支持将消息持久化到磁盘，确保在服务器故障或重启后消息不会丢失。
**RabbitMQ在两种情况下会将消息写入磁盘：**

1. 消息本身在publish的时候就要求消息写入磁盘；
2. 内存紧张，需要将部分内存中的消息转移到磁盘；

消息保存于 `$MNESIA/msg_store_persistent/x.rdq` 文件中，其中 `x` 为数字编号，从1开始，每个文件最大为 `16M（16777216）`，超过这个大小会生成新的文件，文件编号加1。消息以以下格式存在于文件中：
```
<<Size:64, MsgId:16/binary, MsgBody>>
```
**文件何时删除？**
当所有文件中的垃圾消息（已经被删除的消息）比例大于阈值（GARBAGE_FRACTION = 0.5）时，会触发文件合并操作（至少有三个文件存在的情况下），以提高磁盘利用率。
publish消息时写入内容，ack消息时删除内容（更新该文件的有用数据大小），当一个文件的有用数据等于0时，删除该文件。
### 为什么选择 RabbitMQ？

1. RabbitMQ：它的吞吐量是每秒几万条消息，但是它的维护成本低，消息低延迟。
2. kafka：它的吞吐量是百万级，同时它的维护也更加困难，消息延迟较高。
3. RocketMQ：它的特点非常好。它高性能、满足可靠性、分布式事物、支持水平扩展、上亿级别的消息堆积、主从之间的切换等等。MQ的所有优点它基本都满足。但是它最大的缺点：商业版收费。因此它有许多功能是不对外提供的。
### 引入 MQ 的缺点

1. 系统的可用性降低：系统引入的外部依赖越多，系统越容易挂掉，本来只是A系统调用BCD三个系统接口就好，ABCD四个系统不报错整个系统会正常运行。引入了MQ之后，虽然ABCD系统没出错，但MQ挂了以后，整个系统也会崩溃。
2. 系统的复杂性提高：引入了MQ之后，需要考虑的问题也变得多了，如何保证消息没有重复消费？如何保证消息不丢失？怎么保证消息传递的顺序？
3. 一致性问题：A系统发送完消息直接返回成功，但是BCD系统之中若有系统写库失败，则会产生数据不一致的问题
## 安装 RabbitMQ
带有`management` 的是带有 web 管理页面的版本
```bash
docker pull rabbitmq:3.13.1-management
docker run -d \
-v /opt/rabbitmq/data:/var/lib/rabbitmq \
-p 5672:5672 -p 15672:15672 --name rabbitmq --restart=always \
--hostname myRabbit rabbitmq:3.9.12-management
```

- 5672：服务端口
- 15672：管理面板
## 使用 RabbitMQ
**路由规则：**

1. 直连交换机（Direct Exchange）：这是最简单和最常用的交换机类型。它将消息路由到与消息的路由键（Routing Key）完全匹配的队列。每个队列通过绑定键（Binding Key）与交换机进行绑定，当消息发送到交换机时，交换机会检查消息的路由键，并将其路由到绑定键与之完全匹配的队列中。
2. 主题交换机（Topic Exchange）：它根据消息的路由键与绑定键之间的模式匹配规则来路由消息。与直连交换机不同，主题交换机支持通配符匹配，这使得它可以实现更复杂的路由逻辑。
3. 扇形交换机（Fanout Exchange）：它将消息广播到所有绑定到该交换机上的队列中，不考虑消息的路由键。这种类型的交换机适用于需要将消息发送到多个消费者进行处理的场景。
4. 头交换机（Headers Exchange）：它根据消息的头部属性进行匹配，将消息路由到与之匹配的队列中。这种类型的交换机提供了更灵活的匹配规则，但相对于其他类型的交换机，其使用场景较为特殊。

**构造函数：**
```go
package rabbitMq

import (
  "log"

  amqp "github.com/rabbitmq/amqp091-go"
)

const MQURL = "amqp://guest:guest@127.0.0.1:5672/"

type RabbitMQ struct {
  Conn    *amqp.Connection
  Channel *amqp.Channel
  // 队列名称
  QueueName string
  // 交换机
  Exchange string
  // routing Key
  RoutingKey string
  // MQ链接字符串
  Mqurl string
}

func checkErr(err error, meg string) {
  if err != nil {
    log.Fatalf("%s:%s\n", meg, err)
  }
}

func NewRabbitMQ(queueName, exchange, routingKey string) (rabbitMQ *RabbitMQ, err error) {
  rabbitMQ = &RabbitMQ{
    QueueName:  queueName,
    Exchange:   exchange,
    RoutingKey: routingKey,
    Mqurl:      MQURL,
  }
  //创建 rabbitmq 连接
  rabbitMQ.Conn, err = amqp.Dial(rabbitMQ.Mqurl)
  checkErr(err, "创建连接失败")

  //创建Channel
  rabbitMQ.Channel, err = rabbitMQ.Conn.Channel()
  checkErr(err, "创建channel失败")

  return rabbitMQ, err
}

// 释放资源,建议NewRabbitMQ获取实例后 配合defer使用
func (mq *RabbitMQ) ReleaseRes() {
  mq.Conn.Close()
  mq.Channel.Close()
}

```
**producer：**
```go
package rabbitMq

import (
  "context"
  "fmt"

  amqp "github.com/rabbitmq/amqp091-go"
)

func ExecProducer() {
  var ctx = context.TODO()
  // 初始化mq
  mq, _ := NewRabbitMQ("queue_publisher", "exchange_publisher", "key1")
  defer mq.ReleaseRes() // 完成任务释放资源

  // // 1.声明队列
  // /*
  //   如果只有一方声明队列，可能会导致下面的情况：
  //    a)消费者是无法订阅或者获取不存在的MessageQueue中信息
  //    b)消息被Exchange接受以后，如果没有匹配的Queue，则会被丢弃

  //   为了避免上面的问题，所以最好选择两方一起声明
  //   ps:如果客户端尝试建立一个已经存在的消息队列，Rabbit MQ不会做任何事情，并返回客户端建立成功的
  // */
  _, err := mq.Channel.QueueDeclare( // 返回的队列对象内部记录了队列的一些信息，这里没什么用
    mq.QueueName, // 队列名
    true,         // 是否持久化
    false,        // 是否自动删除(前提是至少有一个消费者连接到这个队列，之后所有与这个队列连接的消费者都断开时，才会自动删除。注意：生产者客户端创建这个队列，或者没有消费者客户端与这个队列连接时，都不会自动删除这个队列)
    false,        // 是否为排他队列（排他的队列仅对“首次”声明的conn可见[一个conn中的其他channel也能访问该队列]，conn结束后队列删除）
    false,        // 是否阻塞
    nil,          // 额外属性
  )
  if err != nil {
    fmt.Println("声明队列失败", err)
    return
  }

  // // 2.声明交换器
  err = mq.Channel.ExchangeDeclare(
    mq.Exchange, //交换器名
    "topic",     //exchange type：一般用fanout、direct、topic
    true,        // 是否持久化
    false,       //是否自动删除（自动删除的前提是至少有一个队列或者交换器与这和交换器绑定，之后所有与这个交换器绑定的队列或者交换器都与此解绑）
    false,       //设置是否内置的。true表示是内置的交换器，客户端程序无法直接发送消息到这个交换器中，只能通过交换器路由到交换器这种方式
    false,       // 是否阻塞
    nil,         // 额外属性
  )
  if err != nil {
    fmt.Println("声明交换器失败", err)
    return
  }

  // // 3.建立Binding(可随心所欲建立多个绑定关系)
  err = mq.Channel.QueueBind(
    mq.QueueName,  // 绑定的队列名称
    mq.RoutingKey, // bindkey 用于消息路由分发的key
    mq.Exchange,   // 绑定的exchange名
    false,         // 是否阻塞
    nil,           // 额外属性
  )
  if err != nil {
    fmt.Println("绑定队列和交换器失败", err)
    return
  }

  // 4.发送消息
  mq.Channel.PublishWithContext(
    ctx,
    mq.Exchange,   // 交换器名
    mq.RoutingKey, // routing key
    false,         // 是否返回消息(匹配队列)，如果为true, 会根据binding规则匹配queue，如未匹配queue，则把发送的消息返回给发送者
    false,         // 是否返回消息(匹配消费者)，如果为true, 消息发送到queue后发现没有绑定消费者，则把发送的消息返回给发送者
    amqp.Publishing{ // 发送的消息，固定有消息体和一些额外的消息头，包中提供了封装对象
      ContentType: "text/plain",          // 消息内容的类型
      Body:        []byte("hello Jesse"), // 消息内容
    },
  )

}

```
**consumer：**
```go
package rabbitMq

import (
  "fmt"
  "log"
)

func ExecConsumer() {
  // 初始化mq
  mq, _ := NewRabbitMQ("queue_publisher", "exchange_publisher", "key1")
  defer mq.ReleaseRes() // 完成任务释放资源


  // 从队列获取消息
  msgChanl, err := mq.Channel.Consume(
    mq.QueueName, // 队列名
    "",           // 消费者名，用来区分多个消费者，以实现公平分发或均等分发策略
    true,         // 是否自动应答
    false,        // 是否排他
    false,        // 是否接收只同一个连接中的消息，若为true，则只能接收别的conn中发送的消息
    true,         // 队列消费是否阻塞
    nil,          // 额外属性
  )
  if err != nil {
    fmt.Println("获取消息失败", err)
    return
  }

  for msg := range msgChanl {
    message := string(msg.Body)
    log.Printf("Received a message: %s", message)
  }
}

```
