import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: null,
    each: null,
    picked: null,
    rounds: [],
    question: '',
    firstPlay: '',
    secondPlay: ''
  },
  mutations: {
    init (state) {
      state = {
        total: null,
        each: null,
        picked: null,
        rounds: [],
        question: '',
        firstPlay: '',
        secondPlay: ''
      }
    },
    setting (state, data) {
      if (data.total) state.total = data.total
      if (data.each) state.each = data.each
      if (data.picked) state.picked = data.picked
      if (data.firstPlay) state.firstPlay = data.firstPlay
      if (data.secondPlay) state.secondPlay = data.secondPlay
      console.log(state)
    },
    question (state, data) {
      state.question = data
      console.log(state)
    }
  },
  actions: {

  }
})
