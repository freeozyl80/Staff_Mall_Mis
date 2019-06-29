import Home from '@src/pages/home'

const routes = [
  {
    path: '/',
    redirect: 'login',
    component: () => import('@src/pages/login')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@src/pages/login')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'account_list',
        name: 'account_list',
        component: () => import('@src/pages/account/list')
      },
      {
        path: 'account_detail/:id',
        name: 'account_detail',
        component: () => import('@src/pages/account/detail')
      },
      {
        path: 'account_import',
        name: 'account_import',
        component: () => import('@src/pages/account/import')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('@src/pages/error/401')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@src/pages/error/404')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@src/pages/error/500')
  }
]


export default routes