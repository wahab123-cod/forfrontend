<template>
    <div class="container">
      <h2>User Profile</h2>
  
      <div v-if="profilePic">
        <img :src="profilePic" alt="Profile Picture" class="profile-image" />
      </div>
  
      <input type="file" @change="onFileChange" />
      <button @click="uploadProfilePic">Upload Profile Picture</button>
  
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
export default {
    data() {
      return {
        selectedFile: null,
        profilePic: null,
        message: "",
      };
    },
  
    mounted() {
      this.fetchUserProfile();
    },
  
    methods: {
      onFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
  
      async uploadProfilePic() {
        if (!this.selectedFile) {
          this.message = "Please select a file.";
          return;
        }
  
        const formData = new FormData();
        formData.append("profilePic", this.selectedFile);
  
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            this.message = "User not authenticated.";
            return;
          }
  
          const response = await axios.post("http://localhost:3001/upload-profile", formData, {
            headers: { 
              "Content-Type": "multipart/form-data",
              "Authorization": token 
            }
          });
  
          this.profilePic = response.data.profilePic;
          this.message = "Profile picture uploaded successfully!";
        } catch (error) {
          console.error("Upload error:", error);
          this.message = "Failed to upload profile picture.";
        }
      },
  
      async fetchUserProfile() {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            this.message = "User not authenticated.";
            return;
          }
  
          const response = await axios.get("http://localhost:3001/profile", {
            headers: { "Authorization": token }
          });
  
          this.profilePic = response.data.profilePic;
        } catch (error) {
          console.error("Profile fetch error:", error);
          this.message = "Failed to load profile.";
        }
      }
    }
  };
</script>

<style>
  .container { text-align: center; margin-top: 20px; }
  .profile-image { width: 150px; height: 150px; border-radius: 50%; margin-bottom: 10px; }
  </style>