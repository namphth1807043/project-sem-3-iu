
const routes = [
  { path: '/login', component: () => import('pages/admin/login.vue') },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      { path: 'pick-seat', component: () => import('pages/pick-seat.vue') },
      { path: 'payment', component: () => import('pages/payment.vue') },
    ]
  },

  {
    path: '/admin', component: () => import('layouts/MainLayoutAdmin.vue'),
    children: [
      { path: 'stations', component: () => import('pages/admin/stations.vue') },
      { path: 'trains', component: () => import("pages/admin/train.vue") },
      { path: 'objects', component: () => import("pages/admin/objects.vue") },
      { path: 'orders', component: () => import("pages/admin/order.vue") }
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
