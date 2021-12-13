JMSF支持原生 Spring Cloud 微服务框架，开发者只需要添加依赖和修改配置即可使用服务注册、限流、熔断、分布式配置等能力。


## 兼容性说明
JMSF兼容主流Spring Cloud版本，具体可参考 [SDK 版本概述](./0-SDK版本概述.md)。Spring Cloud功能、开源实现及JMSF兼容性如下表所示：
| Spring Cloud 功能 | 开源实现                                         |    JMSF SDK兼容性    | 说明                                                         |
| ----------------- | ------------------------------------------------ | :------------------: | ------------------------------------------------------------ |
| 服务注册与发现    | Netflix Eureka，Consul                           |  基于Consul开源增强  | 提供高可用注册中心，无须用户自行搭建                         |
| 负载均衡          | Netflix Ribbon                                   |         兼容         | -                                                            |
| 服务调用          | RestTemplate/AsyncRestTemplate，Feign，WebClient |         兼容         | -                                                            |
| 调用链            | Spring Cloud Sleuth                              |         自研         | 提供服务依赖拓扑、调用链查询基础功能，同时支持调用链与业务日志联动、调用链支持下游组件等高级特性 |
| 分布式配置        | Spring Cloud Config，Consul Config               |  基于Consul开源增强  | 支持通过控制台管理配置，发布配置和查看配置发布历史           |
| 熔断降级          | Spring Cloud Hystrix                             | 基于Sentinel开源增强 | JMSF采用Sentinel作为底层实现，增强实现熔断                   |

