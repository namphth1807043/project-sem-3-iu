
const routes = [
  { path: '/', component: () => import('pages/login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/stations', component: () => import('pages/stations.vue') },
      { path: "/trains", component: () => import("pages/train.vue") },
      { path: "/objects", component: () => import("pages/objects.vue") },
      { path: "/orders", component: () => import("pages/order.vue") }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
