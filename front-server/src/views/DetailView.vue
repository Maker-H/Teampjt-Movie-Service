<template>
  <div>
    <h1>DetailView</h1> 
    <DetailItem :movie="detailMovie"/>
    <hr>
    <CommentForm />
  </div>
</template>

<script>
import DetailItem from '@/components/DetailItem'
import CommentForm from '@/components/CommentForm'

export default {
    name: 'DetailView',
    components: {
        DetailItem,
        CommentForm
    },
    data() {
        return {
            movieId: this.$route.params.movieId,
        }
    },
    created() {
        this.getDetailMovie()
    },
    methods: {
        getDetailMovie(){
            this.$store.dispatch('detail/getDetailMovie', this.movieId)
        }
    },
    computed: {
        detailMovie() {
            return this.$store.getters['detail/detailMovie']
        },
    }
}
</script>

<style>

</style>