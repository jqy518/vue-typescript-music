<template>
  <div class="home">
    <side-bar :song="songInfo" />
    <play-bar :song="songInfo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SideBar from '@/components/SideBar.vue'
import PlayBar from '@/components/PlayBar.vue'
@Component({
  components: { SideBar, PlayBar }
})
export default class Home extends Vue {
  private get songInfo ():StoreState.SongInfo {
    return this.$store.state.song
  }
}
</script>
