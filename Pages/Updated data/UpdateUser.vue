<template>
    <div class="container mt-5">
      <h2 class="text-center text-primary">Update Username </h2>
      
      <div class="card p-4 shadow">
        <form @submit.prevent="updateUsername">
          <div class="mb-3">
            <label class="form-label">Email:</label>
            <input type="email" v-model="Gmail" class="form-control" placeholder="Enter your email" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">New Username:</label>
            <input type="text" v-model="Username" class="form-control" placeholder="Enter new username" required />
          </div>
  
          <button type="submit" class="btn btn-primary w-100">Update Username</button>
        </form>
  
        <!-- Success / Error Messages -->
        <p v-if="message" class="alert mt-3" :class="messageType">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        Gmail: "",
        Username: "",
        message: "",
        messageType: "",
      };
    },
    methods: {
      async updateUsername() {
        try {
          const res = await axios.put("http://localhost:3001/updatename", {
            Gmail: this.Gmail,
            Username: this.Username,
          });
  
          this.message = res.data.message;
          this.messageType = "alert-success"; // Green alert for success
        } catch (error) {
          this.message = error.response?.data?.message || "Error updating username";
          this.messageType = "alert-danger"; // Red alert for errors
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
  }
  
  .alert {
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
  
  .alert-success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .alert-danger {
    background-color: #f8d7da;
    color: #721c24;
  }
  </style>



