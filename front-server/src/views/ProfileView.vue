<template>
  <div>
    <h1>Profile</h1>
    <ProfilePoint/>
    <MovieItemList :movies="likedMovies"/>
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
    this.getLikedMovies()
    this.getNewToken()
  },
  methods: {
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