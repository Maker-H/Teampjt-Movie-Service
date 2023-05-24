<template>
  <div>
    <!-- 한 줄 평론 모아보기 일때 보이는 부분 -->
    <div v-if="$route.path == '/v/comments'">
      <div>
        <h4 class="text-white p-3"><b>한 줄 평론 모아보기</b></h4>
      </div>
      <div class="d-flex flex-column justify-content-center" id="comments">
        <div class="p-2 text-white comment-container" v-for="comment in comments" :key="comment.id">
          {{ comment.content }}
          <div class="d-flex justify-content-end" id="comment-update">
            <p class="" v-if="comment.user === userId" @click="addUpdateComment(comment.id)">수정</p>
            <p class="margin-left-delete" v-if="comment.user === userId" @click="deleteComment(comment.id)">삭제</p>
          </div>
          <hr class="comment-divider">
        </div>
      </div> 
    </div>

    <!-- detail에서 보이는 부분 -->
    <div v-else>
      <div>
        <h4 class="text-white p-3"><b>영화 평론</b></h4>
      </div>
      <div class="d-flex flex-column justify-content-center" id="comments">
        <div class="p-2 text-white comment-container" v-for="comment in comments" :key="comment.id">
          {{ comment.content }}
          <div class="d-flex justify-content-end" id="comment-update">
            <p class="" v-if="comment.user === userId" @click="addUpdateComment(comment.id)">수정</p>
            <p class="margin-left-delete" v-if="comment.user === userId" @click="deleteComment(comment.id)">삭제</p>
          </div>
          <hr class="comment-divider">
        </div>
      </div> 


    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  created() {
    this.getUserId()
  },
  props: {
    comments: Array
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    },
  },
  methods: {
    getUserId() {
      this.$store.dispatch('user/getUserId')
    },
    deleteComment(commentId) {
      this.$store.dispatch('comment/deleteComment', commentId)
    },
    addUpdateComment(commentId) {
      this.$store.dispatch('comment/addUpdateComment', commentId)
      
      // 페이지 하단으로 이동하는 기능
      window.scrollTo({ 
        top: document.body.scrollHeight,
        behavior: "smooth" 
      });
    },
    }
}
</script>

<style scoped>
  .comment-container {
    /* border: 1px solid rgb(223, 124, 12); */
    margin-bottom: 10px;
    padding: 10px;
  }

  .comment-divider {
    border: none;
    border-top: 1px solid rgb(223, 124, 12);
    margin-top: 10px;
  }


  #comment-update{
    margin-right: 20px;
    /* margin-top: 10; */
    height: 40px;
  }

  .margin-left-delete {
    margin-left:10px;
  }

  #comments {
    width: 800px;
    margin: 0 auto;
    /* border: 1px solid rgb(223, 124, 12); */
    padding-top: 30px;
  }
</style>