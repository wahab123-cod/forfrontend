/* export default function (to, from, next) {
     console.log("Middleware called successfully!");
   
    
     const isAuthenticated = false; 
     if (!isAuthenticated) {
       console.log("User not authenticated, redirecting...");
       next('/login'); 
     } else {
       next(); 
     }
   }
    */

/*    export default function (to, from, next) {
     console.log("Middleware called successfully!");
 
     const token = localStorage.getItem("token"); 
 
     if (!token) {
         console.log("No token found, redirecting to login...");
         return next("/login"); 
     }
 
     console.log("Token exists, allowing access...");
     next(); 
 }  */




     //all resolve in this method
import axios from "axios";

export default async function (to, from, next) {
  console.log("Middleware called successfully!");

  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "null" || token.trim() === "") {
      console.log("No valid token found, redirecting to login...");
      localStorage.removeItem("token"); 
      return next("/login");
  }

  try {
  
      const response = await axios.get("http://localhost:3001/userdata", {
          headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
          console.log("Token is valid, allowing access...");
          return next();
      }
  } catch (error) {
      console.log("Token is invalid or session expired, redirecting to login...");
      localStorage.removeItem("token");
      return next("/login");
  }
}
 

  
 