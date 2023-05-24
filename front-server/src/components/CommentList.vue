<template>
  <div>
    <!-- 한 줄 평론 모아보기 일때 보이는 부분 -->
    <div v-if="$route.path == '/v/comments'">
      <div>
        <h4 class="text-white p-3"><b>한 줄 평론 모아보기</b></h4>
      </div>
      <div class="d-flex flex-column justify-content-center" id="comments">
        <div class="p-2 text-black comment-container" v-for="(comment, idx) in comments" :key="comment.id">
          <div id="comment">
            {{ comment.content }}
          </div>
          <div class="d-flex justify-content-between" id="comment-update">
            <!-- user id -->
            <div class="d-flex align-items-center" id="comment-user">
              <img src="../../public/images/이모티콘.png" alt="">
              <p class="position-absolute" id="comment-user">{{ userNumber }}</p>
            </div>
            <!-- 수정 삭제 버튼 -->
            <div class="d-flex">
              <p class="m-0" v-if="isLoggedIn(comment.user)" @click="addUpdateComment(comment.id)">수정</p>
              <p class="margin-left-delete" v-if="isLoggedIn(comment.user)" @click="deleteComment(comment.id)">삭제</p>
            </div>
          </div>
          <hr v-if="idx !== comments.length - 1" class="comment-divider">
        </div>
      </div> 
    </div>

    <!-- detail에서 보이는 부분 -->
    <div v-else>
      <div>
        <h4 class="text-white p-3"><b>영화 평론</b></h4>
      </div>
      <div class="d-flex flex-column justify-content-center" id="comments">
        <div class="p-2 text-black comment-container" v-for="(comment, idx) in comments" :key="comment.id">
          {{ comment.content }}
          <div class="d-flex justify-content-end" id="comment-update">
            <p class="" v-if="isLoggedIn(comment.user)" @click="addUpdateComment(comment.id)">수정</p>
            <p class="margin-left-delete" v-if="isLoggedIn(comment.user)" @click="deleteComment(comment.id)">삭제</p>
          </div>
          <hr v-if="idx !== comments.length - 1" class="comment-divider">
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
    this.getUserList()
    this.isUserExist()
  },
  beforeRouteEnter(to, from, next) {
    next(next => {
      next.getUser()
      next.getUserList()
      next.isUserExist()
    })
  },
  props: {
    comments: Array
  },
  computed: {
    isLoggedIn() {
      // console.log(this.userId)
      return (commentUser) => commentUser === this.userId
    },
    userNumber() {
      return this.$store.state.user.commentUserNumber
    },
    userId() {
      if (this.$store.state.user.user) {
        return this.$store.state.user.user.id
      }
      else {
        return 0
      }
    },

  },
  methods: {
    isUserExist() {
      if (!localStorage.getItem('access')) {
        this.$store.dispatch('user/resetUser')
      }
    },
    getUserList() {
      this.$store.dispatch('user/getUserList')
    },
    getUser() {
      this.$store.dispatch('user/getUser')
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
  #comment-user {
    width: 40px;
  }
  
  img {
    width: 30px;
  }
  
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
    border-top: 3px solid rgb(116, 100, 100);
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
    border: 3px solid rgba(165, 13, 13, 0.829);
    padding-top: 45px;
  }
</style>