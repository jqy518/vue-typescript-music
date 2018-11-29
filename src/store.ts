import Vue from 'vue'
import Vuex,{ MutationTree } from 'vuex'

Vue.use(Vuex)

export interface IState {
  song:StoreState.SongInfo
}

const initState:IState = {
  song :{
    audio_name:'',
    author_name: '',
    filesize: 0,
    hash: '',
    img:'',
    play_url:'',
    lyrics:'',
    timelength: 0
  }
}

const mutations:MutationTree<IState> = {
  'SET_SONG' (state:IState, data:StoreState.SongInfo) {
    state.song = data
  }
}
export default new Vuex.Store({
  state:initState,
  mutations: mutations,
  actions: {

  }
})
