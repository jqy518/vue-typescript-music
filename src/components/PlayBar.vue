<template>
  <div id="playBar">
    <div class="centerbox">
        <ul id="visualizerBar" class="visualizerBlist">
            <li id="bolt" class="active"><i class="icon-bolt"></i></li>
            <li id="signal" ><i class="icon-signal"></i></li>
        </ul>
         <div id="playButn" @click="palyAndPause" class="clock">    
            <div class="left" ><div :style="pLeftCss"></div></div>
            <div class="right"><div :style="pRightCss"></div></div>
                <div class="progress">
                    <i id="p_icon" class="iconfont icon-bofang101"></i>
                    <span class="pronum">{{pronum}}</span>
                </div>
            </div>
            <i id="prevButn" class="prevBtn iconfont icon-shangyiqu101"></i>
            <i id="nextButn" class="nextBtn iconfont icon-xiayiqu101"></i>
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
    @Prop(String)
    url!:string
    pronum:string = "00:00"
    pLeftCss:any = {}
    pRightCss:any = {}
    audioTotalTime:number = 0
    audioObj:any = null
    working:boolean = false

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

   }
  palyAndPause ():void {
        if (!this.working) {
            this.working = true
            this.audioObj.load()
            this.audioObj.play()
        } else {
            this.working = false
            this.audioObj.pause()
        }
    }
  initPlay ():void {
      this.audioTotalTime = this.audioObj.duration
      window.setInterval(this.updateProgress.bind(this), 500)
  }
  updateProgress ():void {
        var curTime = this.audioObj.currentTime*1e3|0
        curTime += 100
        var progess = curTime / this.audioTotalTime * 0.1
        this.setprogress(progess, 50)
        this.pronum = this.getFormatTime(curTime / 1e3)
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
          'transform': `rotateZ(${(360/(2*n)*Rdeg-180)})deg)`
      }
      this.pRightCss = {
          'transform': `rotateZ(${(360/(2*n)*Ldeg-180)})deg)`
      }
  }
  @Watch('working')
  wWorking (nval:boolean, oval:boolean) {
      if (nval) {

      }
  }
}

</script>
