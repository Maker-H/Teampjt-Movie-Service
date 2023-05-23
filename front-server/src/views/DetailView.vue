<template>
  <div style="margin-top: 50px">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <h1 class="text-white"><b>{{detailMovie.title}}</b></h1>
      </div>
        <div style="margin-left: 30px">
          <i v-if="!isLiked" @click="createLikedMovies" class="fa-regular fa-heart fa-2xl" style="color: #d90d0d;"></i>
          <i v-else @click="createLikedMovies" class="fa-solid fa-heart fa-2xl" style="color: #d90d0d;"></i>
        </div>
    </div>
    <hr>
    <DetailItem :movie="detailMovie"/>
    <hr>
    <CommentList :comments="movieComments"/>
    <hr>
    <CommentInput />
  </div>
</template>

<script>
import DetailItem from '@/components/DetailItem'
import CommentList from '@/components/CommentList'
import CommentInput from '@/components/CommentInput'

export default {
    name: 'DetailView',
    components: {
        DetailItem,
        CommentList,
        CommentInput,
    },
    data() {
        return {
            movieId: this.$route.params.movieId,
        }
    },
    created() {
        this.getDetailMovie()
        this.getMovieCommentList()
        this.getLikedMovie()
    },
    methods: {
        getDetailMovie(){
            this.$store.dispatch('detail/getDetailMovie', this.movieId)
        },
        getMovieCommentList() {
            this.$store.dispatch('comment/getCommentList')
            this.$store.dispatch('comment/getMovieCommentList', this.movieId)
        },
        createLikedMovies() {
            this.$store.dispatch('detail/createLikedMovies', this.movieId)
        },
        getLikedMovie() {
            this.$store.dispatch('detail/getLikedMovie', this.movieId)
        },
    },
    computed: {
        detailMovie() {
            return this.$store.getters['detail/detailMovie']
        },
        movieComments() {
            return this.$store.getters['comment/movieCommentList']
        },
        isLiked() {
            return this.$store.getters['detail/isLiked']
        },
    }
}
</script>

<style>

</style>