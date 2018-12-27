<template>
  <div class="home">
    <Question/>
    <StartGame/>
    <button @click="play('yes')">yes</button>
    <button @click="play('no')">wrong</button>
    <div @click="view = !view">setting</div>
    <Setting v-if="view"/>
    <Sound/>
  </div>
</template>

<script>
// @ is an alias to /src
import Sound from '@/components/notice'
import Setting from '@/components/setting'
import Question from '@/components/question'
import StartGame from '@/components/startGame'
export default {
  name: 'home',
  components: {
    Sound,
    Setting,
    Question,
    StartGame
  },
  data () {
    return {
      view: false
    }
  },
  methods: {
    play (type) {
      this.$bus.$emit('yes', type)
    }
  }
}
</script>
