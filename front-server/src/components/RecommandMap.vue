<template>
  <div>
    <div>
      <gmap-map
          :zoom="14"    
          :center="center"
          style="width:300px;  height: 300px;"
        >
        <gmap-marker
        :key="index"
        v-for="(m, index) in [{position:center}]"
        :position="m.position">
        </gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
export default {
    name: 'RecommandMap',
    data() {
        return {
            // center: {},
            // locationMarkers: [],
        }
    },
    props: {
        center: Object
    },
    // created() {
    //     this.setCoordinate()
    // },
    // mounted() {
    //     this.setCoordinate()
    // },
    // computed: {
    // },
    // methods: {
    //     setCoordinate() {
    //         this.center = {lat:this.$store.state.recommand.latitude, lng:this.$store.state.recommand.longitude}
    //         this.locationMarkers = [
    //             {
    //                 position: this.center
    //             }
    //         ]
    //         console.log(this.center)
    //     }
    // }
}
</script>

<style>

</style>