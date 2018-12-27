<template>
    <div class="teams">
        <button @click="play('yes')">yes</button>
        <button @click="play('no')">wrong</button>
    </div>
</template>

<script>
export default {
  methods: {
    play (type) {
      this.$bus.$emit('yes', type)
    }
  }
}
</script>

<style lang="scss">
.teams {}
</style>
