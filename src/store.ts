import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'

Vue.use(Vuex)

export interface IState {
  song:StoreState.SongInfo,
  listInfo:StoreState.ListInfo,
  currTime:number
}

const initState:IState = {
  song: {
    audio_name: '',
    author_name: '',
    filesize: 0,
    hash: '',
    img: '',
    play_url: '',
    lyrics: '',
    timelength: 0
  },
  listInfo: {
    index: 0,
    total: 0
  },
  currTime:0
}

const mutations:MutationTree<IState> = {
  'SET_SONG' (state:IState, data:StoreState.SongInfo) {
    state.song = data
  },
  'SET_LIST_INFO' (state:IState, data:StoreState.ListInfo) {
    state.listInfo = data
  },
  'SET_LIST_INFO_INDEX' (state:IState, data:number) {
    state.listInfo.index = data
  },
  'SET_CURR_TIME' (state:IState, data:number) {
    state.currTime = data
  }
}
export default new Vuex.Store({
  state: initState,
  mutations: mutations,
  actions: {

  }
})
