import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'home',
    component: HomeView
  },
  {
    path: '/usedcar',
    name: 'usedcar',
    component: () => import(/* webpackChunkName: "usedcar" */ '../views/UsedCar.vue')
  },
  {
    path: '/newcar',
    name: 'newcar',
    component: () => import(/* webpackChunkName: "newcar" */ '../views/NewCar.vue')
  },
  {
    path: '/sellcar',
    name: 'sellcar',
    component: () => import(/* webpackChunkName: "sellcar" */ '../views/SellCar.vue')
  },
  {
    path: '/usedfinance',
    name: 'usedfinance',
    component: () => import(/* webpackChunkName: "usedfinance" */ '../views/UsedFinance.vue')
  },
  {
    path: '/usedservice',
    name: 'usedservice',
    component: () => import(/* webpackChunkName: "usedservice" */ '../views/UsedService.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
