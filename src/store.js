import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: null,
    each: null,
    picked: null,
    rounds: [],
    question: ''
  },
  mutations: {
    init (state) {
      state = {
        total: null,
        each: null,
        picked: null,
        rounds: [],
        question: ''
      }
    },
    setting (state, data) {
      if (data.total) state.total = data.total
      if (data.each) state.each = data.each
      if (data.picked) state.picked = data.picked
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
