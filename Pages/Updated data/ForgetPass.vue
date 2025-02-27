<template>
    <div class="container">
      <div class="form-box">
        <h2>Forgot Password</h2>
        <input v-model="email" type="email" placeholder="Enter your email" />
        <button @click="sendResetLink">Reset</button>
        <p v-if="message" :class="messageClass">{{ message }}</p> <!-- Apply dynamic class -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        message: "",
        messageClass: "", // Class for success/error message
      };
    },
    methods: {
      async sendResetLink() {
        try {
          const response = await axios.post("http://localhost:3001/forgot-password", { Gmail: this.email });
          this.message = response.data.message;
          this.messageClass = "success"; // ✅ Set class to success
          this.email=""
        } catch (error) {
          this.message = "Error: " + (error.response?.data?.message || "Server error");
          this.messageClass = "error"; // ✅ Set class to error
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
    height: 50vh;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    margin-bottom: 20px;
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
    margin-top: 15px;
    font-size: 14px;
    color: green;
    font-weight: bold;
  }
  
  .error {
    margin-top: 15px;
    font-size: 14px;
    color: red;
    font-weight: bold;
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
  