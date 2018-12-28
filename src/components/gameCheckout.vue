<template>
    <div class="checkout">
        <div class="block">
            <h3>Winner:</h3>
            <div v-for="(rounds, index) of answerList" :key="index">
                <h4>{{rounds[0].question}}</h4>
                {{addUP}}
            </div>
            <button @click="cancel">cancel</button>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    answerList () {
      return this.$store.state.rounds
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
    }
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
        border-radius: 10px;
        box-shadow: 5px 5px 10px #333
    }
}
</style>
