<template>
	<div id="playBar">
		<div class="centerbox">
		<ul id="visualizerBar" class="visualizerBlist">
			<li id="bolt" class="active"><i class="icon-bolt"></i></li>
			<li id="signal" ><i class="icon-signal"></i></li>
		</ul>
		 <div id="playButn" @click="palyAndPause" class="clock">    
			<div class="left"><div></div></div>
			<div class="right"><div></div></div>
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class playBar extends Vue {
	@Prop(String)
	url:string = ''
	pronum:string = "00:00"
	audioObj:any = null
	mounted (){
		this.audioObj =  this.$refs.playerAudio
	}
  palyAndPause():void {
		this.audioObj.load();
		this.audioObj.play();
	}
}

</script>

