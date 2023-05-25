<template>

  <div id="nav-bar">  
    <div class="position-relative">
      <router-link class="navbar-brand" :to="{ name: 'HomeView' }">
        <img src="../../public/images/로고.png" alt="">
      </router-link>

      <!-- 오른쪽 상단 -->
      <!-- 로그아웃 -->
      <div class="position-absolute" id="login-nav">
        <button class="btn btn-login"  v-if="isLoggedIn" @click="logout">
          <i class="fa-solid fa-door-open fa-2xl" style="color: #ffffff;"></i>
        </button>
        <router-link class=" btn-login text-decoration-none" v-if="isLoggedIn" :to="{name: 'ProfileView'}">
          <i class="fa-solid fa-id-card-clip fa-2xl" style="color: #ffffff;"></i>
        </router-link>  


        <!-- 로그인 -->
        <button class="btn btn-login" v-if="isLoggedOut">
          <router-link class="text-decoration-none "  :to="{name: 'LoginView'}">
            <i class="fa-solid fa-arrow-right-to-bracket fa-2xl" style="color: #ffffff;"></i>
          </router-link> 
        </button>
        <router-link class="text-decoration-none" v-if="isLoggedOut" :to="{name: 'SignUpMessageView'}">
          <i class="fa-sharp fa-solid fa-user-plus fa-2xl" style="color: #ffffff;"></i>
        </router-link> 
      </div>
      <!-- 오른쪽 상단 -->
    </div>

    <nav class="navbar navbar-light" id="main-nav">
      <div class="container-xl">
        <router-link class="text-decoration-none" :to="{name: 'HomeView'}">Home</router-link>
        <div class="text-decoration-none">|</div>
        <router-link class="text-decoration-none" :to="{name: 'CommentView'}">Comment</router-link> 
        <div class="text-decoration-none">|</div>
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
    logout() {
      this.$store.dispatch('logout/logout')
      this.$store.dispatch('check/checkLoggedIn')
      const currentPath = this.$route.path
      const newPath = '/v'

      if (currentPath !== newPath) {
        this.$router.push(newPath)
      }
    },

    moveSearchView() {
      console.log(this.movieTitle)
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
  min-width: 1000px;
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

#nav-container  {
  margin: 0;
  padding: 0;
  width: 100%;
  min-width: 1000px;
}

#main-nav {
  width: 100%;
  min-width: 1000px;
}

img {
  width: 60px;
}

.nav-item {
  margin: 0 8px;
}

.glass {
  margin-left: 10px;
  padding-top: 7px;
}

#login-nav{
  top: 29px;
  right: 15px;
}

.text-decoration-none{
  color: white;
}

.btn-login{
  width: 50px;
  margin-right: 25px;
}
</style>