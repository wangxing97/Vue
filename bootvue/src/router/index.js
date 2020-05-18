import Vue from 'vue'
import VueRouter from 'vue-router'
const Users = () => import(/* webpackChunkName:  "users" */ '../views/Users.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: Users
  }
]

const router = new VueRouter({
  routes
})

export default router
