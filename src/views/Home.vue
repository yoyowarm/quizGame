<template>
  <div class="home">
    <Question/>
    <StartGame/>
    <div @click="view = !view" class="set">❄</div>
    <Setting v-if="view"/>
    <PlayTeam v-if="this.$store.state.picked && this.$store.state.question"/>
    <gameCheckout v-if="this.$store.state.rounds.length > 0 && closeCheckout"/>
    <Sound/>
  </div>
</template>

<script>
// @ is an alias to /src
import Sound from '@/components/notice'
import Setting from '@/components/setting'
import Question from '@/components/question'
import StartGame from '@/components/startGame'
import PlayTeam from '@/components/playTeam'
import gameCheckout from '@/components/gameCheckout'
export default {
  name: 'home',
  components: {
    Sound,
    Setting,
    Question,
    StartGame,
    PlayTeam,
    gameCheckout
  },
  data () {
    return {
      view: false,
      closeCheckout: false
    }
  },
  created () {
    this.$bus.$on('closeSetting', () => { this.view = false })
    this.$bus.$on('checkoutConfirm', (type) => { this.closeCheckout = type })
  },
  beforeDestroy () {
    this.$bus.$off('closeSetting')
    this.$bus.$off('checkoutConfirm')
  }
}
</script>

<style lang="scss">

  .home {
    overflow: hidden;
    background: #e6e622;
    min-height: 100vh
  }
  .set {
    font-size: 2em;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #8a8a8a;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color:#fff;
    line-height: 37px;
    position: absolute;
    top: 90px;
    right: 10px
  }
</style>
