import Vue from 'vue'
import VueRouter from 'vue-router'
// 
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import RecommandView from '@/views/RecommandView.vue'
import CommentView from '@/views/CommentView.vue'
import DetailView from '@/views/DetailView.vue'
// 
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpPasswordView from '@/views/SignUp/SignUpPasswordView.vue'
import SignUpMessageView from '@/views/SignUp/SignUpMessageView.vue'
//
import PaySuccess from '@/views/Pay/PaySuccess.vue'
import PayFail from '@/views/Pay/PayFail.vue'
import PayCancel from '@/views/Pay/PayCancel.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/v'
	},

  {
    path: '/v',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/v/search',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/v/recommand',
    name: 'RecommandView',
    component: RecommandView
  },
  {
    path: '/v/comments',
    name: 'CommentView',
    component: CommentView
  },
  {
    path: '/v/detail/:movieId',
    name: 'DetailView',
    component: DetailView
  },

  // 
  
  {
    path: '/v/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/v/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/v/signup',
    name: 'SignUpPasswordView',
    component: SignUpPasswordView
  },
  {
    path: '/v/signup/message',
    name: 'SignUpMessageView',
    component: SignUpMessageView
  },
  
  //

  {
    path: '/v/pay/success',
    name: 'PaySuccess',
    component: PaySuccess
  },
  {
    path: '/v/pay/fail',
    name: 'PayFail',
    component: PayFail
  },
  {
    path: '/v/pay/cancel',
    name: 'PayCancel',
    component: PayCancel
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
