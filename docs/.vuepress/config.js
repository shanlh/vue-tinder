module.exports = {
  base: '/vue-tinder/',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'VueTinder',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VueTinder',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  themeConfig: {
    repo: 'shanlh/vue-tinder',
    smoothScroll: true,
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        // ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        // serviceWorker: {
        //   updatePopup: {
        //     message: "New content is available.",
        //     buttonText: "Refresh"
        //   }
        // },
        // algolia: {},
        nav: [
          { text: 'Guide', link: '/guide/', ariaLabel: 'Guide' },
          { text: 'API', link: '/api/' }
        ],
        sidebar: {
          '/guide/': [
            {
              title: 'Guide',
              collapsable: false,
              children: [
                ['/guide/', 'Introduction'],
                ['/guide/getting-started', 'Getting Started'],
                ['/guide/bing-images', 'Start With Bing Images'],
                ['/guide/how-to-click', 'How To Click?'],
                ['/guide/oops', 'Oops!']
              ]
            }
          ],
          '/api/': [
            {
              title: 'API',
              collapsable: false,
              children: [
                ['/api/', 'Props'],
                ['/api/events', 'Events'],
                ['/api/methods', 'Methods'],
                ['/api/slots', 'Slots']
              ]
            }
          ]
        }
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          { text: '指南', link: '/zh/guide/' },
          { text: 'API', link: '/zh/api/' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              title: '指南',
              collapsable: false,
              children: [
                ['/zh/guide/', '介绍'],
                ['/zh/guide/getting-started', '快速起步'],
                ['/zh/guide/bing-images', '从 Bing Images 开始'],
                ['/zh/guide/how-to-click', '如何点击?'],
                ['/zh/guide/oops', 'Oops!']
              ]
            }
          ],
          '/zh/api/': [
            {
              title: 'API',
              collapsable: false,
              children: [
                ['/zh/api/', '属性'],
                ['/zh/api/events', '事件'],
                ['/zh/api/methods', '方法'],
                ['/zh/api/slots', '插槽']
              ]
            }
          ]
        }
      }
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-150557393-1'
      }
    ]
  ]
}
