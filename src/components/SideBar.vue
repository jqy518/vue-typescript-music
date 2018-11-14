<template>
  <div class="siderBox">
    <div class="searchBox">
      <input id="keyword" type="text" name="keyword">
      <button type="button" id="searchBtn"><i class="iconfont icon-fangdajing3"></i></button>
    </div>
    <div class="listContainer">      
      <ul class="ul_list searchList">
        <li class="nomatch"><i class="icon-search"></i>搜一搜....</li>
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SideBar extends Vue {
  @Prop() private msg!: string;
  name:string = "zhangsan" 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
