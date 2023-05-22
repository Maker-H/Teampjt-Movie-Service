<template>

  <div id="nav-bar">  
    <div class="position-relative">
      <router-link class="navbar-brand" :to="{ name: 'HomeView' }">
        <img src="../../public/images/로고.png" alt="">
      </router-link>

      <!-- 오른쪽 상단 -->
      <div class="position-absolute" id="login-nav" @click="checkLoggedIn">
        <router-link class=" btn-login text-decoration-none" v-show="isLoggedIn" :to="{name: 'ProfileView'}">
          <i class="fa-duotone fa-square-user fa-lg"></i>
        </router-link>  
        <button v-show="isLoggedIn" @click="logout">
          <i class="fa-solid fa-person-through-window fa-lg"></i>
        </button>

        <button class="btn btn-login">
          <router-link class="text-decoration-none " v-show="isLoggedOut" :to="{name: 'LoginView'}">
            <i class="fa-solid fa-arrow-right-to-bracket fa-lg" style="color: #000000;"></i>
          </router-link> 
        </button>
        <router-link class="text-decoration-none" v-show="isLoggedOut" :to="{name: 'SignUpMessageView'}">
          <i class="fa-sharp fa-solid fa-user-plus fa-lg" style="color: #000000;"></i>
        </router-link> 
      </div>
      <!-- 오른쪽 상단 -->
    </div>

    <nav class="navbar navbar-light" id="mainNav">
      <div class="container ">
        <router-link class="text-decoration-none" :to="{name: 'HomeView'}">Home</router-link> 
        <router-link class="text-decoration-none" :to="{name: 'CommentView'}">Comment</router-link> 
        <router-link class="text-decoration-none" :to="{name: 'RecommandView'}">Recommand</router-link> 


        <div class="d-flex">
          <input class="input-group-text" type="text" @keyup.enter="moveSearchView" v-model.trim="movieTitle">
          <div class="glass">
            <i @click="moveSearchView" class="fa-solid fa-magnifying-glass fa-lg" style="color: #d22d4e;"></i>
          </div>
        </div>
      </div>
    </nav>
  </div>
  
</template>


<script>
export default {
  name: 'NavBar',
  data() {
    return{
      movieTitle: '',
      loggedIn: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.check.loggedIn
    },
    isLoggedOut(){
      return !this.$store.state.check.loggedIn
    }
  },
  methods: {
    checkLoggedIn() {
      this.$store.dispatch('check/checkLoggedIn')
    },
    logout() {
      this.$store.dispatch('logout/logout')
      this.$$router.push({name: 'HomeView'})
    },

    moveSearchView() {
      if (!this.movieTitle){
        alert('검색 결과가 없습니다.')
        return
      }
      this.$store.dispatch('search/getSearchMovieList', this.movieTitle)
      
      this.$router.push({name : 'SearchView', query : {title : this.movieTitle}})
        .catch(err => {
          // 중복된 네비게이션 오류를 처리합니다.
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      this.movieTitle = ''
    }
  }
}
</script>

<style scoped>
#nav-bar {
  min-width: 800px;
}
#navbarNav {
  width: 80%;
}
#mainNav {
  min-width: 1005px;
  margin-right: 10px;
  margin-left: 50px;
}
.nav-link {
  color: black;
}

#nav-container {
  margin: 0;
  padding: 0;
  width: 1300px;
  min-width: 1005px;
}

img {
  width: 46px;
}

.nav-item {
  margin: 0 8px;
}

.glass {
  margin-left: 10px;
  padding-top: 7px;
}

#login-nav{
  top: 18px;
  right: 20px;
}

.text-decoration-none{
  color: black;
}
.btn-login{
  width: 50px;
}
</style>