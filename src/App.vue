<template>
<div>
  <NavBar></NavBar>
<router-view></router-view>
<MyFooter> </MyFooter>
</div>

</template>

<script>
import NavBar from '../Pages/NavBar.vue'
import MyFooter from '../Pages/MainFooter.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    MyFooter

  }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
