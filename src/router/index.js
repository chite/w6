import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../views/Book.vue'
import Done from '../views/Done.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/book/:index/:id',
    name: 'Book',
    component: Book
  },
  {
    path: '/done/:index/:id',
    name: 'Done',
    component: Done
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
