<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="d-flex" style="width : 1000px">
        <div>
          <img :src="poster" class="detail-img" alt="...">
        </div>
        <div class="text-white p-3" style="margin-left: 100px; margin-top: 30px">
          <p v-if="movie.overview"><b>줄거리</b> : {{movie.overview}}</p>
          <p v-else>줄거리 : 줄거리가 생략되었습니다.</p>
          <p><b>개봉일</b> : {{movie.released_date}}</p>
          <p><b>평점</b> : {{movie.vote_avg}}</p>
          <p><b>장르</b> : <span v-for="(genre, genreIdx) in genres" :key="genreIdx"> {{genre}} </span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'DetailItem',
    props: {
        movie: Object,
    },
    created() {
      this.getGenreList()
    },
    methods:  {
      getGenreList() {
        this.$store.dispatch('detail/getGenreList')
      },
    },
    computed: {
      poster() {
      return `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
      },
      genreList() {
        return this.$store.getters['detail/genres']
      },
      genres() {
        return this.$store.getters['detail/detailGenres']
      },
    }
}
</script>

<style>
  .detail-img {
    height: 400px;
    width: 300px;
  }
</style>