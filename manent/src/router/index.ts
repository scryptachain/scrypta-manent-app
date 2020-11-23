import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Dashboard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard/overview'
  },
  {
    path: '/dashboard/',
    component: Dashboard,
    children: [
      {
        path: '',
        redirect: 'tab1'
      },
      {
        path: 'overview',
        component: () => import('@/views/Overview.vue')
      },
      {
        path: 'transactions',
        component: () => import('@/views/Transactions.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings.vue')
      }
    ]
  },
  {
    path: '/identities',
    component: () => import('@/views/Identities.vue')
  },
  {
    path: '/notarization',
    component: () => import('@/views/Notarization.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
