<template>
    <div>
      <input type="text" v-model="question">
      <button @click="newAProblem">new</button>
      <button v-if="question" @click="confirm">confirm</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      question: '',
      questionBank: ['ss', 'aa', 'cc', 'dd', 'ee', 'ww']
    }
  },
  methods: {
    newAProblem () {
      let sit = this.questionBank.length
      let question = this.questionBank[Math.floor(Math.random() * sit) + 1]
      this.question = question
    },
    confirm () {
      this.$store.commit('question', this.question)
      this.question = ''
    }
  }
}
</script>

<style lang="">
</style>
