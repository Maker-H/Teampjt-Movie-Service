import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import RecommandView from '@/views/RecommandView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CommentView from '@/views/CommentView.vue'
import DetailView from '@/views/DetailView.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/v/profile',
    name: 'ProfileView',
    component: ProfileView
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
