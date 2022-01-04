module.exports = {
    title: 'JMSF开发帮助文档',
    description: '欢迎试用JMSF开发帮助文档，',
    dist: '/dist',
    themeConfig: {
        displayAllHeaders: true,
        nav: [
            { text: '使用文档', link: 'https://docs.jdcloud.com' },
        ],
        // sidebar: 'auto',
        sidebar: [
            ["/", "开发指南"],
            {
                title: '通用开发指南',   // 必要的
                path: '/section1/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 0,    // 可选的, 默认值是 1
                children: [
                  '/section1/0.0-ru-he-da-fatjar-bao.md',
                  '/section1/0.1-yaml-ge-shi-jie-shao.md',
                  '/section1/0.2-zhi-zuo-rong-qi-jing-xiang-openjdk.md',
                  '/section1/0.3-sdk-xia-zai.md',
                ]
              },
              {
                title: '应用开发指南',
                path: '/section2/',
                sidebarDepth: 0, 
                children: [
                    '/section2/1.0-ying-yong-kai-fa-gai-shu.md',
                    '/section2/1.1.1-yuan-sheng-ying-yong-kai-fa.md',
                    '/section2/1.2.0-sdk-ban-ben-gai-shu.md',
                    '/section2/1.2.1-springcloud-vs-sdk-gai-shu.md',
                    '/section2/1.2.2-demo-gong-cheng-gai-shu.md',
                    '/section2/1.2.3-fu-wu-zhu-ce-yu-fa-xian.md',
                    '/section2/1.2.4-pei-zhi-guan-li.md',
                    '/section2/1.2.5-fu-wu-zhi-li.md',
                    '/section2/1.2.6-can-shu-chuan-di.md',
                    '/section2/1.2.7-api-zhu-ce.md',
                    ['/section2/1.2.8-dubbo-sdk-dev.md', '1.2.8 Dubbo开发文档'],
                ],
                // initialOpenGroupIndex: -1 // 可选的, 默认值是 0
              }
        ]
    }
}