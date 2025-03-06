import {
    createRouter,
    createWebHistory
}
from "vue-router";
import authMiddleware from '../middleware/auth'
import MyHome from '../Pages/MyHome.vue'
import dashboard from "../Pages/ContactUs.vue";
import SignUp from "../Pages/SignUp.vue";
import Login from "../Pages/MyLogin.vue";
import AboutUs from "../Pages/AboutUs.vue";
import MyAdmin from "../Pages/MyAdmin.vue";
import adminMiddleware from '../middleware/admin'
import UpdateUser from "../Pages/Updated data/UpdateUser.vue";
import ForgetPass from "../Pages/Updated data/ForgetPass.vue";
import ResetPass from "../Pages/Updated data/ResetPass.vue";
import ProPic from "../Pages/ProPic.vue";
import MyAdminLogin from "../Pages/MyAdminLogin.vue";
import MyContactUs from "../Pages/MyContactUs.vue";
import See from "../Pages/See.vue";

const routes = [
{
    path:"/",
    component: MyHome
},
{
    path:"/myadminlogin",
    component: MyAdminLogin
},
{
    path:"/see",
    component: See
},
{
    path:"/mycontactus",
    component: MyContactUs
},
{
    path:"/forgetpass",
    component: ForgetPass
},
{
    path:"/resetpass/:token",
    component: ResetPass
},
{
    path:"/aboutus",
    component: AboutUs,

},{
    path:"/myadmin",
    component: MyAdmin,
  
 
},
{
    path:"/propic",
    component: ProPic,
  
 
},
{
    path:"/updateuser",
    component: UpdateUser,
  
 
},

{
    path:"/dashboard",
    component: dashboard,
    beforeEnter: authMiddleware,
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