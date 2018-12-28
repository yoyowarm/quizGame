<template>
    <div class="startGame">
        <h2><span class="Prefix">題目 </span>{{question[question.length -1]}}</h2>
        <p v-if="!totalfork"><span class="Prefix" v-if="!isStart">總秒數 </span> {{total}}秒</p>
        <p v-if="!totalfork"><span class="Prefix" v-if="!isStart">每回秒數 </span>{{each}}秒</p>
        <p v-if="totalfork"><span class="Prefix" >總秒數</span>{{totalfork}}</p>
        <p v-if="eachfork">倒數{{eachfork}}秒</p>
        <div class="btnLine">
          <button v-if="question && !totalfork" @click="reset" style="background:#a0a0a0">取消</button>
          <button v-if="question && !isStart" @click="startTimer" :disabled="!this.$store.state.total || !this.$store.state.each" >開始</button>
        </div>
        <div v-if="stopCover" class="stopCover">
            <button v-if="totalfork !== 0" @click="startTimer('nextPlay')">下一位</button>
            <button  @click="stop('end')">回合結束</button>
        </div>
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
      this.$store.commit('question', 'reset')
    },
    startTimer (type) {
      if (!this.totalfork) this.totalfork = Number(this.total)
      if (!this.eachfork) this.eachfork = Number(this.each)
      if (type === 'nextPlay') this.$bus.$emit('nextPlay')
      this.$bus.$emit('startGame')
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

      this.eachTimer = setInterval(() => {
        vm.eachfork--
        if (vm.eachfork < 7) { vm.$bus.$emit('yes', 'deda') }
        if (vm.eachfork === 0) {
          vm.stop()
          vm.$bus.$emit('yes', 'timeup')
          vm.$bus.$emit('noanswer')
          vm.eachfork = Number(vm.each)
        }
      }, 1000)
    },
    stop (type) {
      clearInterval(this.eachTimer)
      clearInterval(this.totalTimer)
      if (type === 'end') {
        this.totalfork = 0; this.eachfork = 0; this.isStart = false; this.stopCover = false; this.$bus.$emit('gameEnd')
      } else {
        if (this.totalfork !== 0) {
          this.stopCover = true
        } else { this.totalfork = 0; this.eachfork = 0; this.isStart = false }
      }
    }
  },
  created () {
    this.$bus.$on('answer', () => {
      this.stop()
      this.eachfork = Number(this.each)
    })
  },
  beforeDestroy () {
    this.$bus.$off('answer')
  }
}
</script>

<style lang="scss">
.startGame {
  background: #fbfbfb;
  width: 90%;
  margin: 0 auto;
  border-radius: 8px;
  padding: 8px;
  h2 {
    margin: 5px auto
  }
  p {
    font-size: 1.4em;
    font-weight: 600
  }
  .Prefix {
    font-size: 0.7em;
    font-weight: 400
  }
  button {
    background: #ff5a99;
    border: 0px;
    border-radius: 8px;
    font-size: 1.2em;
    padding: 6px 13px;
    margin: 10px;
    color: #fff;
    &:disabled {
      color: graytext
    }
  }
}
.btnLine {
  display: flex;
  button {
    flex: 0 0 44%
  }
}
.stopCover {
    position: absolute;
    background: rgba(0,0,0,0.6);
    min-height: 50vh;
    width: 100%;
    height: 100vh;
    top: 0px;
    left: 0;
    z-index: 9;
    display: flex;
    margin: 0 auto;
    justify-content: center ;
}
</style>
