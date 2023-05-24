<template>
  <div>
    <form v-if="!updateCommentObject" @submit.prevent="createComment">
      <label class="text-white p-3" style="margin-right:20px;" for="content"><b>본 영화에 대한 한 줄 평론을 작성해주세요.</b></label>
      <div class="d-flex justify-content-center">
        <div class="p-3">
          <textarea  @keyup.enter="createComment" class="form-control" id="content" cols="40" rows="5" v-model="content" placeholder="본 영화에 대한 한 줄 평론을 작성해주세요."></textarea>
        </div>
        <div style="margin-top:115px; margin-left:10px">
          <button class="btn btn-light">등록</button>
        </div>
      </div>
    </form>
    <form v-else @submit.prevent="updateComment">
      <label class="text-white p-3" style="margin-right:20px;" for="content"><b>본 영화에 대한 한 줄 평론을 작성해주세요.</b></label>
      <div class="d-flex justify-content-center">
        <div class="p-3">
          <textarea @keyup.enter="createComment" class="form-control" id="content" cols="40" rows="5" v-model.lazy="updateCommentObject.content"></textarea>
        </div>
        <div style="margin-top:115px; margin-left:10px">
          <input class="btn btn-light" type="submit" value="수정">
        </div>
      </div>
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