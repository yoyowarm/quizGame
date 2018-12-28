<template>
    <div class="teams" :class="{active:currentplayer === 0,active1:currentplayer === 1,active2:currentplayer === 2}">
        <div class="item" >
            <p>{{teamoder[0]}} </p>
            <button @click="play('yes'),answer('correct',0)" class="correct" :disabled="padding">yes</button>
            <button @click="play('no'),answer('wrong',0)" class="wrong" :disabled="padding">wrong</button>
            <div class="point">Points:</div>
        </div>
        <div class="item" :class="{}">
            <p>{{teamoder[1]}} </p>
            <button @click="play('yes'),answer('correct',1)" class="correct" :disabled="padding">yes</button>
            <button @click="play('no'),answer('wrong',1)" class="wrong" :disabled="padding">wrong</button>
            <div class="point">Points:</div>
        </div>
        <div class="item" :class="{}">
            <p>{{teamoder[2]}} </p>
            <button @click="play('yes'),answer('correct',2)" class="correct" :disabled="padding">yes</button>
            <button @click="play('no'),answer('wrong',2)" class="wrong" :disabled="padding">wrong</button>
            <div class="point">Points:</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      answerList: [],
      currentplayer: 0,
      padding: false
    }
  },
  computed: {
    teamoder () {
      return this.$store.state.oder
    },
    gameMode () {
      return this.$store.state.picked === 'turn'
    }
  },
  methods: {
    play (type) {
      this.$bus.$emit('yes', type)
    },
    answer (type, e) {
      this.$bus.$emit('answer')
      this.currentplayer = e
      this.padding = true
      let data = {}
      data.team = this.teamoder[e]
      data.score = (type === 'correct') ? 1 : 0
      this.answerList.push(data)
      console.log(this.answerList)
    }
  },
  created () {
    this.$bus.$on('noanswer', () => {
      if (this.gameMode) {
        let data = {}
        data.team = this.teamoder[this.currentplayer]
        data.score = 0
        this.answerList.push(data)
      }
      console.log(this.answerList)
    })
    this.$bus.$on('nextPlay', () => {
      if (this.gameMode) {
        this.currentplayer = this.currentplayer + 1
        if (this.currentplayer > 2) { this.currentplayer = 0 }
      }
      this.padding = false
    })
    this.$bus.$on('gameEnd', () => {
      this.padding = false
      this.currentplayer = 0
    })
  }
}
</script>

<style lang="scss">
.teams {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 300vw;
    left: 0px;
    position: relative;
    transition: all 0.3s;
    .item {
        background: #eee;
        width: 100vw;
        margin: 5px;
        position: relative;
        button {
            padding: 10px;
            margin: 10px 10px;
            border: 0px;
            color: #fff;
            font-size: 1em;
            min-width: 140px;
            border-radius: 10px;
            background: #999;
            &:disabled {background: #d2d2d2}
        }
        p { margin: 5px 0px}
        // .correct {background: #20bb26}
        // .wrong { background: #fd3021}
    }
}
.active {
           left: 0x;
        }
    .active1 {
        left: -100vw;
    }
    .active2 {
        left: -200vw;
}
</style>
