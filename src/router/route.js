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
        path: 'welcome',
        name: 'welcome',
        component: () => import('@src/pages/welcome')
      },
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
      },
      {
        path: 'product_import',
        name: 'product_import',
        component: () => import('@src/pages/product/import')
      },
       {
        path: 'product_list',
        name: 'product_list',
        component: () => import('@src/pages/product/list')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'association_list',
        name: 'association_list',
        component: () => import('@src/pages/association/list')
      },
      {
        path: 'association_detail/',
        name: 'association_detail',
        component: () => import('@src/pages/association/detail')
      },
      {
        path: 'association_account/',
        name: 'association_account',
        component: () => import('@src/pages/association/association-account')
      },
      {
        path: 'association_business/',
        name: 'association_business',
        component: () => import('@src/pages/association/association-business')
      },
       {
        path: 'association_business_detail/',
        name: 'association_business_detail',
        component: () => import('@src/pages/association/association-business-detail')
      },
      {
        path: 'association_order/',
        name: 'association_order',
        component: () => import('@src/pages/association/association-order')
      },
      {
        path: 'association_staff/',
        name: 'association_staff',
        component: () => import('@src/pages/association/staff')
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