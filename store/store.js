import { createStore } from 'vuex';

export default createStore({
  state: {
    count: 0,
    name:"wahab"
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
        if(state.count<1)
        {
            return
        }
        else
        {
            state.count -= 1;
        }
    
    },
    changename(state){
        {
     state.name = "ali hamza";
        } 
    }
  }
});

