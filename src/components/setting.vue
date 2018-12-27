<template>
    <div>
        <ul>
            <li>total: <input v-model="total" type="text"></li>
            <li>each: <input v-model="each" type="text"></li>
            <li>answer:
                <div>
                <input type="radio" id="turn" name="drone" value="turn" v-model="picked">
                <label for="turn">turn</label>
                </div>

                <div>
                <input type="radio" id="Grab" name="drone" value="Grab" v-model="picked">
                <label for="Grab">Grab</label>
                </div>
            </li>
            <li><button @click="confirm">confirm</button></li>
            <li><button @click="init">init</button></li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      total: 120,
      each: 15,
      picked: ''
    }
  },
  methods: {
    confirm () {
      let data = {}
      data.total = this.total
      data.each = this.each
      data.picked = this.picked
      this.$store.commit('setting', data)
    },
    init () {
      this.$store.commit('init')
    }
  }
}
</script>
<style>
</style>
