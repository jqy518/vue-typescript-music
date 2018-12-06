<template>
  <div class="siderBox">
    <div class="searchBox">
      <input id="keyword" type="text" v-model="keywords">
      <button type="button" id="searchBtn" @click="seachHandle"><i class="iconfont icon-fangdajing3"></i></button>
    </div>
    <div class="listContainer">      
      <ul class="ul_list searchList">
        <li class="nomatch" v-show="songData.recordcount == 0"><i class="icon-search"></i>搜一搜....</li>
        <li :class="currHash == item.hash ? 'liactive' : ''" v-for="(item,i) in songData.data" :key="i" @click="playSong(item,i)"><span>{{item.filename}}</span></li>
      </ul>
      <ul class="ul_list loveList">
        <li class="liactive"><span>天之大-韩红</span></li>
      </ul>
    </div>
   <ul class="listmenu">
      <li class="active" data-side="0"><i class="iconfont icon-liebiao501"></i></li>
      <li data-side="1"><i class="iconfont icon-shoucang01"></i></li>
    </ul>
    <div class="copyRight">
      数据来源Kugo，仅供学习;@<a target="_blank" href="http://www.jekion.com">jekion</a>；
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getList, getSongInfo } from '../api'
@Component
export default class SideBar extends Vue {
  @Prop(Object)
  listInfo!:StoreState.ListInfo
  private keywords:string = "" 
  private currHash:string = ""
  private songIndex:number = 0
  private loading:boolean = false
  private currSongInfo:StoreState.SongInfo = {
    audio_name:'',
    author_name: '',
    filesize: 0,
    hash: '',
    img:'',
    play_url:'',
    lyrics:'',
    timelength: 0
  }
  private songData:StoreState.SongList = {
    status:0,
    recordcount:0,
    data:[]
  }
  seachHandle () {
    this.loading = true
    getList(this.keywords).then((data) => {
      this.songData = data as StoreState.SongList
      let listInfo:StoreState.ListInfo = {
        index: 0,
        total: this.songData.data.length
      }

      this.$store.commit('SET_LIST_INFO', listInfo)
    }).catch((err:Error) => {
      console.error(err)
    })
  }
  playSong (song:StoreState.ListItem, index:number) {
    this.currHash = song.hash
    this.songIndex = index
    getSongInfo(song.hash).then((data) => {
      let song = data
      this.currSongInfo = song as StoreState.SongInfo
      this.$store.commit('SET_SONG', this.currSongInfo)
      this.$store.commit('SET_LIST_INFO_INDEX', index)
    }).catch((err:Error) => {
      console.error(err)
    })
  }
  @Watch('listInfo', {deep:true}) 
  listInfoChange (nval:StoreState.ListInfo) {
    if (nval.index !== this.songIndex) {
      this.playSong(this.songData.data[nval.index], nval.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
