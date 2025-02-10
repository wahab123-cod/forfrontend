import {
    createRouter,
    createWebHistory
}
from "vue-router";
import MyHome from '../Pages/MyHome.vue'
import ContactUs from "../Pages/ContactUs.vue";
import AboutUs from "../Pages/AboutUs.vue";
import SignUp from "../Pages/SignUp.vue";
import Login from "../Pages/MyLogin.vue";
const routes = [
{
    path:"/",
    component: MyHome
},
{
    path:"/aboutus",
    component: AboutUs
},
{
    path:"/contactus",
    component: ContactUs
},
{
    path:"/signup",
    component: SignUp
},
{
    path:"/login",
    component: Login
},


]
const router = createRouter({
    history:createWebHistory(),
    routes:routes
});
export default router