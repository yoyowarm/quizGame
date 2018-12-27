<template>
    <div class="teams">
        <div class="item">
            <p>{{teamoder[0]}} </p>
            <button @click="play('yes'),answer('correct',0)" class="correct">yes</button>
            <button @click="play('no'),answer('wrong',0)" class="wrong">wrong</button>
            <div class="point">Points:</div>
        </div>
        <div class="item">
            <p>{{teamoder[1]}} </p>
            <button @click="play('yes'),answer('correct',1)" class="correct">yes</button>
            <button @click="play('no'),answer('wrong',0)" class="wrong">wrong</button>
            <div class="point">Points:</div>
        </div>
        <div class="item">
            <p>{{teamoder[2]}} </p>
            <button @click="play('yes'),answer('correct',2)" class="correct">yes</button>
            <button @click="play('no'),answer('wrong',0)" class="wrong">wrong</button>
            <div class="point">Points:</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      answerList: [],
      currentplayer: 0
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
      if (this.gameMode) {
        let data = {}
        data.team = this.teamoder[e]
        data.score = (type === 'correct') ? 1 : 0
        this.answerList.push(data)
        console.log(this.answerList)
      }
    }
  },
  created () {
    this.$bus.$on('noanswer', () => {
      if (this.gameMode) {
        let data = {}
        data.team = this.teamoder[this.currentplayer]
        data.score = 0
        this.answerList.push(data)
        console.log(this.answerList)
      }
    })
    this.$bus.$on('nextPlay', () => {
      this.currentplayer = this.currentplayer + 1
      if (this.currentplayer > 2) { this.currentplayer = 0 }
    })
  }
}
</script>

<style lang="scss">
.teams {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
        background: #eee;
        width: 100%;
        margin: 5px;
        button {
            padding: 10px;
            margin: 10px 10px;
            border: 0px;
            color: #fff;
            font-size: 1em;
            min-width: 140px;
            border-radius: 10px;
            background: #999;
        }
        p { margin: 5px 0px}
        // .correct {background: #20bb26}
        // .wrong { background: #fd3021}
    }
}
</style>
