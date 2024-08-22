import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user';
import LoginPage from '@/views/login/LoginPage.vue'
import LayoutPage from '@/views/layout/LayoutPage.vue'
import RecordPage from '@/views/record/RecordPage.vue';
import NoticePage from '@/views/notice/NoticePage.vue';
import GoExaminePage from '@/views/examine/GoExaminePage.vue';
import EnterExaminePage from '@/views/examine/EnterExaminePage.vue';
import StudentPage from '@/views/student/StudentPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login',component: LoginPage },
    {
      path:'/',
      component:LayoutPage,
      //导航前置守卫
      beforeEnter: (to, from , next) => {
        if(!useUserStore().token){
          next('/login')
        }else{
          next()
        }
      },
      redirect:'/student',
      children: [
        {path:'/notice',component:NoticePage},
        {path:'/record',component:RecordPage},
        {path:'/examine/go',component:GoExaminePage},
        {path:'/examine/enter',component:EnterExaminePage},
        {path:'/student',component:StudentPage}
      ]
    }
      ]
})

export default router
