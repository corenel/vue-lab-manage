var langs = [
  {title: 'English', path: '/home'},
  {title: '简体中文', path: '/zh-Hans/'}
]

self.$config = {
  landing: true,
  // debug: true,
  repo: 'corenel/vue-lab-manage',
  twitter: 'corenel',
  url: 'http://www.yuthon.com',
  nav: {
    default: [
      {
        title: 'Home', path: '/home'
      },
      {
        title: 'Structure', path: '/structure'
      },
      {
        title: 'Matlab-socket', path: '/matlab-socket'
      },
      {
        title: 'Languages', type: 'dropdown', items: langs, exact: true
      }
    ],
    'zh-Hans': [
      {
        title: '首页', path: '/zh-Hans/'
      },
      {
        title: '网站架构', path: '/zh-Hans/structure'
      },
      {
        title: 'Matlab端', path: '/zh-Hans/matlab-socket'
      },
      {
        title: '选择语言', type: 'dropdown', items: langs, exact: true
      }
    ]
  },
  plugins: [
    evanyou()
  ]
}
