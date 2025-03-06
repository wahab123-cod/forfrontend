<template>
  <div class="dashboard-container">
 

    <main class="content">
      <h1>Welcome to Dashboard</h1>
      <button @click="toggleProfile">
        {{ user ? "Hide Profile" : "Show Profile" }}
      </button>
      <MyProfile v-if="user" :user="user" @logout="logout" />
    </main>
  </div>
</template>
<script>
import MyProfile from "./MyProfile.vue";
import axios from "axios";
export default {
  components: { MyProfile },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async toggleProfile() {
      if (this.user) {
        this.user = null;
      } else {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found!");
            return;
          }

          const res = await axios.get("http://localhost:3001/userdata", {
            headers: { Authorization: `Bearer ${token}` },
          });

          this.user = res.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  padding: 20px;
  color: white;
}

.sidebar h2 {
  font-size: 22px;
  margin-bottom: 15px;
}

.sidebar a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
}

.sidebar a:hover {
  background: #1a252f;
}

.content {
  flex: 1;
  padding: 20px;
  text-align: center;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: #ffcc00;
  color: black;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #ff9900;
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    text-align: center;
  }
  .sidebar a {
    display: inline-block;
    margin: 5px;
  }
}

</style>