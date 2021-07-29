import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/',
    name:'layout',
    component:() => import('@/views/layout'),
    children:[{
      path:'',
      component:() => import('@/views/Home'),
    },
  {
    path:'article',
    component:() => import('@/views/article')
  },
  {
    path:'publish',
    component:() => import('@/views/Songar')
  },
  {
    path:'image',
    component:() => import('@/views/imagg')
  },
  {
    path:'comment',
    component:() => import('@/views/comment')
  },
  {
    path:'settings',
    component:() =>import('@/views/my')
  },
  {
    path:'fans',
    component:() =>import('@/views/fans')
  }
]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,form,next) =>{
  const user = localStorage.getItem('token')
  if(to.path !== '/login'){
  if(user){
    next()
  }else{
    next('/login')
  }
  } else{
    next()
  }
})

export default router
