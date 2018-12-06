<template>
  <div class="home">
    <side-bar :list-info="listInfo" />
    <play-bar :song="songInfo" :list-info="listInfo" />
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
  private get listInfo ():StoreState.ListInfo {
    return this.$store.state.listInfo
  }
}
</script>
