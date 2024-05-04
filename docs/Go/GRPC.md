# GRPC
## 什么是微服务？
当我们的服务负载过大时，我们一般会增加服务器，但是我们的服务可能是订单比较多，而其他的比较少。那么我们会这样做：用户认证中心一台服务器、订单服务三台服务器、支付一台服务器等等，而这是单体架构做不到的。
**单体架构：**

1. 一旦某个服务宕机，会引起整个应用不可用，隔离性差
2. 只能整体应用进行伸缩，浪费资源，可伸缩性差
3. 代码耦合在一起，可维护性差

**微服务：（解决了单体架构的问题）**

1. 代码冗余
2. 服务和服务之间存在调用关系

服务拆分后，服务和服务之间发生的是进程和进程之间的调用，服务器和服务器之间的调用。那么就需要发起网络调用，网络调用我们能立马想起的就是http，但是在微服务架构中，http虽然便捷方便，但性能较低，这时候就需要引入RPC(远程过程调用)，通过自定义协议发起TCP调用，来加快传输效率。
### gRPC
官网：https:/lgrpc.io/
中文文档： [http://doc.oschina.net/grpc](http://doc.oschina.net/grpc)
RPC的全称是Remote ProcedureCal，远程过程调用。这是一种协议，是用来屏蔽分布式计算中的各种调用细节，使得你可以像是本地调用一样直接调用一个远程的函数。

**客户端与服务端沟通的过程：**

1. 客户端发送二进制流数据
2. 服务端接受并解析。根据约定知道要执行什么。然后把结果返回给客户端

protobuf是谷歌开源的一种数据格式，适合高性能，对响应速度有要求的数据传输场景。因为profobuf是二进制数据格式，需要编码和解码。数据本身不具有可读性。因此只能反序列化之后得到真正可读的数据。优势：

1. 序列化后体积相比Json和XML很小，适合网络传输
2. 支持跨平台多语言
3. 消息格式升级和兼容性还不错
4. 序列化反序列化速度很快
## 安装
### 安装 protocol 编译器（其他语言）

1. 找到相对应的版本

[Releases · protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf/releases)
**查看 linux 架构：**
```bash
uname -m
## or
arch
```

2. 安装到指定位置
```bash
mkdir /usr/local/protobuf
unzip -d /usr/local/protobuf protoc-26.1-linux-x86_64.zip
```

3. 加入环境变量
```bash
## protobuf 执⾏程序搜索路径
export PATH=$PATH:/usr/local/protobuf/bin/
```
```bash
vi ~/.zshrc
source ~/.zshrc
protoc --version
libprotoc 26.1
```
### 安装 gRPC 核心库（go）
```bash
go get google.golang.org/grpc
```
### 安装 protocol 代码生成工具
上面安装的是protocol编译器。它可以生成各种不同语言的代码。因此，除了这个编译器，我们还需要配合各个语言的代码生成工具。
```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```
如果是 install，它会自动帮我们放入 GOPATH 的 bin 中：
![image.png](https://cdn.nlark.com/yuque/0/2024/png/21870146/1714635180192-9ef4274c-b580-48ec-8263-dba203a800ae.png#averageHue=%23340f28&clientId=u5b44db80-8026-4&from=paste&height=161&id=u5489fddd&originHeight=321&originWidth=1329&originalType=binary&ratio=2&rotation=0&showTitle=false&size=32455&status=done&style=none&taskId=ua061fb2a-2233-41fc-b180-209b9c0f3ac&title=&width=664.5)
因此这里也需要加入环境变量
```bash
## protobuf 执⾏程序搜索路径
export PATH=$PATH:/home/jesse/go/bin/
```
因为 Go 在安装 `go get google.golang.org/grpc` 的时候已经下载了一个 go 版本的编译器，所以我们可以直接设置为 GOPATH。
## proto 文件
```protobuf
// 这是在说明我们使用的是 proto3 语法
syntax ="proto3";

// 这部分的内容是关于最后生成的 go 文件是处在哪个目录哪个包中，"."代表在当前目录生成，"service"代表了生成的go文件的包名
option go_package = ".;service";

// 然后我们需要定义一个服务，在这个服务中需要有一个方法，这个方法可以接受客户端的参数，再返回服务端的响应。
// 其实很容易可以看出，我们定义了一个service，称为SayHello，这个服务中有一个rpc方法，名为SayHello。
// 这个方法会发送一个HelloRequest，然后返回一个HelloResponse。
service SayHello {
  rpc SayHello(HelloRequest) returns(HelloResponse) {}
}


// 这里的 1、2、3... 只是一个标识，无其他特殊含义
message HelloRequest {
  string requestName = 1;
  // int64 age = 2;
}
message HelloResponse {
  string responseMsg = 1;
}
```
### 生成代码
```bash
protoc --go_out=. hello.proto ## 服务端代码
protoc --go-grpc_out=. hello.proto ## 客户端代码
```
### proto 语法
#### 切片
```protobuf
message Person {
  repeated int32 weight =3;
}
```
repeate: 消息体中可重复字段，重复的值的顺序会被保留在go中重复的会被定义为切片。
#### 嵌套消息
可以在其他消息类型中定义、使用消息类型，在下面的例子中，person消息就定义在Personlnfo消息内如下：
```protobuf
message PersonInfo {
  message Person {
    string name =1;
    int32 height =2:
    repeated int32 weight =3;
  }
  repeated Person info =1:
}

// 如果要在它的父消息类型的外部重用这个消息类型，需要Personnfo.Person的形式使用它，如下:
message PersonMessage {
  PersonInfo.Person info=1:
}
```
#### 服务定义
如果想要将消息类型用在RPC系统中，可以在**.proto文件中定义一个RPC服务接口** protocol buffer编译器将会根据所选择的不同语言生成服务接口代码及存根。
```protobuf
service searchservice{
  // rpc 服务函数名(参数)返回(返回参数)
  rpc search(searchRequest)returns(SearchResponse)
  ...
}
```
## 安全传输
gRPC 是一个典型的C/S模型，需要开发客户端和服务端，客户端与服务端需要达成协议，使用某一个确认的传输协议来传输数据，gRPC通常默认是使用protobuf来作为传输协议，当然也是可以使用其他自定义的。此处说到的认证，不是用户的身份认证，而是指多个 server 和多个 client 之间，如何识别对方是谁，并且可以安全的进行数据传输：

- SSL/TLS认证方式
- 基于Token的认证方式
- 不采用任何措施的连接，这是不安全的连接
- 自定义的身份认证
### SSL/TLS 是什么？
TLS (Transport laver Security，安全传输层)，TLS是建立在传输层TCP协议之上的协议，服务于应用层，它的前身是SSL(Secure Socket Layer)，它实现了将应用层的报文进行加密后再交由TCP进行传输的功能。
TLS协议主要解决如下三个网络安全问题：

1. 保密(message privacy)，保密通过加密encryption实现，所有信息都加密传输，第三方无法噢探。
2. 完整性(message integrity)，通过MAC校验机制，一旦被篡改，通信双方会立刻发现。
3. 认证(mutual authentication)，双方认证,双方都可以配备证书，防止身份被冒充。

**证书：**

- key: 服务器上的私钥文件，用于对发送给客户端数据的加密，以及对从客户端接收到数据的解密。
- csr: 证书签名请求文件，用于提交给证书颁发机构(CA)对证书签名。
- crt: 由证书颁发机构(CA)签名后的证书，或者是开发者自签名的证书，包含证书持有人的信息，持有人的公钥，以及签署者的签名等信息。
- pem: 是基于Base64编码的证书格式，扩展名包括PEM、CRT和CER
> 生产环境可以购买证书或者使用一些平台发放的免费证书

### SSL/TLS 认证方式
首先通过 openssl 生成证书和私钥，在 ubuntu 中默认存在 openssl，所以我们直接用即可，如果没有需要安装。

1. 生成 ca 
```bash
## 1. 生成 ca 的私钥
openssl genrsa -out server.key 2048

## 2. 生成 ca 的根证书（可以不填，全部直接回车）
openssl req -new -x509 -key server.key -out server.crt -days 36500
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:GuangDong
Locality Name (eg, city) []:ShenZhen
Organization Name (eg, company) [Internet Widgits Pty Ltd]:DaGongRen
Organizational Unit Name (eg, section) []:IT
Common Name (e.g. server FQDN or YOUR name) []:test
Email Address []:123@qq.com

## 3. 生成 ca 的证书请求文件
openssl req -new -key server.key -out server.csr
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:GuangDong
Locality Name (eg, city) []:ShenZhen
Organization Name (eg, company) [Internet Widgits Pty Ltd]:DaGongRen
Organizational Unit Name (eg, section) []:IT
Common Name (e.g. server FQDN or YOUR name) []:test
Email Address []:123@qq.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:123456
An optional company name []:123456
```

2. 修改 openssl 的 config 文件：
   1. 复制一份你安装的 openssl 的 bin 目录里面的 `openssl.cnf`文件到你项目所在的目录

可以通过以下命令获取位置：
```bash
openssl version -d
```

   2. `[ ca_default ]` 中打开 `copy_extensions =copy`
   3. `[ req ]` 中打开 `req_extensions = v3_reg`
   4. `[ v3_req ]`中添加 `subjectAltName = @alt_names`
   5. 添加新标签 alt_names：
```nginx
[ alt_names ]
DNS.1 = *.test.com
```

3. 生成 C/S 证书并使用 CA 进行签发
```bash
## 生成证书私钥
openssl req -new -nodes -key test.key -out test.csr -days 3650 -subj "/C=cn/OU=myorg/O=mycomp/CN=myname" -
config ./openssl.cnf -extensions v3_req
## 通过私钥 test.key 生成证书请求文件 test.csr
openssl req -new -nodes -key test.key -out test.csr -subj "/C=cn/OU=myorg/O=mycomp/CN=myname" -config ./ope
nssl.cnf -extensions v3_req
## 用本地 ca 来签发证书
openssl x509 -req -days 365 -in test.csr -out test.pem -CA server.crt -CAkey server.key -CAcreateserial -ex
tfile ./openssl.cnf -extensions v3_req
```
> 注意：使用OpenSSL成功生成了自签名的SSL证书，在浏览器中会被标记为不受信任，如果你需要使用受信任的SSL证书，你需要从受信任的证书颁发机构（CA）购买或获取免费的证书。

### TOKEN 认证
我们先看一个gRPC提供我们的一个接口,这个接口中有两个方法，接口位于credentials 包下，这个接口需要客户端来实现：
```go
type PerRPcCredentials interface {
	GetRequestMetadata(ctx context.Context, uri ...string) (map[string]string, error)
	RequireTransportSecurity() bool
}
```

- 第一个方法作用是获取元数据信息，也就是客户端提供的kev,valve对，context用于控制超时和取消，uri是请求入口处的uri。
- 第二个方法的作用是否需要基于 TLS 认证进行安全传输，如果返回值是true，则必须加上TLS验证，返回值是false则不用。
### 例子
客户端：
```go
func (c ClientTokenAuth) GetRequestMetadata(ctx context.Context, uri ...string) (data map[string]string, err error) {
  data = map[string]string{
    "appid":  "Jesse",
    "appkey": "123456",
  }

  return data, err
}
func (c ClientTokenAuth) RequireTransportSecurity() bool {
  return true
}

func main() {
	creds, _ := credentials.NewClientTLSFromFile("/home/jesse/project/grpc-study/key/test.pem", "*.test.com")
	// 连接到 server，此处禁用安全加密，没有加密和验证
	conn, err := grpc.Dial("127.0.0.1:9090", grpc.WithTransportCredentials(creds), grpc.WithPerRPCCredentials(new(ClientTokenAuth)))
	if err != nil {
		log.Fatalln("did not connect:", err)
	}
	defer conn.Close()

	// 建立连接
	client := pb.NewSayHelloClient(conn)
	ctx := context.Background()
	// 执行 rpc
	res, err := client.SayHello(ctx, &pb.HelloRequest{RequestName: "Jesse"})
	if err != nil {
		log.Println("rpc err: ", err)
	}
	fmt.Println(res.GetResponseMsg())
}
```
服务端：
```go
type server struct {
	pb.UnimplementedSayHelloServer
}

func (s *server) SayHello(ctx context.Context, req *pb.HelloRequest) (res *pb.HelloResponse, err error) {

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errors.New("未传输token!")
	}
	mdMap := md.Copy()

	// 将 map 转换为 JSON
	jsonBytes, err := json.Marshal(mdMap)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(jsonBytes))
	var mdObj struct {
		Appid  []string `json:"appid"`
		Appkey []string `json:"appkey"`
	}
	json.Unmarshal(jsonBytes, &mdObj)

	if mdObj.Appid[0] != "Jesse" || mdObj.Appkey[0] != "123456" {
		return nil, errors.New("token 不正确!")
	}

	res = &pb.HelloResponse{
		ResponseMsg: "hello, " + req.RequestName,
	}
	return res, err
}

func main() {
  creds, _ := credentials.NewServerTLSFromFile("/home/jesse/project/grpc-study/key/test.pem", "/home/jesse/project/grpc-study/key/test.key")
  // 开启端口
  listen, _ := net.Listen("tcp", ":9090")
  // 创建 gRPC 服务
  grpcServer := grpc.NewServer(grpc.Creds(creds))
  // 在 gRPC 服务端中注册我们自己编写的服务
  pb.RegisterSayHelloServer(grpcServer, &server{})
  // 启动服务
  err := grpcServer.Serve(listen)
  if err != nil {
    log.Println("启动服务失败！err: ", err)
  }
}
```
