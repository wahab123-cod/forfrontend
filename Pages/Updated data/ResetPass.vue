<template>
    <div class="container">
      <div class="form-box">
        <h2>Reset Password</h2>
        <input v-model="newPassword" type="password" placeholder="Enter new password" />
        <button @click="resetPassword">Reset Password</button>
        <p v-if="message" :class="messageClass">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        newPassword: "",
        token: "", // Initialized as empty
        message: "",
        messageClass: "",
      };
    },
    created() {
      this.token = this.$route.params.token; // Now correctly set
    },
    methods: {
      async resetPassword() {
        try {
          const response = await axios.post("http://localhost:3001/reset-password", {
            token: this.token,
            newPassword: this.newPassword,
        
          });
          this.newPassword = ""
          this.message = response.data.message;
          this.messageClass = "success";
        } catch (error) {
          this.message =  (error.response?.data?.message || "Server error");
          this.messageClass = "error";
          this.newPassword = ""
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Centering the form */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh; /* Full height */
    background: linear-gradient(135deg, #1e3c72, #2a5298);
 
  }
  
  /* Form styling */
  .form-box {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    max-width: 400px;
    transition: all 0.3s ease-in-out;
  }
  
  /* Heading */
  h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 24px;
  }
  
  /* Input field */
  input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border 0.3s;
  }
  
  input:focus {
    border-color: #1e3c72;
  }
  
  /* Button styling */
  button {
    width: 100%;
    padding: 12px;
    background: #1e3c72;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  
  button:hover {
    background: #163054;
  }
  
  /* Message styling */
  .success {
    color: green;
    font-weight: bold;
    background-color: #d4edda;
    padding: 10px;
    border-radius: 8px;
    margin-top: 15px;
  }
  
  .error {
    color: red;
    font-weight: bold;
    background-color: #f8d7da;
    padding: 10px;
    border-radius: 8px;
    margin-top: 15px;
  }
  
  /* Responsive Design */
  @media (max-width: 500px) {
    .form-box {
      width: 90%;
      padding: 20px;
    }
  
    h2 {
      font-size: 22px;
    }
  
    input, button {
      font-size: 14px;
    }
  }
  </style>
  