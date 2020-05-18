<template>
  <div id="product-list-one">
    <h2>Product List One</h2>
    <ul>
      <li v-for='item in salesProducts' :key="item.name">
        <span>{{item.name}}   </span>
        <span class="money">${{item.money}}</span>
      </li>
    </ul>
    <input v-model="money">
    <button @click="reduceProduct(money)">商品打折</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      money: 1
    }
  },
  methods: {
    reduceProduct (money) {
      // return this.$store.commit('reduceProduct')
      return this.$store.dispatch('reduceProductByAction', money)
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    salesProducts () {
      return this.$store.getters.salesProduct
    }
  }
}
</script>

<style scoped>
#product-list-one{
  background-color: #fff8b1;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
}
#product-list-one ul{
  padding: 0;
}
#product-list-one li{
  display: inline-block;
  margin-right: 30px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
}
.money{
  font-weight: bold;
  color: #E8800C;
}
</style>
