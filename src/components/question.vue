<template>
    <div class="question">
      <input type="text" class="keyin" placeholder="請輸入題目" v-model="question">
      <button @click="newAProblem">出題</button>
      <button @click="confirm">確認</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      question: '',
      questionBank: ['請答出以 “ㄧ” 為開頭的聖經人物', '請回答以 “ㄨ” 為開頭的聖經人物', '請回答以 “ㄏ” 為開頭的聖經人物', '請回答以 “ㄇ” 為開頭的聖經人物']
    }
  },
  methods: {
    newAProblem () {
      let sit = this.questionBank.length
      let question = this.questionBank[Math.floor(Math.random() * sit) + 1]
      this.question = question
    },
    confirm () {
      if (this.question) {
        this.$store.commit('question', this.question)
        this.question = ''
      }
    }
  }
}
</script>

<style lang="scss">
.question {
    background: #fff;
    text-align: left;
    width: 90%;
    margin: 25px auto;
    padding: 5px;
    display: flex;
    justify-content: left;
    border-radius: 6px;
    box-shadow: 0px 0px 15px #676767f5;
    .keyin {
        flex: 0 0 57%;
        height: 35px;
        font-size: 1em;
        border: 0px;
        padding: 8px;
        outline: none
    }
    button {
      flex: 0 0 17%;
      background: #10c9ef;
      color: #fff;
      margin: 4px;
      border: 0px;
      border-radius: 5px
    }
}
</style>
