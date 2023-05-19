<template>
  <div>
    <h1>Profile</h1>
    <!-- TODO: LikeMovieList -->
    <ProfilePoint />
    <!-- TODO: pay로 넘어가는 라우터 만들기 -->
  </div>
</template>

<script>
import ProfilePoint from '../components/ProfilePoint.vue'
export default {
  name: 'ProfileView',
  components: {
    ProfilePoint
  }
}
</script>

<style>

</style>