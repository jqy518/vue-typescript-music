<template>
  <div class="songinfo">
     <div class="songCover">
       <img v-if="!song.img" class="coverImg" src="../assets/hh.jpg">
       <img v-else class="coverImg" :src="song.img">
       <dl class="info">
         <dt>{{song.audio_name}}</dt>
         <dd>{{song.author_name}}</dd>
       </dl>
     </div>
     <div class="lrcBox">
      <ul v-if="datajson.arrLyric.length == 0">
        <li>....暂无歌词....</li>
      </ul>
      <ul v-else>
        <li v-for="(item,index) in datajson.arrLyric" :key="index">{{item}}</li>
      </ul>
    </div> 
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

interface LrcJsonData {
  arrLyric: string[],
  arrLyricTime: string[]
}

@Component
export default class LrcBox extends Vue {
  @Prop()
  song!:StoreState.SongInfo
  @Prop(Number)
  currTime!:number
  datajson:LrcJsonData = {
    arrLyric: [],
    arrLyricTime: []
  }
  init (song:StoreState.SongInfo) {
    this.setLrc(song.lyrics)
  }
  setLrc (lyricContent:string) {
    this.datajson = this.parseLrc(lyricContent)
  }
  parseLrc (lyric:string) {
    let datajson:LrcJsonData={
        arrLyric: [],
        arrLyricTime: []
      }
      let lrcre = new RegExp('\\[[0-9:.]*\\]', 'g')
      let lrcarr = lyric.split('\r\n')
      let lrctemp = 0
      let lrcfilter = 0
      for (let i = 0; i < lrcarr.length; i++) {
          let lrctxt = lrcarr[i].replace(/\[[\w\W]*\]/g, '').trim()
          if (lrctxt === '') {
              lrcfilter++
              continue
          }
          datajson.arrLyric[i - lrcfilter] = lrctxt
          let lrcresult
          while ((lrcresult = lrcre.exec(lrcarr[i])) !== null) {
              let lrcsecond = this.parseSecond(lrcresult.toString().replace(/\[|\]/g, ''))
              if (!isNaN(lrcsecond)) {
                datajson.arrLyricTime[lrctemp++] = (i - lrcfilter) + '|' + lrcsecond
              } 
          }
      }
      return datajson
  }
   parseSecond (time:string) {
        console.log(time)
        try {
            let lrcarr = time.split(':')
            return parseInt(lrcarr[0]) * 60 + parseFloat(lrcarr[1])
        } catch (ex) {
            return 0
        }
    }
  @Watch('song')
  songChange (nval:StoreState.SongInfo) {
    this.init(nval)
  }
}
</script>
