<template>
  <div class="container">
    <h3>Contact List</h3>

    <!-- Error Message Display -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Data Display -->
    <ul v-if="contacts.length > 0" class="list-group">
      <li v-for="(contact, index) in contacts" :key="index" class="list-group-item">
        <strong>Email:</strong> {{ contact.Email }} <br>
        <strong>Message:</strong> {{ contact.Text }}
      </li>
    </ul>

    <p v-else class="text-muted">No contacts available.</p>
  </div>
</template>

<script>
import { Getcontact } from "../middleware/api.js";
export default {
  data() {
    return {
      contacts: [],
      errorMessage: ""
    };
  },
  async mounted() {
    await this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      this.errorMessage = ""; // Reset error message before fetching

      try {
        const res = await Getcontact();
        console.log("Response received:", res);

        if (res.data && Array.isArray(res.data)) {
          this.contacts = res.data; // Store data
        } else {
          this.errorMessage = "Unexpected response format.";
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response) {
          this.errorMessage = error.response.data.message || "Failed to fetch contact data.";
        } else if (error.request) {
          this.errorMessage = "No response from the server. Please check your internet connection.";
        } else {
          this.errorMessage = "An unexpected error occurred.";
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
}

.alert {
  padding: 10px;
  font-size: 14px;
  text-align: center;
}

.list-group-item {
  margin-bottom: 5px;
  background-color: #f9f9f9;
  border-radius: 5px;
}
</style>