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

## 安装 SDK

在您的 Java 应用工程的 pom.xml 中添加依赖的 JMesh SDK 的 group、artifaceId、version 等信息后（参考对应的应用开发文档），在 pom.xml 所在目录执行 `mvn clean package` 即可下载 JMesh SDK，如下所示。

```xml
<dependency>
  <groupId>com.jdcloud.jmesh</groupId>
  <artifactId>spring-cloud-starter-jmesh</artifactId>
  <version>${jmesh.version}</version>
</dependency>
```

