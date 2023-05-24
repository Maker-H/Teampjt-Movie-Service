<template>
  <div class="home">
      <div class="d-flex">
        <div class="p-5">
        <img src="../../public/images/main.jpg" class="my_img">
        </div>
        <div class="ml-5 p-2" style="margin-top: 70px;">
          <div class="mx-0">
          <!-- <h1 class="text-left main_color"><b>이달의 영화 추천</b></h1> -->
          </div>
          <img src="../../public/images/main2.png" class="my_img">
        </div>
      </div>
      <hr>
      <div class="d-flex my-5 align-items-center">
        <div class="p-2">
          <h1 class="main_color"><b>최신 영화 추천</b></h1>
        </div>
        <div class="p-2">
          <i class="fa-solid fa-video fa-2xl" style="color: rgb(180, 180, 180);"></i>
        </div>
      </div>
      <div class="my-5"> 
        <MovieItemList :movies="fiveLatestMovies"/>
      </div>
  </div>
</template>

<script>
import MovieItemList from '@/components/MovieItemList.vue';
export default {
  name: "HomeView",
  components: {
    MovieItemList
  },
  beforeRouteEnter(to, from, next) {
    next(next => {
      next.getLatestMovieList()
      next.checkLoggedIn()
    })
  },
  created() {
    this.getLatestMovieList();
  },
  computed: {
    fiveLatestMovies() {
      return this.$store.getters['home/fiveLatestMovies']
    }
  },
  methods: {
    checkLoggedIn() {
      this.$store.dispatch('check/checkLoggedIn')
    },
    getLatestMovieList() {
      this.$store.dispatch("home/getLatestMovieList")
    },
  },
};
</script>

<style scoped>
  .my_img {
    opacity: 0.7;
  }
  .main_color {
    color: rgb(180, 180, 180);
  }

</style>
