import { createApp } from 'vue';
import App from './App.vue';
import store from '../store/store';  // Correc store path
import "@fortawesome/fontawesome-free/css/all.min.css";

import Router from '../Router/Router';

const app = createApp(App);
app.use(Router);
app.use(store);  
app.mount('#app');
