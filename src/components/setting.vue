<template>
    <div class="setting">
      <div class="block">
        <p class="close" @click="close">X</p>
        <ul>
            <li><h3>遊戲設定</h3></li>
            <li> <span class="label"> 總秒數: </span><input v-model="total" type="text"></li>
            <li><span class="label">每回秒數:</span> <input v-model="each" type="text"></li>
            <li><span class="label">遊戲方式:</span>
                <div>
                <input type="radio" id="turn" name="drone" value="turn" v-model="picked">
                <label for="turn">輪流回答</label>
                </div>

                <div>
                <input type="radio" id="Grab" name="drone" value="Grab" v-model="picked">
                <label for="Grab">搶答</label>
                </div>
            </li>
            <li><span class="label">第一位:</span> <input type="text" v-model="oder[0]"></li>
            <li><span class="label">第二位:</span> <input type="text" v-model="oder[1]"></li>
            <li><span class="label">第三位:</span> <input type="text" v-model="oder[2]"></li>
            <li><button @click="confirm">確認</button></li>
            <li><button @click="init">重新設定</button></li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      total: 120,
      each: 15,
      picked: '',
      oder: ['team1', 'team2', 'team3']
    }
  },
  methods: {
    confirm () {
      let data = {}
      data.total = this.total
      data.each = this.each
      data.picked = this.picked
      data.oder = this.oder
      this.$store.commit('setting', data)
      this.$bus.$emit('closeSetting')
      this.$bus.$emit('yes', 'all')
    },
    init () {
      this.$store.commit('init')
      this.$bus.$emit('closeSetting')
    },
    close () {
      this.$bus.$emit('closeSetting')
    }
  }
}
</script>
<style lang="scss">
.setting {
  background: rgba(0,0,0,0.6);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  text-align: left;
  ul {
    padding-left: 0px;
    margin: 0px
  }
  li {
    margin: 15px auto;
    display: flex;
  }
  .block {
    width: 80%;
    height: 75vh;
    background: #fff;
    border: 0px;
    border-radius: 7px;
    padding: 20px;
    margin: 0px auto;
    position: relative;
    box-sizing: border-box;
    .label {
      flex: 0 0 30%
    }
    h3 {
      margin: 5px auto;
      text-align: center
    }
    input[type="text"]{
      background: #ddd;
      border: 0px;
      border-radius: 6px;
      padding: 5px;
      font-size: 1.2em;
      width: 160px;
      flex: 0 0 65%
    }
    .close {
      text-align: center;
      font-size: 1.3em;
      color: #fff;
      width: 30px;
      height: 30px;
      line-height: 33px;
      border-radius: 50%;
      background: #888;
      position: absolute;
      top: -30px;
      right: -6px;
      cursor: pointer;
    }
  }
}
</style>
