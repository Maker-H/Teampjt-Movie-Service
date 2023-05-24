<template>
  <div>
    <!-- <h1>평론 리스트</h1> -->
    <hr>
    <CommentList :comments="comments"/>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
export default {
  name: 'CommentView',
  components: {
    CommentList
  },
  beforeRouteEnter(to, from, next) {
    next(next => {
      next.getCommentList()
      next.checkLoggedIn()
    })
  },
  methods: {
    checkLoggedIn() {
      this.$store.dispatch('check/checkLoggedIn')
    },
    getCommentList(){
      console.log('startGetComment')
      this.$store.dispatch('comment/getCommentList')
    }
  },
  computed: {
    comments() {
      return this.$store.getters['comment/commentList']
    }
  }
}
</script>

<style>

</style>