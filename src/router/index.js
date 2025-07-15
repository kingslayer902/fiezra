
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
