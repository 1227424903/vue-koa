import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['/page/index'], resolve)
const Login = resolve => require(['/page/Login/login'], resolve)
const Home = resolve => require(['/page/Home/home'], resolve)
const Video = resolve => require(['/page/Video/video'], resolve)
const Photo = resolve => require(['/page/Photo/photo'], resolve)

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: Home},
        {path: 'video', component: Video},
        {path: 'photo', component: Photo}
      ]
    },
    {path: '/login', name: 'login', component: Login}
  ]
})
