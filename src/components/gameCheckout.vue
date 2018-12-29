<template>
    <div class="checkout">
        <div class="block">
            <div v-if="!this.$store.state.gameover">
              <h3>回合結束，積分結算！</h3>
              <p class="Prefix">本回合優勝</p>
              <h4 v-if="!repeat"><span class="start">★</span>{{this.$store.state.oder[winner.winner]}} <span class="subtitle">答對 {{Roundsettlement[`team${winner.winner+1}`]}} 題</span></h4>
              <h4 v-else>兩隊以上相同</h4>
              <div v-for="(item, index) of this.$store.state.oder" :key="index" class="itemline">
                <p>{{item}} 答對 {{Roundsettlement[`team${index+1}`]}} 題</p>
                <div class="progress">
                  <p class="scorebar" :style="{width:winner.scoure[index]* 100 + '%' }"></p>
                  <p class="progressbar"></p>
                </div>
              </div>
            </div>
            <div v-else>
              <h3>遊戲結束，積分結算！</h3>

              <p class="Prefix">各組得分</p>
              <h4><span class="start">★</span>{{this.$store.state.oder[0]}} 積分：{{finalWinner.scoure[0]}}</h4>
              <h4><span class="start">★</span>{{this.$store.state.oder[1]}} 積分：{{finalWinner.scoure[1]}}</h4>
              <h4><span class="start">★</span>{{this.$store.state.oder[2]}} 積分：{{finalWinner.scoure[2]}}</h4>
              <p class="Prefix">勝利隊伍</p>
              <h4>{{finnal}}</h4>
            </div>
            <button class="cancel" @click="cancel">確認</button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      repeat: false,
    }
  },
  computed: {
    Roundsettlement () {
      return this.$store.state.rounds[this.$store.state.rounds.length -1]
    },
    Allrounds () {
      return this.$store.state.rounds
    },
    finalWinner () {
      let counts = {team1:0,team2:0,team3:0}
      for (let i of this.Allrounds) {
        console.log(i)
        counts.team1 += i.team1
        counts.team2 += i.team2
        counts.team3 +=  i.team3
      }
      let scoure  = []
      Object.keys(counts).forEach(i =>{scoure.push(counts[i])})
      let max = Math.max(...scoure)
      let winner = scoure.indexOf(max)
      // Object.keys(counts).forEach(i=>{ console.log('finalWinner',counts[i]>1);(counts[i]>1)?this.repeat = true : ''})
      return {winner:winner,scoure:scoure}
    },
    finnal () {
      if (this.finalWinner.scoure[0] === this.finalWinner.scoure[1] ||this.finalWinner.scoure[1] === this.finalWinner.scoure[2]||
      this.finalWinner.scoure[2] === this.finalWinner.scoure[0]){
        return '有兩組以上積分相同'
      }else { return this.$store.state.oder[this.finalWinner.winner]}
    },
    winner () {
      let total = this.Roundsettlement.team1 + this.Roundsettlement.team2 + this.Roundsettlement.team3
      let team1 = this.Roundsettlement.team1/total
      let team2 = this.Roundsettlement.team2/total
      let team3 = this.Roundsettlement.team3/total
      let scoure = [Number(team1), Number(team2), Number(team3)]
      let max = Math.max(...scoure)
      let winner = scoure.indexOf(max)
      let counts = {}
      scoure.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
      Object.keys(counts).forEach(i=>{ console.log(counts[i]>1);(counts[i]>1)?this.repeat = true : ''})
      return {winner:winner,scoure:scoure}
    },
    addUP () {
      let scores = []
      for (let rounds of this.answerList) {
        for (let item of rounds) {
          if (scores[0].team) {
            scores[item.team].score += Number(item.score)
          } else { scores.push(item) }
        }
      }
      console.log(scores)
      return scores
    }
  },
  methods: {
    cancel () {
      this.$bus.$emit('checkoutConfirm', false)
      this.repeat = false
    }
  },
  created () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss">
.checkout {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    .block {
        width: 80%;
        height: 80vh;
        overflow:auto;
        background: #fff;
        margin: 0px auto;
        padding:20px;
        box-sizing: border-box;
        box-shadow: 5px 5px 10px #333;
        text-align: left;
        position: relative;
        .Prefix {
          font-size: 0.8em;
          font-weight: 400
        }
        .subtitle {font-size: 0.8em;color: #666;margin:0px 15px}
        p { margin-bottom: 3px}
        h4 {
          margin-top: 10px;
          font-size: 1.6em
        }
        .start {color: #ffcf00; margin-right: 9px;font-size: 0.8em}
        .itemline {
          padding: 8px;
          p {margin: 8px 0px}
          .progress {
            position: relative;
            .progressbar {
            width: 100%;
            height: 5px;
            background: #ddd;
            border-radius: 10px
          }
          .scorebar {
            height: 5px;
            background: #ffcf00;
            border-radius: 10px;
            position: absolute;
            top: -8px;
            left: 0px;
          }
          }
        }
        .cancel {
          background: #a7a7a7;
          border: 0px;
          width: 90%;
          height: 30px;
          border-radius: 6px;
          margin-left: 5%;
          position: absolute;
          bottom: 20px;
          left: 0px;
          right: 0px;
          cursor: pointer;
        }
    }
}
</style>
