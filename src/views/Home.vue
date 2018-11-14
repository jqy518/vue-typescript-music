<template>
  <div class="home">
    <side-bar />
    <play-bar :url="url" />
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/SideBar.vue'
import PlayBar from '@/components/PlayBar.vue'

export default {
  name: 'home',
  data(){
    return {
      url:'http://fs.open.kugou.com/fc8b84dd590665bda56d9bf862fdf072/5827b693/G072/M02/06/07/KJQEAFdUViWAPaBSAEflpT31pcw807.mp3'
    }
  },
  components: {
    SideBar,
    PlayBar
  }
}
</script>
