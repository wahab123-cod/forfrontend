<template>
<div>
  
  <NavBar> </NavBar>
<router-view></router-view>

</div>

</template>

<script>
import NavBar from '../Pages/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar

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