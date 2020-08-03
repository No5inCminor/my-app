import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../components/Test.vue'
import About from '../views/About.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Test2',
    name: 'Test2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Test2.vue')
  },
  {
    path: '/about/:name',  
    name: 'About',
    props: true,
    component: About
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/axios',
    name: 'axios',
    component: () => import('../components/axios.vue')
  },
  {
    path: '/axios2',
    name: 'axios并发',
    component: () => import('../components/axios2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router 
