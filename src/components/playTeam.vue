<template>
    <div class="teams" :class="{active:currentplayer === 0,active1:currentplayer === 1,active2:currentplayer === 2,turn:gameMode}">
        <div class="item team1" >
            <p class="teamName">{{teamoder[0]}} </p>
            <button @click="play('yes'),answer('correct',0)" class="correct" :disabled="padding">答對了！</button>
            <button @click="play('no'),answer('wrong',0)" class="wrong" :disabled="padding">答錯了！</button>
            <div class="point">Points:</div>
        </div>
        <div class="item team2" :class="{}">
            <p class="teamName">{{teamoder[1]}} </p>
            <button @click="play('yes'),answer('correct',1)" class="correct" :disabled="padding">答對了！</button>
            <button @click="play('no'),answer('wrong',1)" class="wrong" :disabled="padding">答錯了！</button>
            <div class="point">Points:</div>
        </div>
        <div class="item team3" :class="{}">
            <p class="teamName">{{teamoder[2]}}</p>
            <button @click="play('yes'),answer('correct',2)" class="correct" :disabled="padding">答對了！</button>
            <button @click="play('no'),answer('wrong',2)" class="wrong" :disabled="padding">答錯了！</button>
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
      padding: true
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
      if (type === 'correct') {
        this.$store.commit('bingo', e)
      }
    }
  },
  created () {
    this.$bus.$on('noanswer', () => {
      if (this.gameMode) {
        let data = {}
        data.type = this.$store.state.picked
        data.team = this.teamoder[this.currentplayer]
        data.score = 0
        this.answerList.push(data)
      } else {
        let data = {}
        data.type = this.$store.state.picked
        data.score = 0
        data.team = ''
        this.answerList.push(data)
      }
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
      // this.$store.commit('checkout', this.answerList)
      this.$store.commit('nextRound')
      this.$bus.$emit('checkoutConfirm', true)
    })
    this.$bus.$on('startGame', () => {
      this.padding = false
    })
  },
  beforeDestroy () {
    this.$bus.$off('noanswer')
    this.$bus.$off('nextPlay')
    this.$bus.$off('gameEnd')
  }
}
</script>

<style lang="scss">
.teams.turn {
    width: 300vw;
    left: 0px;
    position: relative;
    transition: all 0.3s;
    margin: 10px auto;
    .item {
      min-height: 300px;
      margin: 10px;
        button {
            min-width: 140px;
        }
        .teamName {font-size: 1.6em; width: 50%;margin: 10px auto;padding: 6px;border-radius: 50px}
    }
}
.teams.turn.active {
           left: 0x;
        }
.teams.turn.active1 {
        left: -100vw;
    }
.teams.turn.active2 {
        left: -200vw;
}
.teams {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 20px auto;
    .item {
        background: #eee;
        width: 100vw;
        margin: 5px;
        min-height: 300px;
        position: relative;
        padding: 10px;
        color:#fff;
        font-weight: 600;
        button {
            padding: 10px;
            margin: 6px 10px;
            border: 0px;
            color: #fff;
            font-size: 1em;
            font-weight: 600;
            min-width: 70px;
            border-radius: 10px;
            background: #999;
            border: 2px solid #fff;
            &:disabled {background: #d2d2d2}
        }
        p { margin: 5px 0px}
        .correct {background: #036afb}
        .wrong { background: #fd3021}
        .teamName {font-size: 1.4em; width: 70%;margin: 10px auto;background:#eee;padding: 6px;border-radius: 20px}
    }
    .team1 {background:#f1899d;.teamName{background:#bf2142} }
    .team2 {background:#caefa5;.teamName{background: #55c30a}}
    .team3 {background:#bc86fb;.teamName{background: #7c15cc}}
}

</style>
