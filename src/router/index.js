import Vue from 'vue'
import Router from 'vue-router'
import api from '../api/index.js'

Vue.use(Router)
//运营后台
import OperativeHome from '@/components/operativeHome'
import Login from '@/components/login'
//信息处理
import InfoReplaceMaker from '@/components/infoHandle/infoReplaceMaker'


const router = new Router({
  routes: [
    //运营后台
    {
      path: "/",
      component: OperativeHome,
      meta: {requireAuth: true},
      children: [
        {
          path: '',
          component: InfoReplaceMaker
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    },

  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requireAuth)) {  //如果匹配到的路由需要requireAuth
    api.getLoginInfo()

      .then(res => {
        if (res.code === 0) {
          next();
        } else if (res.code === 1) {
          next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }

      })
  } else {
    next();
  }
})


export default router;
