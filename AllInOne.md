# JMSF应用开发手册

* [0-开发指南](README.md)
* [通用开发指南](section1/README.md)
  * [0.0-如何打FatJar包](section1/0.0-ru-he-da-fatjar-bao.md)
  * [0.1-YAML格式介绍](section1/0.1-yaml-ge-shi-jie-shao.md)
  * [0.2-制作容器镜像（openJDK）](section1/0.2-zhi-zuo-rong-qi-jing-xiang-openjdk.md)
  * [0.3-SDK下载](section1/0.3-sdk-xia-zai.md)
* [应用开发指南](section2/README.md)
  * [1.0-应用开发概述](section2/1.0-ying-yong-kai-fa-gai-shu.md)
  * [1.1.1-原生应用开发](section2/1.1.1-yuan-sheng-ying-yong-kai-fa.md)
  * [1.2.0-SDK版本概述](section2/1.2.0-sdk-ban-ben-gai-shu.md)
  * [1.2.1-SpringCloud vs SDK概述](section2/1.2.1-springcloud-vs-sdk-gai-shu.md)
  * [1.2.2-Spring Cloud Demo工程概述](section2/1.2.2-demo-gong-cheng-gai-shu.md)
  * [1.2.3-Spring Cloud服务注册与发现](section2/1.2.3-fu-wu-zhu-ce-yu-fa-xian.md)
  * [1.2.4-配置管理](section2/1.2.4-pei-zhi-guan-li.md)
  * [1.2.5-Spring Cloud服务治理](section2/1.2.5-fu-wu-zhi-li.md)
  * [1.2.6-参数传递](section2/1.2.6-can-shu-chuan-di.md)
  * [1.2.7-API注册](section2/1.2.7-api-zhu-ce.md)
  * [1.2.8-Dubbo SDK开发指南](section2/1.2.8-dubbo-sdk-dev.md)

## 通用开发指南

该章节包含了您在开发过程中所用到的的常规操作内容。

- [如何打FatJar包](./section1/0.0-ru-he-da-fatjar-bao.md)
- [YAML格式介绍](./section1/0.1-yaml-ge-shi-jie-shao.md)
- [制作容器镜像（openJDK）](./section1/0.2-zhi-zuo-rong-qi-jing-xiang-openjdk.md)
- [SDK下载](./section1/0.3-sdk-xia-zai.md)

## 应用开发指南

您可以根据业务场景需要，自由选择Spring Cloud，Dubbo或者Mesh应用进行开发，然后部署到JMSF中。具体的应用场景与功能差异请参考[应用开发概述](./1-应用开发指南/0-应用开发概述.md)。

- [原生应用开发](./section2/1.1.1-yuan-sheng-ying-yong-kai-fa.md)
- [Spring Cloud应用开发](./section2/1.2.2-demo-gong-cheng-gai-shu.md)
- [Dubbo应用开发](./section2/1.2.8-dubbo-sdk-dev.md)

# 通用开发指南

## 什么是FatJar

FatJar 是一种可执行的 Jar 包（Executable Jar）。FatJar 和普通的 Jar 不同在于它包含了依赖的 Jar 包。

## 添加FatJar打包方式

在工程的 pom.xml 文件中添加插件：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

## 打包FatJar文件

添加完插件后，在工程的主目录下，使用 maven 命令 `mvn clean package` 进行打包，即可在 target 目录下找到打包好的 FatJar 文件。

## 什么是YAML格式

YAML 专门用来写配置文件的语言。


## 语法规则

YAML 的基本语法规则如下：
- 大小写敏感。
- 使用缩进表示层级关系。
- 缩进时**不允许**使用 Tab 键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可。

## 数据结构

YAML 支持三种数据结构：对象、数组和纯量。

- 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
- 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
- 纯量（scalars）：单个的、不可再分的值

### 对象

简单对象

```yaml
foo: whatever
bar: stuff
```

复杂对象 
```yaml
foo: whatever 
bar: 
 - 
   fruit: apple 
   name: steve 
   sport: baseball 
 - more 
 - 
   python: rocks 
   perl: papers 
   ruby: scissorses
```


转换为 JavaScript 代码后：
```javascript
{ 
  foo: 'whatever',
  bar: 
   [ 
     { fruit: 'apple', name: 'steve', sport: 'baseball' },
     'more',
     { python: 'rocks', perl: 'papers', ruby: 'scissorses' } 
   ] 
}
```


### 数组

```yaml
- Cat
- Dog
- Goldfish
```

### 纯量

纯量是最基本的、不可再分的值。

```
- 字符串
- 布尔值
- 整数
- 浮点数
- Null
- 时间
- 日期
```

#### 字符串

字符串是比较复杂的类型，举例说明：

```
str: 这是一行字符串
```

如果字符串之中包含空格或特殊字符，需要放在引号之中。

```
str: '内容: 字符串'
```

单引号和双引号都可以使用，双引号不会对特殊字符转义。

```yaml
s1: '内容\n字符串' # 会对 \n 字符转义
s2: "内容\n字符串" # 不会对 \n 字符转义
```

多行字符串可以使用 `|` 保留换行符，也可以使用 `>` 折叠换行。
```yaml
this: |
  Foo
  Bar
that: >
  Foo
  Bar
```


转换为 JavaScript 代码：

```javascript
{ this: 'Foo\nBar\n', that: 'Foo Bar\n' }
```

## 工具

- 提供了一个 [YAML 的格式校验工具](https://www.bejson.com/validators/yaml_editor/)，供参考
- [YAML 和 Properties 格式互转工具](http://www.toyaml.com/)

## 参考

- [YAML 语言教程 - 阮一峰](http://www.ruanyifeng.com/blog/2016/07/yaml.html)
- [Yaml Cookbook](http://yaml.org/YAML_for_ruby.html)：提供了很多典型的 YAML 用例
- [YAML Syntax - Ansible](http://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)：写了一些 YAML 的常见陷阱

## 准备构建材料
该任务指导您通过 Spring Cloud 和 Mesh 两种方式制作容器镜像。

### Spring Cloud应用构建材料

**1. 简化版本**

简化版本的 Dockerfile 不包含文件配置和 JVM 监控功能，仅需要用户替换掉 Dockerfile 中 Spring Cloud 应用 jar 包名称，您也可以先试用 JMSF 提供的 Spring Cloud 应用 Demo JAR 包。

>在 Spring Cloud 应用 JAR 包同级目录下编写 Dockerfile。

```dockerfile
FROM openjdk:11
RUN echo "ip_resolve=4" >> /etc/yum.conf

# 设置时区。这对于日志、调用链等功能能否在控制台被检索到非常重要。
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
ENV workdir /app/

# 下面的jar包可替换为您的 Spring Cloud 应用jar包，注意这个jar包要和您的dockerfile位于同一级目录
ENV jar provider-demo-0.0.1-SNAPSHOT.jar
COPY ${jar} ${workdir}
WORKDIR ${workdir}

# JAVA_OPTS环境变量的值为部署组的JVM启动参数，在运行时bash替换。使用 exec 以使Java程序可以接收SIGTERM信号。
CMD ["sh", "-ec", "exec java ${JAVA_OPTS} -jar ${jar}"]
```

##  构建镜像
1. 在`Dockerfile`所在目录执行`build`命令：
```bash
docker build . -t xxxx.jdcloud.com/jmesh_<主账号 ID>/<应用名>:[tag]
```
其中`<主账号 ID>`对应用户平台的**主账号 ID**（注意不是当前登录账号 ID，主账号 ID 可以在平台个人信息页面获取。），`<应用名>`表示控制台上的应用名。`tag`为镜像的 tag，用户可自定义。
2. 命令执行完成后，通过`docker image ls`查看创建的镜像。

## 开发前准备

在执行安装脚本之前，请确保您的机器上已经安装了 Java 和 Maven。

### 1. 安装 Java

#### 1.1 检查 Java 安装

打开终端，执行如下命令：

```
java -version
```

如果输出 Java 版本号，说明 Java 安装成功；如果没有安装 Java，请 [下载安装 Java 软件开发套件（JDK）](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。


#### 1.2 设置 Java 环境

设置`JAVA_HOME`环境变量，并指向您机器上的 Java 安装目录。 将 Java 编译器地址添加到系统路径中。

| 操作系统 | 输出                                                         |
| -------- | ------------------------------------------------------------ |
| Windows  | 将字符串“;C:\Program Files\Java\jdkx.xx\bin”添加到系统变量“Path”的末尾 |
| Linux    | export PATH=$PATH:$JAVA_HOME/bin/                            |
| Mac OSX  | not required                                                 |

使用上面提到的 **java -version** 命令验证 Java 安装。

### 2. 安装 Maven 

#### 2.1 下载  安装 Maven 

参考 [Maven 下载](https://maven.apache.org/download.cgi)。

#### 2.2 设置 MAVEN_HOME 和 PATH 环境变量



#### 2.3 验证 Maven 安装

当 Maven 安装完成后， 通过执行如下命令验证 Maven 是否安装成功。

```bash
  mvn --version
```

若出现正常的版本号信息后，说明 Maven 安装成功。

### 3. 引入 SDK

在您的 Java 应用工程的 pom.xml 中添加依赖的 JMSF SDK 的 group、artifaceId、version 等信息后（参考对应的应用开发文档），在 pom.xml 所在目录执行 `mvn clean package` 即可下载 JMSF SDK，如下所示。

```xml
<dependency>
    <groupId>com.jdcloud.jmsf</groupId>
    <artifactId>spring-cloud-starter-jmsf</artifactId>
    <version>${jmsf.version}</version>
</dependency>
```

# 应用开发指南

## 1.0.0 应用开发概述

JMSF支持Spring Cloud原生应用、JMSF SDK应用和多协议多语言Mesh应用，您可以根据业务场景需要开发应用，并部署到JMSF上。

| 功能       | 原生应用                                 | JMSF SDK应用          | Mesh应用                              |
| ---------- | ---------------------------------------- | ---------------------- | ------------------------------------- |
| 适用场景   | 存量业务应用，开源Spring Cloud零代码改造 | 新业务全新技术框架选型 | 适配不同语言接入（PHP、Java、Python） |
| 注册发现   | 支持                                     | 支持                   | 支持                                  |
| 服务鉴权   | 支持                                     | 支持                   | 支持（Mesh流量劫持）                  |
| 服务限流   | 支持                                     | 支持                   | 支持（Mesh流量劫持）                  |
| 服务熔断   | 支持                                     | 支持                   | 支持（Mesh流量劫持）                  |
| 服务路由   | 支持                                     | 支持                   | 支持（Mesh流量劫持）                  |
| 配置管理   | 不支持                                   | 支持                   |                                       |
| 优雅下线   | 结合微服务网关 + Mesh 标签               | 结合微服务网关 + SDK   | 结合微服务网关 + Mesh 标签            |
| 全链路灰度 | 支持                                     | 支持                   | 支持                                  |

## 1.1.1 原生应用开发

JMSF支持原生 Spring Cloud 应用无侵入接入，无需改造即可直接接入JMSF，享受服务注册与发现、服务治理、应用监控和调用链跟踪等功能。

### 优势说明

* 无需修改应用代码
* 无需引入额外 SDK（除调用链外）
* 无需额外配置

### 实现原理

应用到注册中心的所有请求如注册、发现，会被代理到我们自己的注册中心从而完成服务的注册和发现。当前的服务治理功能是基于JMSF来实现的，服务调用会经过JMSF 的 sidecar，在 sidecar 中实现负载均衡、服务路由等治理功能。

>服务中的熔断、限流功能可能会与JMSF自身的功能冲突，请确保只开启了一种，否则可能会产生非预期的结果。如果确定要启用JMSF的治理功能来代替服务自身的，可以参考 [关闭服务熔断和限流规则]()。

### 功能说明

目前仅支持 Spring Cloud，支持基于Consul的注册中心和配置中心。后续可能支持更多语言和框架，以及更多注册中心。具体如下：

| Spring Cloud 功能 | 开源实现                          | 原生应用 | 说明                                                  |
| ----------------- | --------------------------------- | -------- | ----------------------------------------------------- |
| 注册发现          | Consul Discovery                  | 兼容     | -                                                     |
| 负载均衡          | Spring Cloud Loadbalancer         | 兼容     | -                                                     |
| 服务调用          | Feign,RestTemplate,WebClient      | 兼容     | 自定义标签，需在 HTTP 请求头添加JMesh-Tags: KEY=VALUE |
| 服务限流          | -                                 | 支持     | 自定义标签，需在 HTTP 请求头添加JMesh-Tags: KEY=VALUE |
| 服务熔断          | hystrix                           | 支持     | -                                                     |
| 服务鉴权          | -                                 | 支持     | 自定义标签，需在 HTTP 请求头添加JMesh-Tags: KEY=VALUE |
| 配置管理          | Config Server Consul Config       | 支持     | 引入JMSF SDK                                         |
| 链路追踪          |                                   | 兼容     | -                                                     |
| 微服务网关        | Spring Cloud Gateway Netflix Zuul | 兼容     | -                                                     |

## 1.2.0 SDK版本概述
### Spring Cloud版本配套关系说明
JMSF目前支持 Spring Cloud 最新版本。Spring Cloud 、Spring Boot 及 JMSF SDK 版本之间的关系如下表所示。

| Spring Cloud | Spring Boot |
| ------------ | ----------- |
| 2020.0.x     | 2.5.x       |

| SDK 版本号 | 新增特性                                                     |
| ---------- | ------------------------------------------------------------ |
| 1.0.0      | 支持基于Consul的服务注册与发现，服务限流，熔断，服务路由，服务鉴权等功能。 |
| 1.1.0      | 融合MeshWare服务治理SDK。                                    |
| 1.2.0      | 加入Nacos注册中心支持模块。                                  |

### Dubbo版本配套关系说明

JMSF目前支持的Dubbo版本为使用范围最广的2.7.x版本，SDK基于此版本进行的服务治理功能增强。

| SDK版本      | Dubbo版本 | 特性说明                                                     |
| ------------ | --------- | ------------------------------------------------------------ |
| 1.x.x (lite) | 2.7.13    | 支持自动服务注册发现，Istio服务治理功能。                    |
| 1.x.x (pro)  | 2.7.13    | 支持服务注册，发现自定义服务路由，负载均衡，熔断降级，服务鉴权，服务限流等治理功能。 |

## 1.2.1 SpringCloud vs 原生SDK概述

JMSF支持原生 Spring Cloud 微服务框架，开发者只需要添加依赖和修改配置即可使用服务注册、限流、熔断、分布式配置等能力。

### 兼容性说明

JMSF兼容主流Spring Cloud版本，具体可参考 [SDK 版本概述](./section2/1.2.0-sdk-ban-ben-gai-shu.md)。Spring Cloud功能、开源实现及JMSF兼容性如下表所示：

| Spring Cloud 功能 | 开源实现                                         |          JMSF SDK兼容性           | 说明                                                         |
| ----------------- | ------------------------------------------------ | :-------------------------------: | ------------------------------------------------------------ |
| 服务注册与发现    | Netflix Eureka，Consul                           |        基于Consul开源增强         | 提供高可用注册中心，无须用户自行搭建                         |
| 负载均衡          | Netflix Ribbon                                   | 基于Spring Cloud Loadbalancer增强 | -                                                            |
| 服务调用          | RestTemplate/AsyncRestTemplate，Feign，WebClient |               兼容                | -                                                            |
| 调用链            | Spring Cloud Sleuth                              |               自研                | 提供服务依赖拓扑、调用链查询基础功能，同时支持调用链与业务日志联动、调用链支持下游组件等高级特性 |
| 分布式配置        | Spring Cloud Config，Consul Config               |        基于Consul开源增强         | 支持通过控制台管理配置，发布配置和查看配置发布历史           |
| 熔断降级          | Spring Cloud Hystrix                             |       基于Sentinel开源增强        | JMSF采用Sentinel作为底层实现，增强实现熔断                   |

## 1.2.2 Spring Cloud Demo工程概述

### 开发前准备

开发前，请确保已下载安装了 Java 和 Maven。

### 获取 Demo

[Demo 下载地址 >>](https://github.com/jdcloud-jmsf/spring-cloud-demo)

### Demo 工程目录

`spring-cloud-demo`的工程目录如下：

| 工程名称               | 工程说明           |
| ------------------ | -------------- |
| jmsf-consumer-demo | JMSF微服务治理服务消费者 |
| jmsf-provider-demo | JMSF微服务治理服务提供者 |

1. pom.xml 中定义了工程需要的依赖包（以下以基于 Spring Cloud Finchley 版本 SDK 举例说明）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <groupId>com.jdcloud.jmsf</groupId>
        <artifactId>spring-cloud-jmsf-dependencies</artifactId>
        <version><!-- 调整为SDK正式发布版本号 --></version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>jmsf-consumer-demo</artifactId>
    <name>JMSF - Spring Cloud Consumer Demo</name>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.jdcloud.jmsf</groupId>
            <artifactId>spring-cloud-starter-jmsf</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
              <groupId>org.springframework.boot</groupId>
              <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

其中 parent 描述了不同微服务 demo 共同的JMSF依赖。

```xml
<parent>
    <groupId>com.jdcloud.jmsf</groupId>
    <artifactId>spring-cloud-jmsf-dependencies</artifactId>
    <version><!-- 调整为SDK正式发布版本号 --></version>
</parent>
```

关于 Maven 环境安装以及JMSF SDK下载，请参考 [SDK 下载](../../0-%E9%80%9A%E7%94%A8%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/3-SDK%E4%B8%8B%E8%BD%BD.md) 和 [SDK版本概述](../../0-SDK%E7%89%88%E6%9C%AC%E6%A6%82%E8%BF%B0.md) 。

1. 当您不希望采用`parent`依赖JMSF的dependencies时，可以采用`dependencyManagement`方式引入依赖。

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.jdcloud.jmsf</groupId>
      <artifactId>spring-cloud-jmsf-dependencies</artifactId>
      <version><!-- 调整为SDK正式发布版本号 --></version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

### 依赖项及注解使用

1. 向工程中添加依赖。在`pom.xml`中添加以下代码：

```xml
<dependency>
    <groupId>com.jdcloud.jmsf</groupId>
    <artifactId>spring-cloud-starter-jmsf</artifactId>
    <version><!-- 调整为SDK正式发布版本号 --></version>
</dependency>
```

`spring-cloud-starter-jmsf` 中包含了服务注册发现、服务路由、服务鉴权、服务限流、服务熔断、服务容错、分布式配置等功能。

1. 默认不需要加入任何注解，引入starter包后默认启用所有功能，可通过如下配置关闭整体特性：

```yaml
jmsf:
  enabled: true #关闭SDK包所有功能（默认开）
  metadata:  #自定义标签
    aa: aa
    bb: bb
  route:
    load-balance: random  
    retryable-status-codes:   #配置应用请求重试的状态码
      - 404
      - 500
      - 502
  circuit-breaker:
    enabled: true   #熔断降级开关（默认开）

  swagger:
    enabled: true  #API到处到控制台开关（默认开）
    basePackage: com.jdcloud  #API扫描路径
```

## 1.2.3 Spring Cloud服务注册与发现

### 操作场景

我们尽可能的保证用户对原生Spring Cloud的使用习惯，避免用户因使用SDK为注册发现进行多余配置。所以，引入SDK的注册发现与使用原生Spring Cloud无差别。以下将指引您在本地开发Spring Cloud微服务示例应用并注册到JMSF服务注册发现中心，或者将已经接入 Eureka 服务注册与发现的应用迁移到JMSF服务注册发现中心。

### 前提条件

开始实践服务注册发现功能前，请确保已完成 [SDK 下载]。

### 本地开发应用

创建 jmsf-demo 工程，文件结构如下：

```
|- jmsf-consumer-demo
|- jmsf-provider-demo
|- pom.xml
```

其中`pom.xml`文件参考 [Demo 工程概述] 中的`pom.xml`内容。

#### 1. 创建服务提供者

在本地创建服务提供者应用工程，此服务提供者提供一个简单的 echo 服务，并将自身注册到服务注册中心。

**1.1 创建 provider 工程**

创建一个 Spring Cloud 工程，命名为`jmsf-provider-demo`。

**1.2 修改 pom 依赖**

在`pom.xml`中引入需要的依赖内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.jdcloud.jmsf</groupId>
    <artifactId>jmsf-provider-demo</artifactId>
    <version>1.0.0</version>
    <name>JMSF - Spring Cloud Provider Demo</name>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

      <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.jdcloud.jmsf</groupId>
                <artifactId>spring-cloud-jmsf-dependencies</artifactId>
                <version><!-- 调整为SDK正式发布版本号 --></version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
  
    <dependencies>
        <dependency>
            <groupId>com.jdcloud.jmsf</groupId>
            <artifactId>spring-cloud-starter-jmsf</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

**1.3 开启服务注册发现**

添加服务提供端的代码，如需使用。

```java
// 省略部分 import
import org.springframework.cloud.openfeign.EnableFeignClients;
 
@SpringBootApplication
@EnableFeignClients // 使用Feign微服务调用时请启用
public class ProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
}
```

**1.4 提供 echo 服务**

创建一个`EchoController`，提供简单的`echo`服务。

```java
 @RestController
 public class EchoController {
     @RequestMapping(value = "/echo/{string}", method = RequestMethod.GET)
     public String echo(@PathVariable String string) {
         return string;
     }
 }
```

**1.5 修改配置**

在`resource`目录下的`application.yml`文件中配置应用名与监听端口号。

```yaml
server:
  port: 8080
spring:
  application:
    name: jmsf-provider-demo
```

> 运行在JMSF平台上的应用无须配置服务注册中心地址，SDK会通过环境变量自动获取注册中心地址。

#### 2. 创建服务消费者

本小节中，我们将创建一个服务消费者，消费者通过`RestTemplate`、`WebClient`、`FeignClient`这三个客户端去调用服务提供者。

**2.1 创建 consumer 工程**

创建一个 Spring Cloud 工程，命名为`jmsf-consumer-demo`。

**2.2 修改 pom 依赖**

在`pom.xml`中引入需要的依赖内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.jdcloud.jmsf</groupId>
    <artifactId>jmsf-consumer-demo</artifactId>
    <version>1.0.0</version>
    <name>JMSF - Spring Cloud Consumer Demo</name>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

      <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.jdcloud.jmsf</groupId>
                <artifactId>spring-cloud-jmsf-dependencies</artifactId>
                <version><!-- 调整为SDK正式发布版本号 --></version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
  
    <dependencies>
        <dependency>
            <groupId>com.jdcloud.jmsf</groupId>
            <artifactId>spring-cloud-starter-jmsf</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

**2.3 开启服务注册发现**

与服务提供者`provider-demo`相比，除了开启服务与注册外，还需要添加两项配置才能使用`RestTemplate`、`AsyncRestTemplate`、`FeignClient`这三个客户端：

* 添加`@LoadBalanced`注解将`RestTemplate`与`AsyncRestTemplate`与服务发现结合。
* 使用`@EnableFeignClients`注解激活`FeignClients`。

```java
// 省略部分 import
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.client.AsyncRestTemplate;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableFeignClients // 使用 Feign 微服务调用时请启用
public class ConsumerApplication {

    public static void main(String[] args) throws InterruptedException {
        SpringApplication.run(ConsumerApplication.class, args);
    }
}
```

**2.4 设置调用信息**

在使用`EchoService`的`FeignClient`之前，还需要完善它的配置。配置服务名以及方法对应的 HTTP 请求，服务名为`provider-demo`工程中配置的服务名`provider-demo` ，代码如下：

```java
@FeignClient("${PROVIDER_NAME:jmsf-provider-demo}")
public interface FooService {

    @GetMapping(value = "/echo/{str}")
    String echo(@PathVariable("str") String str);
}
```

**2.5 创建 Controller**

创建一个`Controller`供调用测试。

* `/echo/*`验证通过RestTemplate与FeignClient去调用服务提供者。
* `/echoByWC/*`验证通过WebClient去调用服务提供者。

```java
@Slf4j
@Api("default")
@RestController
public class ConsumerController {

    @Autowired
    @LoadBalanced
    private RestTemplate loadBalanced;

    @Autowired
    private FooService fooService;

    @Autowired
    @LoadBalanced
    private WebClient.Builder webClientBuilder;

    @Value("${PROVIDER_NAME:sc-jmsf-provider}")
    private String providerName;

    @GetMapping("/echo/{str}")
    public Map<String, Object> echo(@PathVariable String str) {
        JmsfContext.putTag("aaa", "avalue", TagPair.ControlFlag.TRANSITIVE);
        Map<String, Object> result = new HashMap<>();
        result.put("resultFromRestTemplate", loadBalanced.getForObject("http://" + providerName + "/echo/" + str, String.class));
        result.put("resultFromFeignClient", fooService.echo(str));
        return result;
    }
  
    @GetMapping("/echoByWC/{str}")
    public Mono<String> echoByWebClient(@PathVariable String str) {
        Mono<String> stringMono = webClientBuilder.build().get().uri("http://" + providerName + "/echo/{id}", str)
                .acceptCharset(StandardCharsets.UTF_8)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class);
        return stringMono;
    }
}
```

**2.6 修改配置**

```
server:
  port: 8081
spring:
  application:
    name: jmsf-consumer-demo
```

> 运行在JMSF平台上的应用无须配置服务注册中心地址，SDK会通过环境变量自动获取注册中心地址。

#### 3. 部署应用

XXXX
## 1.2.4 配置管理

### 操作场景

该任务指导您通过轻量级服务注册中心或者 TSF 控制台下发动态配置。

### 前提条件

开始实践分布式配置功能前，请确保已完成 [SDK 下载]。

### 添加依赖

向工程中添加 `spring-cloud-starter-jmsf` 依赖，详情请参考 [Demo工程概述]文档。

### 修改配置

用户可通过两种方式更新代码中的配置信息：使用配置类`@ConfigurationProperties`和`@Value`注解。

* `@Value` 比较适用于配置比较少的场景
* `@ConfigurationProperties` 则更适用于有较多配置的情况

用户也可以动态更新应用配置文件（如 application.yml）中的配置，如动态更改 redis 的地址或者鉴权功能开关等。

#### 使用配置类 @ConfigurationProperties

在`jmsf-provider-demo`的 ConfigDemoProperties 类中，有一个字符串类型的变量`stringValue`。其中：

* 使用 `@ConfigurationProperties` 注解来标明这个类是一个配置类。
* 使用 `@RefreshScope注解` 开启 refresh 机制。

```java
@Data
@RefreshScope
@ConfigurationProperties(prefix = "dynamic")
public class ConfigDemoProperties {
    private String stringValue;
    private boolean boolValue;
    private int intValue;
}
```

#### 使用 @Value 注解

在启动类 `ProviderController` 中，使用 `@Value` 注解来标识一个配置变量。下面的示例中 `${dynamic.commonData:default}` 中 `dynamic.commonData` 是在动态配置下发中使用的 key，value 默认是 `default` 。

* 使用`@RefreshScope注解`开启 refresh 机制。

```java
@Slf4j
@RestController
@RefreshScope
@RequestMapping("/")
@Api("provider")
public class ProviderController {
  
      @Value("${dynamic.commonData:default}")
      private String commonData;

      @Autowired
      private ConfigDemoProperties configDemoProperties;

      @GetMapping(value = "/getConfig")
      public Map<String, Object> getConfig() {
          Map<String, Object> configData = new HashMap<>();
          configData.put("metadata", metadata.toString());
          configData.put("commonData", commonData);
          configData.put("dynamicConfig", configDemoProperties.toString());
          return configData;
      }
}
```

### JMSF控制台下发动态配置

用户可以通过JMSF控制台来下发动态配置，具体操作可以参考应用配置模块说明。

**前提条件**

* 已经在JMSF平台上部署了`jmsf-provider-demo`和`jmsf-consumer-demo`应用，并将应用进行了托管。

**操作步骤**

关于如何通过控制台创建及下发更新的配置，请参考 [应用配置](1.2.4-pei-zhi-guan-li.md)。

如果希望修改`ConfigDemoProperties`类中的`stringValue`的值，创建配置时，请按照`YAML`格式配置内容：

```yaml
dynamic:
  stringValue: aaaa
```

将配置发布到已部署`jmsf-provider-demo`的部署组上，请求`/getConfig`接口，检查返回的数据中值是否已更新。如果已更新，说明更新的配置生效。

## 1.2.5 Spring Cloud服务治理

### 操作场景

服务治理功能包含服务鉴权、服务限流、服务路由和服务熔断，该任务指导您在应用开发过程中配合控制台配置完成服务治理功能。

### 前提条件

* 完成 [SDK下载](../../0-%E9%80%9A%E7%94%A8%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/3-SDK%E4%B8%8B%E8%BD%BD.md)
* 熟悉服务治理功能，参考 [服务治理](1.2.5-fu-wu-zhi-li.md)

### 添加依赖

向工程中添加 `spring-cloud-starter-jmsf` 依赖，详情请参考 [Demo工程概述](../../2-Demo%E5%B7%A5%E7%A8%8B%E6%A6%82%E8%BF%B0.md) 文档。

### 服务鉴权

#### 使用效果

您需要在服务主调方和被调方都添加依赖项和注解的开启。此时您已经对服务开启了鉴权功能，任何到达服务的请求都会被鉴权，鉴权不通过时会返回 HTTP 403 Forbidden。

#### 使用方式

如果请求双方想使用基于标签的鉴权规则，那么：

* 对于 provider 而言，需要在控制台上设置标签鉴权规则，可选择黑/白名单。
* 对于 consumer 而言，如果配置的为系统标签，则无需做任何修改即可支持。如果配置的自定义标签，需要在应用配置中配置对应的metadata（K/V）的内容或者通过`JmsfContext`的`putTag`方法，动态传入自定义标签。

1. 控制台上配置鉴权规则，参考[服务鉴权基本操作](1.2.5-fu-wu-zhi-li.md)。
2.  在consumer中配置自定义标签：

    ```yaml
    jmsf:
      enabled: true
      metadata:
        aa: aa  #自定义标签Key，Value
    ```
3. 在 consumer 中设置 tag ，使用`com.jdcloud.jmsf.core.context`包中的`JmsfContext`类。设置 Tag 的方法如下：

```java
/**
* 设置多个 tag。如果有某个 tag 之前已经被设置过，那么它的值会被覆盖。
*/
public static void putTags(Map<String, String> tagMap, TagPair.ControlFlag... flags){}

/**
* 设置单个tag。如果该 key 之前已经被设置过，那么它的值会被覆盖。
*/
public static void putTag(String key, String value, TagPair.ControlFlag... flags){}

public enum ControlFlag {
     TRANSITIVE,     // 表示标签要传递下去，默认不启用。
     NOT_IN_AUTH,    // 表示标签不被使用在服务鉴权，默认是被使用的。
     NOT_IN_ROUTE,   // 表示标签不被使用在服务路由，默认是被使用的。
}
```

提供的 Demo `consumer-demo/src/main/java/com/tsf/demo/consumer/Controller.java` 中提供了一个设置 Tag 的例子：

```java
@GetMapping("/echo/{str}")
public Map<String, Object> echo(@PathVariable String str) {
    //放入自定义标签aaa,值为avalue。改标签将会在调用的过程中传递到provider。
    JmsfContext.putTag("aaa", "avalue", TagPair.ControlFlag.TRANSITIVE);
    Map<String, Object> result = new HashMap<>();
    result.put("resultFromRestTemplate", loadBalanced.getForObject("http://" + providerName + "/echo/" + str, String.class));
    result.put("resultFromFeignClient", fooService.echo(str));
    return result;
}
```

### 服务限流

#### 使用效果

在应用工程中添加依赖和注解后，您可以直接在控制台上配置限流规则，参考[服务限流原理及使用](1.2.5-fu-wu-zhi-li.md)。当您开启服务限流功能后，任何到达的请求都会被限流模块处理。如果该请求命中限流规则，将会被统计到对应限流策略中，该限流策略上的配额已经消耗完，会对请求返回 HTTP 429 Too Many Requests；否则会正常放行。

#### 使用方式

控制台配置即可对应规则，其中规则中标签的试用方式同鉴权中试用方式一致，可使用`系统标签`与`自定义标签`。

### 服务路由

#### 使用效果

服务路由可根据用户配置的路由规则，进行provider服务实例过滤，以此达到灰度发布，金丝雀发布的特性。

#### 使用方式

在应用工程中添加依赖和注解后，您可以直接在控制台上配置路由规则，参考[服务路由使用方法](1.2.5-fu-wu-zhi-li.md)。

### 服务熔断

#### 使用效果

配置熔断规则后，每次请求在与熔断规则匹配后，该次请求的响应（成功或失败）会被统计，符合规则的请求所相关统计指标达到阈值后，会触发熔断事件，目前熔断支持的通断级别为服务实例，对应的该服务实例将会被移除，后续得请求将不会被分配到该服务实例进行处理。经过配置的熔断窗口时间后，监听该服务实例的熔断恢复事件，并将该实例恢复至可用列表，访问恢复正常。

#### 使用方式

JMSF摒弃了已经不再继续维护的 Hystrix 断路器，采用Sentinel作为底层实现。相比较原有单一的熔断特性，我们在此之上扩展了实例熔断动态排除，自动恢复等功能特性，且熔断规则支持动态配置，修改规则参数无需重启应用。请配合JMSF其他功能一起使用。

1. 关闭 Hystrix 使用JMSF熔断功能需要将 Hystrix 关闭（默认是关闭的，如果之前有打开还请关闭）。相关的容错功能请参考 [服务容错](1.2.5-fu-wu-zhi-li.md)。
2. 控制台对服务进行熔断配置

## 1.2.6 参数传递
### 元数据类别
JMSF提供通过请求携带Header的方式进行元数据传递，供开发者在代码中进行设置：

| 类型             | 特点                                                         |
| ---------------- | ------------------------------------------------------------ |
| 标签信息（Tags） | 可设置传递性，仅支持 key-value 数据结构，key 和 value 均为字符串类型。 |

场景说明：
- **标签信息** ：用于信息分类，使用场景包括：
  - 服务鉴权：被调方通过标签来决定是否提供服务。
  - 服务路由：通过标签来判断应该访问什么服务，可用于实现金丝雀发布等。
  

### 元数据的传递性

以调用关系 A ≥ B ≥ C，说明传递性的概念：
- 可传递（Transitive）：需要传递的标签，在整条链路都传递，即用户在 A 设置的标签，会传递到 B 再传递到 C。
- 不可传递：不需要传递的标签，即用户在 A 设置的标签，会传递到 B，但是不会传递到 C。

**标签信息**允许用户设置是否支持传递，不同的标签可以设置不同传递性，例如一些业务场景： 

- `userId` 标签是需要传递的： 
  - 可以作为整条调用链上的服务的 上下文信息。 
  - 可以实现按 userId 区分的服务路由，例如 A、B、C 三个服务同时做滚动发布，那么可以让一批 userId 都走新版本的 A、B、C 服务，其他用户走老版本。 
- `level=高级会员` 这种标签，很可能就不需要在调用间传递下去。



### 使用元数据

#### 依赖项
在 `pom.xml` 中添加依赖项：
```xml
<dependency>
    <groupId>com.jdcloud.jmsf</groupId>
    <artifactId>spring-cloud-starter-jmsf</artifactId>
    <version><!-- 调整为SDK最新版本号 --></version>
</dependency>
```

#### 接口
```java
public enum ControlFlag {
    TRANSITIVE     // 表示标签要传递下去，默认不启用
    NOT_IN_AUTH    // 表示标签不被使用在服务鉴权，默认是被使用的
    NOT_IN_ROUTE   // 表示标签不被使用在服务路由，默认是被使用的
}

public class JmsfContext {
    /**
     * 设置多个 Tag。如果有某个 Tag 之前已经被设置过，那么它的值会被覆盖。
     */
    public static void putTags(Map<String, String> tagMap, TagControlFlag... flags) {}

    /**
     * 设置 Tag。如果该 key 之前已经被设置过，那么它的值会被覆盖。
     */
    public static void putTag(String key, String value, TagControlFlag... flags) {}
}
```

#### 场景1：设置鉴权 Tag
假如希望将请求参数作为值的Tag放入请求上下文，并进行参数传递给provider。Tag 鉴权的具体使用方法可参考 [服务鉴权]()。

```java
@RequestMapping(value = "/echo/{str}", method = RequestMethod.GET)
public String rest(@PathVariable String str, @RequestParam String user) {
    JmsfContext.putTag("user", user); 
    return restTemplate.getForObject("http://provider-demo/echo/" + str, String.class);
}
```

#### Tag 的长度限制
用户传递到下流的 Tag （包含从上流带过来的有传递性的 Tag），数量上限为24个。Key 的长度上限为 UTF-8 编码后32字节，value 的长度上限为 UTF-8 编码后128字节。

## 1.2.7 API注册

### 操作场景

JMSF框架在微服务注册时，会自动收集并注册微服务提供的 API 接口，用户可通过 TSF 控制台实时掌握当前微服务提供的 API 情况。API 注册功能基于 [OpenApi Specification 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md) 规范注册 API 元数据信息。 用户在查看 API 接口的同时，可查看到 API 出入参数据结构信息。

### 前提条件

开始实践 API 注册功能前，请确保已完成 [SDK 下载](../section1/0.3-sdk-xia-zai.md)。

### 添加依赖

向工程中添加 `spring-cloud-starter-jmsf`或`spring-cloud-jmsf-swagger`，详情请参考 [Demo工程概述](./1.2.2-demo-gong-cheng-gai-shu.md) 文档。

### 配置选项

API 注册功能基于 Swagger 原生规范实现，提供多个配置以适配 Swagger 不同配置应用场景，可用配置如下表所示：

| 配置项                      | 类型      | 必填 | 默认值                        | 说明                                                   |
| ------------------------ | ------- | -- | -------------------------- | ---------------------------------------------------- |
| jmsf.swagger.enabled     | Boolean | 否  | true                       | 是否开启JMSF API 注册功能                                    |
| jmsf.swagger.basePackage | String  | 否  | ApplicationMainClass 所在包路径 | 注册 API 的扫描包路径。 推荐将 ApplicationMainClass 写在外层 Package |
| jmsf.swagger.excludePath | String  | 否  | 空                          | 排除扫描的包路径                                             |

### 代码和示例

* SDK 会自动扫描 API 的 path 和 出入参。
* 如果需要上报 API 的描述，需要`import io.swagger.annotations.ApiOperation;` ，同时在 API 上加上注解 `@ApiOperation(value = "url路径值",notes = "对api资源的描述")`。如果不关注 API 描述，可以不设置 @ApiOperation。

```java
// 省略掉部分 import
import io.swagger.annotations.ApiOperation;

@RestController
public class ProviderController {
    private static final Logger LOG = LoggerFactory.getLogger(ProviderController.class);
  
    @ApiOperation(value= "/echo/{param}", notes = "notes")  // notes 对应 API 描述
    @RequestMapping(value = "/echo/{param}", method = RequestMethod.GET)
    public String echo(@PathVariable String param) {
        LOG.info("provider-demo -- request param: [" + param + "]");
        String result = "request param: " + param + ", response from " + providerNameConfig.getName();
        LOG.info("provider-demo -- provider config name: [" + providerNameConfig.getName() + ']');
        LOG.info("provider-demo -- response info: [" + result + "]");
        return result;
    }
}
```

## 1.2.8 Dubbo Demo工程概述

### 获取Demo

> - 本工程只是示例，现存Dubbo应用可以直接看Dubbo接入JMSF文档。
> - 新建应用编写微服务系统推荐采用Spring Cloud方案。

基于Apache Dubbo版本SDK的Demo下载地址: https://github.com/jdcloud-jmsf/dubbo-demo。

### 模块介绍

- dubbo-interface

  Demo中包含接口的定义

- dubbo-consumer-demo

  引入轻量级SDK的Consumer端demo模块

- dubbo-provider-demo

  引入轻量级SDK的Provider端demo模块

- jmsf-dubbo-consumer-demo

  引入增强版SDK的Consumer端demo模块

- jmsf-dubbo-provider-demo

  引入增强版SDK的Provider端demo模块

### Dubbo应用接入JMSF

#### 操作场景

JMSF为用户现存的Dubbo应用提供两种SDK，分别适用于一下场景：

- 当前已经使用了Dubbo的服务治理能力，只是希望注册到JMSF，可以使用**轻量级SDK**，轻量级SDK只提供注册和发现的能力。

- 当前只是轻度使用 Dubbo，希望使用JMSF的治理能力，可以使用**增强版SDK**。该SDK提供完整的治理能力（可能会和用户已有的治理能力冲突）。

#### Maven坐标

- 轻量级SDK

  ```xml
  <dependency>
      <groupId>com.jdcloud.jmsf</groupId>
      <artifactId>dubbo-registry-consul</artifactId>
      <version>${latest.version}</version>
  </dependency>
  ```

- 增强版SDK

  ```xml
  <dependency>
      <groupId>com.jdcloud.jmsf</groupId>
      <artifactId>meshware-extension-dubbo2</artifactId>
      <version>${latest.version}</version>
  </dependency>
  ```

#### 增强版SDK接入

增强版SDK通过 Dubbo filter的机制，将JMSF的全部能力适配至Dubbo上，允许用户只修改几行依赖和配置即可体验完整的治理和监控体验。

##### 操作步骤

1. 注册中心配置

   Dubbo官网Demo配置如下：

   ```xml
   <dubbo:registry address="multicast://123.4.5.6:1234"/>
   ```

   JMSF Demo分为两种情况：

   - 如果应用同样适用Spring框架进行开发，可以引入一下包，而不需要进行注册中心相关的配置。

     ```xml
     <dependency>
         <groupId>com.jdcloud.jmsf</groupId>
         <artifactId>meshware-spring</artifactId>
         <version>${latest.version}</version>
     </dependency>
     ```

   - 如果应用开发未采用Spring框架，可通过如下配置：

     ```xml
     <dubbo:registry address="jmsfconsul://127.0.0.1:8500"/>
     ```

   注意：协议名为jmsfconsul，"注册中心地址:端口" 可以填写 127.0.0.1:8500。在JMSF控制台部署时，SDK会自动替换为正确的地址。

2. 添加依赖

   根据业务使用的引入上述增强版SDK的Maven依赖。

3. 打包Fat Jar

   与 Spring Boot 结合的时候，您可以通过 **spring-boot-maven-plugin** 构建一个包含所有依赖的 jar 包（FatJar），执行命令`mvn clean package`。

   如果是单纯的 Dubbo 应用，可以使用 Maven 的 FatJar 插件。

   ```xml
   <plugins>
       <plugin>
           <groupId>org.apache.maven.plugins</groupId>
           <artifactId>maven-jar-plugin</artifactId>
           <configuration>
               <archive>
                   <manifestEntries>
                       <Implementation-Version>${project.version}</Implementation-Version>
                   </manifestEntries>
               </archive>
           </configuration>
       </plugin>
       <plugin>
           <artifactId>maven-assembly-plugin</artifactId>
           <configuration>
               <archive>
                   <manifest>
                       <!--这里指定要运行的main类-->
                       <mainClass>com.xxxx.ConsumerApplication</mainClass>
                   </manifest>
               </archive>
               <descriptorRefs>
                   <descriptorRef>jar-with-dependencies</descriptorRef>
               </descriptorRefs>
           </configuration>
           <executions>
               <execution>
                   <id>make-assembly</id>
                   <phase>package</phase>
                   <goals>
                       <goal>single</goal>
                   </goals>
               </execution>
           </executions>
       </plugin>
   </plugins>
   ```

4. 使用自定义Tag

   完整版插件支持JMSF平台的自定义Tag能力。

   ```java
   // 引入SDKContext
   import com.jdcloud.jmsf.meshware.context.SDKContext;
   
   /**
    * 放入将自定义的 Tag 放入 Context 中
    * Context 会将该 Tag 往下传递
    * 用户可以对某个 Tag 进行查询和删除操作
    */
   SDKContext sdkContext = SDKContextHolder.get();
   sdkContext.putTag("abc", "123");
   ```

   如上使用方式，服务治理中可以通过自定义标签"abc"进行服务治理配置。注意：Tag 会自动往下传递，如果不希望某个Tag继续传递可以在代码中手动删除。

5. 使用自定义Filter

   Dubbo 框架中如果要实现自定义 Filter 需要 resources 目录下建立特定名称的文件夹。官方推荐目录为 META-INF/dubbo，用户如果在此文件夹下声明自定义 Filter 则不需要任何改动。

   JMSF将自定义插件目录设置为 META-INF/services，如果用户希望在 services 目录下实现自定义 filter，则需要在 filter 的文件中显示加入JMSF的三个插件。

   > Maven 打包时会把相同目录的文件保留一份，所以推荐用户不要使用 services，而是采用 Dubbo 目录。

   定义文件名为：`org.apache.dubbo.rpc.Filter`

   ```xml
   // 自定义 filter
   logFilter=com.alibaba.dubbo.demo.consumer.LogFilter
   // JMSF增强
   localAddressFilter=com.jdcloud.jmsf.meshware.dubbo2.filter.LocalAddressFilter
   jmsfConsumerFilter=com.jdcloud.jmsf.meshware.dubbo2.filter.JmsfConsumerFilter
   jmsfProviderFilter=com.jdcloud.jmsf.meshware.dubbo2.filter.JmsfProviderFilter
   consumerTraceFilter=com.jdcloud.jmsf.meshware.dubbo2.filter.ConsumerTraceFilter
   providerTraceFilter=com.jdcloud.jmsf.meshware.dubbo2.filter.ProviderTraceFilter
   ```

#### 轻量级SDK接入

轻量级SDK为 Dubbo 应用提供服务注册中心，Dubbo 应用可通过依赖 jar 包的方式接入该项服务。下文将介绍 Dubbo 应用从接入JMSF到部署应用的操作方法及相关注意事项。

##### 操作步骤

1. 注册中心配置

   Dubbo官网Demo配置如下：

   ```xml
   <dubbo:registry address="multicast://123.4.5.6:1234"/>
   ```

   JMSF Demo分为两种情况：

   ```xml
   <dubbo:registry address="jmsfconsul://<注册中心地址>:<端口>"/>
   ```

   注意：协议名为jmsfconsul，"注册中心地址:端口" 可以填写 127.0.0.1:8500。在JMSF控制台部署时，SDK会自动替换为正确的地址。

2. 添加依赖

   根据业务使用的引入上述轻量级SDK的Maven依赖。目前支持Apache Dubbo，版本2.7.+

3. 打包Fat Jar

   与 Spring Boot 结合的时候，您可以通过 **spring-boot-maven-plugin** 构建一个包含所有依赖的 jar 包（FatJar），执行命令`mvn clean package`。

### Dubbo应用接入JMSF Mesh

#### 操作场景

Dubbo 作为一款传统基于 SDK 的 Java RPC 框架，通过引入 jar 包的方式实现服务间远程方法调用、服务注册发现及服务治理。Dubbo 开发的应用在不修改任何业务代码的前提下，通过引入**轻量级SDK**封包部署到JMSF平台，可透明实现服务注册发现和无侵入的服务治理能力。

同前面《Dubbo应用接入JMSF》文中操作相同，在应用的Maven依赖中引入**轻量级SDK**，并于控制台选择Mesh部署方式即可。如下所示：
```xml
<dependency>
    <groupId>com.jdcloud.jmsf</groupId>
    <artifactId>dubbo-registry-consul</artifactId>
    <version>${latest.version}</version>
</dependency>
```
