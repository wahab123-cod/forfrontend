<template>
    <form>
      <h1>hello Contact us</h1>
      <input type="text" placeholder="Name" v-model="text" /> <br />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click.prevent="add">Click me</button>
    </form>
  </template>
  
  <script>
export default {
    name: "ContactUs",
    data() {
      return {
        text: null,
        password: null,
      };
    },
    methods: {
      add() {
        
        alert("The data is: " + this.text + ", " + this.password);
         console.log("The data is", this.text, this.password);
      },
    },
  };
</script>

