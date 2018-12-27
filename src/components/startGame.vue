<template>
    <div>
        <h2>question:{{question}}</h2>
        <p v-if="!totalfork">total:{{total}}</p>
        <p v-if="!totalfork">each:{{each}}</p>
        <p v-if="totalfork">{{totalfork}}</p>
        <p v-if="eachfork">{{eachfork}}</p>
        <button v-if="question && !totalfork" @click="reset">cancel</button>
        <button v-if="question && !isStart" @click="startTimer" >start</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      totalTimer: null,
      eachTimer: null,
      totalfork: null,
      eachfork: null,
      isStart: false
    }
  },
  computed: {
    question () {
      return this.$store.state.question
    },
    total () {
      return this.$store.state.total
    },
    each () {
      return this.$store.state.each
    }
  },
  methods: {
    reset () {
      this.$store.commit('question', '')
    },
    startTimer () {
      if (!this.totalfork) this.totalfork = this.total
      if (!this.eachfork) this.eachfork = this.each
      this.isStart = true
      this.totalCount()
      this.eachCount()
    },
    totalCount () {
      let vm = this

      this.totalTimer = setInterval(() => {
        vm.totalfork--
        if (vm.totalfork === 0) { vm.restart() }
      }, 1000)
    },
    eachCount () {
      let vm = this
      let eachcopy = this.eachfork

      this.eachTimer = setInterval(() => {
        vm.eachfork--
        if (vm.eachfork < 7) { vm.$bus.$emit('yes', 'deda') }
        if (vm.eachfork === 0) {
          vm.restart()
          vm.$bus.$emit('yes', 'timeup')
          vm.eachfork = eachcopy
          vm.isStart = false
        }
      }, 1000)
    },
    restart () {
      clearInterval(this.eachTimer)
      clearInterval(this.totalTimer)
    }
  }
}
</script>

<style >
</style>
