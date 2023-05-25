<template>
  <div class="text-white" style="margin-top: 50px">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <b>hook의 영화 추천서비스가 궁금하다면?</b>
    </button>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel"><b>hook 날씨 추천 서비스란?</b></h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-dark">
            <b>hook 날씨 추천 서비스는 현재 날씨 상태에 따른 영화 장르를 추천해 사용자의 편의와 휴식을 도모합니다.<br><br>
            사용법 - 아래 추천 버튼을 클릭하게 되면, 이용 요금으로 100포인트가 차감되며 포인트 충전은 프로필 내 카카오 페이 충전을 이용해주세요.</b>
            </p>
            <img src="../../public/images/recommand.png" alt="recommand">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="p-5">
      <!-- @keyup.enter="getRecommandMovieList" -->
      <input v-if="clicked" type="text" v-model.trim="address">
      <button v-if="clicked" @click="getRecommandMovieList">주소 등록</button>
      <button v-else @click="getAddress" class="btn btn-light"><b>영화 추천</b></button>
    </div>
    <div v-if="clickedAddress" class="d-flex justify-content-center">
      <div class="" style="margin-right:200px;">
        <h3><b>현재 날씨는 {{state}}, 기온은 {{temperature}}도 입니다.</b></h3>
        <div class="text-light">
          <p v-if="state=='맑음'">
            맑은 날씨는 야외 활동과 모험적인 분위기에 적합합니다. <br>Adventure 장르의 영화는 모험과 액션을 담고 있어 맑은 날씨와 잘 어울립니다. <br>"인디아나 존스" 시리즈나 "나니아 연대기"와 같은 영화를 추천합니다.
          </p>
          <p v-else-if="'비'">
            비는 종종 우울하거나 잔잔한 분위기를 연상시킵니다. Drama 장르의 영화는 인간의 감정과 인생 이야기를 다루어 비와 잘 어울리는 분위기를 조성합니다. "타이타닉"이나 "그린 북"과 같은 감동적인 드라마를 추천합니다.
          </p>
          <p v-else-if="'비/눈'">
            비와 눈이 함께 오는 날씨는 비밀스러움과 신비로움을 연상시킵니다. Mystery 장르의 영화는 수수께끼와 미스터리한 이야기를 풀어나가는데 적합합니다. "셔터 아일랜드"나 "골드핑거"와 같은 영화를 추천합니다.
          </p>
          <p v-else-if="'눈'">
            눈이 내리는 날씨는 환상적이고 매력적인 분위기를 연출합니다. Animation 장르의 영화는 창의적인 그래픽과 아름다운 애니메이션을 통해 눈의 아름다움을 재현할 수 있습니다. "겨울왕국"이나 "라푼젤"과 같은 애니메이션 영화를 추천합니다.
          </p>
          <p v-else-if="'소나기'">
            소나기는 긴장감과 불안감을 유발할 수 있습니다. Thriller 장르의 영화는 흥미진진한 이야기와 긴장감 넘치는 장면들로 소나기와 어울리는 분위기를 조성합니다. "인셉션"이나 "매트릭스"와 같은 스릴러 영화를 추천합니다.
          </p>
        </div>
        <p><b>추천 장르는 {{recommandGenre}}입니다.</b></p>
        <p>{{userPoint}}</p>
      </div>
      <div>
        <RecommandMap :center="center"/>
      </div>
    </div>
    <hr>
    <RecommandItem :movie="recommandMovie"/>
  </div>
</template>

<script>
import RecommandItem from '@/components/RecommandItem'
import RecommandMap from '@/components/RecommandMap'

export default {
  name: 'RecommandView',
  beforeRouteEnter(to, from, next) {
    next(next => {
      next.checkLoggedIn()
      // next.getRecommandMovieList()
    })
  },
  created(){
    this.checkLoggedIn()
  },
  data() {
    return {
      clicked: false,
      address: null,
      clickedAddress: false,
    }
  },
  components: {
    RecommandItem,
    RecommandMap
  },
  computed: {
    state(){
      return this.$store.getters['recommand/state']
    },
    temperature(){
      return this.$store.getters['recommand/temperature']
    },
    recommandGenre(){
      return this.$store.getters['recommand/recommandGenre']
    },
    recommandMovie(){
      return this.$store.getters['recommand/recommandMovie']
    },
    genres() {
      return this.$store.getters['recommand/genres']
    },
    userPoint() {
      return this.$store.getters['recommand/userPoint']
    },
    center() {
      return this.$store.getters['recommand/center']
    }
  },
  methods: {
    useUserPoint() {
      this.$store.dispatch('recommand/useUserPoint')
    },
    checkLoggedIn() {
      this.$store.dispatch('check/checkLoggedIn')
    },
    getAddress() {
      this.clicked = true
    },
    getRecommandMovieList() {
      const address = this.address.split(" ")
      console.log(typeof(this.userPoint), this.userPoint)
      if (this.userPoint <= 0) {
        alert('포인트 충전이 필요합니다.')
        this.$router.push({name: 'ProfileView'})
        return
      }
      this.clickedAddress = true
      this.$store.dispatch('recommand/getMovieList')
      this.$store.dispatch('recommand/getGenreList')
      this.$store.dispatch('recommand/getMapData', address)
      this.useUserPoint()
    },
  }
}
</script>

<style>

</style>