import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: null,
    each: null,
    picked: null,
    rounds: [],
    question: [],
    oder: [],
    gameover: false
  },
  mutations: {
    init (state) {
      state.total = null
      state.each = null
      state.picked = null
      state.rounds = []
      state.question = []
      state.oder = [],
      state.gameover = false
    },
    setting (state, data) {
      if (data.total) state.total = data.total
      if (data.each) state.each = data.each
      if (data.picked) state.picked = data.picked
      if (data.oder) state.oder = data.oder

      console.log(state)
    },
    question (state, data) {
      if (data === 'reset') {
        state.question.pop()
      } else {
        state.question.push(data)
      }
      console.log(state)
    },
    nextRound (state) {
      state.total = null
      state.each = null
      state.picked = null
      // state.question = []
    },
    checkout (state, data) {
      state.rounds.push(data)
    },
    addRound (state, data) {
      state.rounds.push(data)
      console.log(state.rounds)
    },
    bingo (state, e) {
      state.rounds[state.rounds.length -1][`team${e+1}`] = state.rounds[state.rounds.length -1][`team${e+1}`]+1
      console.log(state.rounds)
    },
    gameover (state, type) {
      state.gameover = type
    }
  },
  actions: {

  }
})
