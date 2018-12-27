<template>
    <div>
        <div class="no">
            <audio ref="no01" controls>
                <source src="../assets/sound/no/01.wav">
            </audio>
            <audio ref="no02" controls>
                <source src="../assets/sound/no/02.wav">
            </audio>
            <audio ref="no03" controls>
                <source src="../assets/sound/no/03.wav">
            </audio>
            <audio ref="no04" controls>
                <source src="../assets/sound/no/04.wav">
            </audio>
            <audio ref="no05" controls>
                <source src="../assets/sound/no/05.wav">
            </audio>
            <audio ref="no06" controls>
                <source src="../assets/sound/no/06.wav">
            </audio>
        </div>
        <div class="yes">
            <audio ref="yes01" controls>
                <source src="../assets/sound/yes/01.wav">
            </audio>
            <audio ref="yes02" controls>
                <source src="../assets/sound/yes/02.wav">
            </audio>
            <audio ref="yes03" controls>
                <source src="../assets/sound/yes/03.wav">
            </audio>
            <audio ref="yes04" controls>
                <source src="../assets/sound/yes/04.wav">
            </audio>
            <audio ref="yes05" controls>
                <source src="../assets/sound/yes/05.wav">
            </audio>
            <audio ref="yes06" controls>
                <source src="../assets/sound/yes/06.wav">
            </audio>
            <audio ref="yes07" controls>
                <source src="../assets/sound/yes/07.wav">
            </audio>
            <audio ref="yes08" controls>
                <source src="../assets/sound/yes/08.wav">
            </audio>
        </div>
        <div class="gamesound">
            <audio ref="deda" controls>
                <source src="../assets/sound/398275__flashtrauma__clock-tick.wav">
            </audio>
            <audio ref="timeup" controls>
                <source src="../assets/sound/332073__meisterleise__telephone-ring-old-german-w48.mp3">
            </audio>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    play (type) {
      switch (type) {
        case 'no' :
          this.$refs[`no0${Math.floor(Math.random() * 6) + 1}`].play()
          break
        case 'yes' :
          this.$refs[`yes0${Math.floor(Math.random() * 8) + 1}`].play()
          break
        case 'deda' :
          this.$refs.deda.play()
          break
        case 'timeup' :
          this.$refs.timeup.play()
          break
      }
    }
  },
  created () {
    this.$bus.$on('yes', (type) => {
      this.play(type)
    })
    this.$bus.$on('stop', () => {
      let playPromise = this.$refs.deda.play()
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          this.$refs.deda.pause()
          this.$refs.deda.currentTime = 0
        })
      }
    })
  }
}
</script>

<style>
.no,.yes,.gamesound {
    display: none;
}
</style>
