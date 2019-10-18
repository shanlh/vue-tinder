module.exports = {
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
        sidebar: [
          {
            title: '简介', // 必要的
            // path: '/', // 可选的, 应该是一个绝对路径
            collapsable: false, // 可选的, 默认值是 true,
            // sidebarDepth: 1, // 可选的, 默认值是 1
            children: [
              ['/guide/', 'Introduction'],
              ['/guide/getting-started', 'Getting Started'],
              ['/guide/bing-images', 'Start With Bing Images'],
              ['/guide/how-to-click', 'How To Click?'],
              ['/guide/oops', 'Oops!']
            ]
          }
        ]
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        // serviceWorker: {
        //   updatePopup: {
        //     message: "发现新内容可用.",
        //     buttonText: "刷新"
        //   }
        // },
        // 当前 locale 的 algolia docsearch 选项
        // algolia: {},
        nav: [
          { text: '指南', link: '/zh/guide/' },
          { text: 'API', link: '/zh/api/' }
        ]
        // sidebar: {
        //   '/zh/': [
        //     /* ... */
        //   ],
        //   '/zh/guide/': [
        //     /* ... */
        //   ]
        // }
      }
    }
  }
}
