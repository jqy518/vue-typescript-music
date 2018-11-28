<template>
  <div class="siderBox">
    <div class="searchBox">
      <input id="keyword" type="text" v-model="keywords">
      <button type="button" id="searchBtn" @click="seachHandle"><i class="iconfont icon-fangdajing3"></i></button>
    </div>
    <div class="listContainer">      
      <ul class="ul_list searchList">
        <li class="nomatch" v-show="songData.recordcount == 0"><i class="icon-search"></i>搜一搜....</li>
        <li :class="currHash == item.hash ? 'liactive' : ''" v-for="(item,i) in songData.data" :key="i" @click="playSong(item)"><span>{{item.filename}}</span></li>
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getList, getSongInfo } from '../api'
@Component
export default class SideBar extends Vue {
  @Prop() private msg!: string;
  private keywords:string = "" 
  private currHash:string = ""
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
    }).catch((err:Error) => {
      console.error(err)
    })
  }
  playSong (song:StoreState.ListItem) {
    this.currHash = song.hash
    getSongInfo(song.hash).then((data) => {
      this.currSongInfo = data as StoreState.SongInfo
    }).catch((err:Error) => {
      console.error(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
