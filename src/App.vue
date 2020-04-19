<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ProductList />

    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import ShoppingCart from './components/ShoppingCart.vue'
import ProductList from './components/ProductList.vue'
export default {
  name: 'app',
  components: {
      ProductList,
      ShoppingCart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
