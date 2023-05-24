<template>
  <div>
    <!-- 한 줄 평론 모아보기 일때 보이는 부분 -->
    <div v-if="$route.path == '/v/comments'">
      <div>
        <h4 class="text-white p-3"><b>한 줄 평론 모아보기</b></h4>
      </div>
      <div class="d-flex flex-column justify-content-center" id="comments">
        <div class="p-2 text-black comment-container" v-for="comment in comments" :key="comment.id">
          <div id="comment">
            {{ comment.content }}
          </div>
          <div class="d-flex justify-content-end" id="comment-update">
            <p class="" v-if="comment.user === userId" @click="addUpdateComment(comment.id)">수정</p>
            <p class="margin-left-delete" v-if="comment.user === userId" @click="deleteComment(comment.id)">삭제</p>
          </div>
          <hr v-if="comment.id !== comments.length" class="comment-divider">
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
          <hr v-if="comment.id !== comments.length" class="comment-divider">
        </div>
      </div> 


    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  created() {
    this.getUser()
  },
  props: {
    comments: Array
  },
  computed: {
    userId() {
      return this.$store.state.user.user.id
    },
  },
  methods: {
    getUser() {
      this.$store.dispatch('user/getUser')
    },
    deleteComment(commentId) {
      this.$store.dispatch('comment/deleteComment', commentId)
    },
    addUpdateComment(commentId) {
      // console.log(commen)
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

#comment {
  font-size: 20px;
}
  .text-black {
    color: black;
  }

  .comment-container {
    /* border: 1px solid rgb(223, 124, 12); */
    margin-bottom: 10px;
    padding: 10px;
  }

  .comment-divider {
    border: none;
    border-top: 6px solid rgba(230, 188, 5, 0.849);
    margin-top: 10px;
  }


  #comment-update{
    margin-right: 20px;
    /* margin-top: 10; */
    height: 40px;
    padding-top: 20px;
  }

  .margin-left-delete {
    margin-left:10px;
  }

  #comments {
    background: white;
    width: 800px;
    margin: 0 auto;
    border-radius: 40px;
    border: 10px solid rgba(228, 129, 16, 0.137);
    padding-top: 45px;
  }
</style>