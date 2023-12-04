import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  // {
  //   path: '/',
  //   name: 'WebsocketTest',
  //   component: () => import('@/views/WebsocketTest.vue'),
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
