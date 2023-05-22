<template>
  <div class="home">
      <div class="d-flex">
        <div class="p-5">
        <img src="@/images/main.jpg" class="my_img">
        </div>
        <div class="p-5">
          <h2 class="p-2 text-white"><b>이달의 영화 추천</b></h2>
          <p>반지하에서 근근이 먹고 살던 가족. 우연히 생긴 알바로 부잣집에 발을 들이더니, 어느덧 온 식구가 저택 곳곳의 밥줄을 꿰찬다. 공간도 세간도 남아돌잖아요. 그러니 우리 같이 나눠 씁시다....</p>
          <div>
              <p class="text-white"><b>수상 내역</b></p>
              <p>제72회 칸 영화제 황금종려상 수상 (2019)</p>
              <p>제40회 청룡영화상 최우수작품상, 감독상 (2019)</p>
              <p>제77회 골든글로브상 외국어영화상 수상( 2020)</p>
              <p>제73회 영국 아카데미 시상식 각본상 (2020)</p>
              <p>제92회 미국 아카데미 시상식 작품상, 감독상 (2020)</p>
              <p>제56회 대종상 최우수작품상, 감독상 (2020)</p>
              <p> 제45회 세자르상 외국어영화상 수상 (2020)</p>
              <p>제56회 백상예술대상 영화부문 대상 (2020)</p>
          </div>
        </div>
      </div>
      <div class="d-flex my-5 align-items-center">
        <div class="p-2">
          <h1 class="text-white"><b>최신 영화 추천</b></h1>
        </div>
        <div class="p-2">
          <i class="fa-solid fa-video fa-2xl" style="color: white;"></i>
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
  created() {
    this.getLatestMovieList();
  },
  computed: {
    fiveLatestMovies() {
      return this.$store.getters['home/fiveLatestMovies']
    }
  },
  methods: {
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

</style>
