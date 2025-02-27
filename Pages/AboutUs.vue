<template>
  <div>
    <h1> Hello about us  </h1>
   
    <h1>Counter: {{$store.state.count}}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <h1>  {{ $store.state.name }}  </h1>
    <button @click="updatename">update name</button>
    

    <h2>  For 3rd party api to check   </h2>
    <br>
    <button @click="fetchdata">  Fetch Data    </button>
    <ul v-if="userdata"> 
      <li> Name : {{ userdata.name?.first }} </li>
      <li> Picture: <img :src='userdata.picture.large' > </li>
     </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware :"auth",
  data() {
    return {
   
      userdata:null,
      loading:false
    };
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    },
    updatename() {
      this.$store.commit("changename")
    },
   

   async fetchdata() {
    this.loading= true
    try{
      const res =await axios.get("https://randomuser.me/api/?results=1")
          this.userdata  = res.data.results[0];
          console.log("the data is :",this.userdata)
    }
    catch{
      console.log("error while reciving data")
    }
    finally{this.loading = false}
    
  }
  }
   
  
};
</script>

<style scoped>
.btn {
  background-color: black;
  color: white;
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none; 
  cursor: pointer;
}

.btn:hover {
  background-color: darkgray;
}

</style>