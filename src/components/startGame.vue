<template>
    <div>
        <h2>question:{{question}}</h2>
        <p v-if="!totalfork">total:{{total}}</p>
        <p v-if="!totalfork">each:{{each}}</p>
        <p v-if="totalfork">{{totalfork}}</p>
        <p v-if="eachfork">{{eachfork}}</p>
        <button v-if="question && !totalfork" @click="reset">cancel</button>
        <button v-if="question && !isStart" @click="startTimer" >start</button>
        <div v-if="stopCover" class="stopCover"><button v-if="totalfork !== 0" @click="startTimer">restart</button></div>
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
      isStart: false,
      stopCover: false
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
      if (!this.totalfork) this.totalfork = Number(this.total)
      if (!this.eachfork) this.eachfork = Number(this.each)
      this.isStart = true
      this.stopCover = false
      this.totalCount()
      this.eachCount()
    },
    totalCount () {
      let vm = this

      this.totalTimer = setInterval(() => {
        vm.totalfork--
        if (vm.totalfork === 0) {
          vm.stop()
          vm.$bus.$emit('yes', 'timeup')
          vm.$bus.$emit('stop')
        }
      }, 1000)
    },
    eachCount () {
      let vm = this
      let eachcopy = this.eachfork

      this.eachTimer = setInterval(() => {
        vm.eachfork--
        if (vm.eachfork < 7) { vm.$bus.$emit('yes', 'deda') }
        if (vm.eachfork === 0) {
          vm.stop()
          vm.$bus.$emit('yes', 'timeup')
          vm.eachfork = eachcopy
        }
      }, 1000)
    },
    stop () {
      clearInterval(this.eachTimer)
      clearInterval(this.totalTimer)
      if (this.totalfork !== 0) {
        this.stopCover = true
      } else { this.totalfork = 0; this.eachfork = 0; this.isStart = false }
    }
  }
}
</script>

<style >
.stopCover {
    position: absolute;
    background: rgba(0,0,0,0.6);
    min-height: 50vh;
    width: 100%;
    top: 0px;
    margin: 0 auto;
}
</style>
