<template>
  <div id="product-list-two">
    <h2>Product List Two</h2>
    <ul>
      <li v-for='item in products' :key="item.name">
        <span>{{item.name}}</span>
        <span class="money">${{item.money}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
#product-list-two{
  background-color: #d1e4ff;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
}
#product-list-two ul{
  padding: 0;
  list-style: none;
}
#product-list-two li{
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
  margin-right: 10px;
}
.money{
  font-weight: bold;
  color: blue;
}
</style>
