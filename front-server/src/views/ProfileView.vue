<template>
  <div>
    <div class="d-flex justify-content-center align-items-center" style="margin-top: 50px">
      <h2 class="text-white" style="margin-top: 10px"><b>프로필</b></h2>
      <i class="fa-solid fa-address-card fa-2xl" style="color: #ffffff; margin-left:10px;"></i>
    </div>
    <hr>
    <div>
      <h3 class="text-white"><b>포인트</b></h3>
      <ProfilePoint/>
    </div><hr>
    <div class="p-5">
      <div class="text-left">
        <h3 class="text-white"><b>영화 즐겨찾기</b></h3>
      </div>
      <div style="margin-top:50px;">
        <MovieItemList :movies="likedMovies"/>
      </div>
    </div>
    <!-- TODO: pay로 넘어가는 라우터 만들기 -->
  </div>
</template>

<script>
import ProfilePoint from '@/components/ProfilePoint.vue'
import MovieItemList from '@/components/MovieItemList.vue'
export default {
  name: 'ProfileView',
  components: {
    ProfilePoint,
    MovieItemList
  },
  created() {
    this.checkLoggedIn()
    this.getLikedMovies()
    this.getNewToken()
  },
  beforeRouteEnter(to, from, next) {
    next(next => {
      next.checkLoggedIn()
      next.getLikedMovies()
      next.getNewToken()
    })
  },
  methods: {
    checkLoggedIn() {
      this.$store.dispatch('check/checkLoggedIn')
    },
    getLikedMovies() {
      this.$store.dispatch('likes/getLikedMovies')
    },
    getNewToken() {
      this.$store.dispatch('refresh/token_refresh')
    },
  },
  computed: {
    likedMovies() {
      return this.$store.state.likes.likedMovies
    },
  }
}
</script>

<style>

</style>