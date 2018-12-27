<template>
  <div class="home">
    <Question/>
    <StartGame/>
    <div @click="view = !view">setting</div>
    <Setting v-if="view"/>
    <PlayTeam v-if="this.$store.state.picked && this.$store.state.question"/>
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
export default {
  name: 'home',
  components: {
    Sound,
    Setting,
    Question,
    StartGame,
    PlayTeam
  },
  data () {
    return {
      view: false
    }
  },
  created () {
    this.$bus.$on('closeSetting', () => { this.view = false })
  }
}
</script>
