<template>
  <div class="profile-container">
    <button @click="toggleProfile" class="toggle-btn">
      {{ user ? "Hide Profile" : "Show Profile" }}
    </button>

    <div v-if="user" class="profile-card">
      <h2>User Profile</h2>
      <div class="profile-pic-container">
        <img :src="user.profilePic || defaultPic" alt="Profile Picture" class="profile-image" />
      </div>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.gmail }}</p>
      
      <div class="file-upload-container">
        <label class="file-label">
          <input type="file" @change="uploadProfilePic" hidden />
          Update Profile Picture
        </label>
      </div>
      
      <button @click="logout" class="logout-btn">Logout</button>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
      message: "",
      defaultPic: "https://via.placeholder.com/150",
    };
  },
  methods: {
    async toggleProfile() {
      if (this.user) {
        this.user = null;
      } else {
        try {
          const token = localStorage.getItem("token");
          if (!token) return console.error("No token found!");
          const res = await axios.get("http://localhost:3001/userdata", {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.user = {
            ...res.data,
            profilePic: res.data.profilePic?.startsWith("http")
              ? res.data.profilePic
              : `http://localhost:3001${res.data.profilePic}`,
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    async uploadProfilePic(event) {
      const file = event.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("profilePic", file);
      try {
        const token = localStorage.getItem("token");
        if (!token) return (this.message = "User not authenticated.");
        const response = await axios.post("http://localhost:3001/upload-profile", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: token },
        });
        this.user.profilePic = `http://localhost:3001${response.data.profilePic}`;
        this.message = "Profile picture updated successfully!";
      } catch (error) {
        console.error("Upload error:", error);
        this.message = "Failed to upload profile picture.";
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 30px auto;
}

.toggle-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

.profile-card {
  animation: fadeIn 0.5s ease-in-out;
}

.profile-pic-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
}

.file-upload-container {
  margin-top: 15px;
}

.file-label {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
}

.logout-btn {
  background-color: red;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.message {
  margin-top: 10px;
  font-size: 14px;
  color: green;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
