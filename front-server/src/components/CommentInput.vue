<template>
  <div>
    <form v-if="!updateCommentObject" @submit.prevent="createComment">
          <label for="content">평론 : </label>
          <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
          <input type="submit" value="등록">
    </form>
    <form v-else @submit.prevent="updateComment">
          <label for="content">평론 : </label>
          <textarea id="content" cols="30" rows="10" v-model.lazy="updateCommentObject.content"></textarea>
          <input type="submit" value="수정">
    </form>
  </div>
</template>

<script>
export default {
  name: 'CommentInput',
  data() {
    return{
        content: null,
    }
  },
  created() {
  },
  computed: {
    updateCommentObject() {
      return this.$store.getters['comment/updateCommentObject']
    }
  },
  methods: {
    createComment() {
      const content = this.content
      const movieId = this.$route.params.movieId
      if (!content) {
        alert('내용을 입력해주세요.')
        return
      }
      const payload = { content, movieId }
      this.$store.dispatch('comment/createComment', payload)
      this.content = null
    },
    updateComment() {
      const id = this.updateCommentObject.id
      const content = this.updateCommentObject.content

      const payload = {id, content}
      this.$store.dispatch('comment/updateComment', payload)
    }
  }
}
</script>

<style>

</style>