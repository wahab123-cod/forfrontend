<template>
  <div class="container">
    <h3>Contact Us</h3>
    
    <!-- Error Message Display -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Success Message Display -->
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <form @submit.prevent="Add">
      <input type="email" class="form-control mb-2" placeholder="Enter Your Email" v-model="Email" required>
      
      <textarea class="form-control mb-2" placeholder="Enter Your Message" v-model="Text" required></textarea>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? "Submitting..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { SubmitData } from "../middleware/api.js";
export default {
  data() {
    return {
      Email: "",
      Text: "",
      loading: false,
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async Add() {
      this.errorMessage = "";
      this.successMessage = "";
      this.loading = true;

      try {
        // Validate Fields
        if (!this.Email || !this.Text) {
          this.errorMessage = "All fields are required!";
          this.loading = false;
          return;
        }

        const data = {
          Email: this.Email,
          Text: this.Text
        };

        // API Call
        await SubmitData(data);
        this.successMessage = "Data submitted successfully!";
        
        // Clear form fields
        this.Email = "";
        this.Text = "";
      } catch (error) {
        console.error("Error submitting data:", error);
        
        if (error.response) {
          this.errorMessage = error.response.data.message || "Submission failed. Please try again.";
        } else if (error.request) {
          this.errorMessage = "No response from the server. Please check your internet connection.";
        } else {
          this.errorMessage = "An unexpected error occurred.";
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 20px auto;
}

.alert {
  padding: 10px;
  font-size: 14px;
  text-align: center;
}

.btn-primary {
  width: 100%;
}
</style>