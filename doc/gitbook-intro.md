
### 安装gitbook

```
npm install gitbook-cli -g
```

进入到项目目录下，安装gitbook插件。

```
gitbook install
```

### 编写文档

gitbook编写文档分为两部分：

#### 更新文档

每增加一个大章节，需要在项目目录下增加一个新的section目录；大章节之下增加小章节，需要在section中增加新的md文件。

文档使用[anchor-navigation-ex](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex)来创建页内导航，文档编写时，需要注意：

1. 标题从一级目录开始，即`#`、`##`、`###`，依此表示三级目录
2. anchor-navigation-ex插件会自动生成序号，因此不需要您手工对标题进行编号
3. 标题请不要过长

#### 更新目录

文档编写好以后，需要更新SUMMARY.md文档，参照当前的文件，增加目录说明即可。


### 编译

```
gitbook build
```

编译得到的`_book`目录就是我们需要的帮助信息网站源码，将`_book`中的文件拷贝到nginx的root目录中后，就可以通过nginx来提供帮助信息的web服务了。

### 预览

```
gitbook serve
```

该命令会编译当前gitbook工程，并启动一个http server。您可以访问[http://localhost:4000](http://localhost:4000)来预览您的修改。

Ref：

- [GitBook 学习笔记](https://yangjh.oschina.io/gitbook/)
- [GitBook node version](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md)
- [anchor-navigation-ex](https://github.com/zq99299/gitbook-plugin-anchor-navigation-ex)