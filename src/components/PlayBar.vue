<template>
  <div id="playBar">
    <div class="centerbox">
        <ul id="visualizerBar" class="visualizerBlist">
            <li id="bolt" class="active"><i class="icon-bolt"></i></li>
            <li id="signal" ><i class="icon-signal"></i></li>
        </ul>
         <div id="playButn" @click="palyAndPause" class="clock">    
            <div class="left" ><div :style="pRightCss"></div></div>
            <div class="right"><div :style="pLeftCss"></div></div>
                <div class="progress">
                    <i id="p_icon" class="iconfont" 
                    :class="{
                        'icon-bofang101':!working&&!needload,
                        'icon-zanting101':working&&!needload,
                        'icon-loading':needload
                        }">
                    </i>
                    <span class="pronum">{{pronum}}</span>
                </div>
            </div>
            <i id="prevButn" 
            @click="preHandle" 
            class="prevBtn iconfont icon-shangyiqu101" 
            :class="this.listInfo.index == 0 ? 'disableBtn':''"></i>
            <i id="nextButn" 
             @click="nextHandle" 
             class="nextBtn iconfont icon-xiayiqu101"
             :class="nonext ? 'disableBtn':''"
             ></i>
            <i id="typeButn" class="typeBtn iconfont icon-suijibofang01"></i>
    </div>
    <audio ref='playerAudio' preload='auto'>
        <source :src="url"/>
    </audio>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class playBar extends Vue {
    @Prop(Object)
    song!:StoreState.SongInfo
    @Prop(Object)
    listInfo!:StoreState.ListInfo
    pronum:string = "00:00"
    url:string = ""
    pLeftCss:any = {} // 进度条样式
    pRightCss:any = {} // 进度条样式
    audioTotalTime:number = 0 // 总时长
    progessIntervalID:any = null // 进度时间刷新定时器
    needload:boolean = true // 是否需要加载
    audioObj:any = null // 播放器对象
    working:boolean = false // 是否在播放

    mounted () {
        this.audioObj = this.$refs.playerAudio
        
        this.audioBindEvent()
    }
    // 给audio绑定一些监听事件
   audioBindEvent ():void {
       this.audioObj.addEventListener('canplay', this.initPlay.bind(this), false)
       this.audioObj.addEventListener('ended', this.songEnd.bind(this), false)
   }
   songEnd ():void {
       this.audioObj.pause()
       window.clearInterval(this.progessIntervalID)
        this.progessIntervalID = null
        this.pronum = '00:00'
        this.pLeftCss = {} 
        this.pRightCss = {} 
        this.audioTotalTime = 0 
        this.working = false
   }
  palyAndPause ():void {
        if (!this.working) {
            this.working = true
            if (this.needload) {
                this.audioObj.load()
            }
            this.audioObj.play()
            this.progessIntervalID = window.setInterval(this.updateProgress.bind(this), 500)
        } else {
            this.working = false
            this.audioObj.pause()
            window.clearInterval(this.progessIntervalID)
            this.progessIntervalID = null
        }
    }
  initPlay ():void {
      this.audioTotalTime = this.audioObj.duration
      this.needload = false
      this.palyAndPause()
  }
  updateProgress ():void {
        var curTime = this.audioObj.currentTime*1e3|0
        curTime += 100
        var progess = curTime / this.audioTotalTime * 0.1
        this.setprogress(progess, 50)
        this.pronum = this.getFormatTime(curTime / 1e3)
        this.$store.commit('SET_CURR_TIME',curTime)
  }
  getFormatTime (time:number):string {
    let min = '00' + (time / 60 | 0)
    let sec = time % 60 
    let secStr = '00' + (sec | 0)
    return [min.substr(-2), secStr.substr(-2)].join(':')
  }
  setprogress (num:number, n:number):void {
      let Rdeg = num > n ? n : num
      let Ldeg = num > n ? num - n : 0
      this.pLeftCss = { 
          'transform': `rotateZ(${(360/(2*n)*Rdeg-180)}deg)`
      }
      this.pRightCss = {
          'transform': `rotateZ(${(360/(2*n)*Ldeg-180)}deg)`
      }
  }
  preHandle () {
      let index = this.listInfo.index
      let total = this.listInfo.total
      if (total!==0 && index!==0) {
          this.$store.commit('SET_LIST_INFO_INDEX', index - 1)
      }
  }
  nextHandle () {
      let index = this.listInfo.index
      let total = this.listInfo.total
      if (index + 1 < total) {
          this.$store.commit('SET_LIST_INFO_INDEX', index + 1)
      }
  }
  private get nonext () {
      return this.listInfo.total === 0 || this.listInfo.total === this.listInfo.index + 1
  }
  @Watch('url')
  urlChange (nval:string, oval:string) {
      if (nval) {
          this.songEnd() // 结束当前播放；
          this.needload = true
          this.audioObj.load()
      }
  }
  @Watch('song', { deep: true })
  songChange (nval:StoreState.SongInfo) {
      this.url = nval.play_url
  }
}
</script>
