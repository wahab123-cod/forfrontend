<template>
  <div class="wrapper" :class="{ 'sidebar-active': sidebarOpen }">
    <!-- Sidebar -->
    <aside :class="{ 'sidebar-open': sidebarOpen }">
      <button class="close-btn" @click="toggleSidebar">&times;</button>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">🏠 Home</router-link>
        <router-link to="/aboutus" class="nav-link">📄 About Us</router-link>
        <router-link to="/dashboard" class="nav-link">📊 Dashboard</router-link>
        <router-link to="/mycontactus" class="nav-link">📊 Contact Us </router-link>
        <router-link to="/signup" class="nav-link">✍️ Sign Up</router-link>
      </div>

      <!-- Dropdown for login options -->
      <div class="dropdown">
        <button class="dropdown-btn" @click="toggleDropdown">🔑 Login Options</button>
        <div v-if="dropdownOpen" class="dropdown-content">
          <router-link to="/login">👤 User Login</router-link>
          <router-link to="/admin-login">🛠 Admin Login</router-link>
          <router-link to="/moderator-login">📝 Moderator Login</router-link>
          <router-link to="/guest-login">🎭 Guest Login</router-link>
        </div>
      </div>
    </aside>

    <!-- Navbar -->
    <nav class="navbar">
      <button class="menu-btn" @click="toggleSidebar">☰</button>
      <router-link to="/" class="navbar-brand">🌟 MyBrand</router-link>
      <form class="search-box">
        <input type="search" placeholder="Search..." />
        <button type="submit">🔍</button>
      </form>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false,
      dropdownOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
};
</script>

<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
}

/* Wrapper */
.wrapper {
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease-in-out;
}

.wrapper.sidebar-active {
  margin-left: 250px; /* Adjust content when sidebar opens */
}

/* Sidebar */
aside {
  position: fixed;
  left: -250px;
  top: 0;
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  color: white;
  padding: 20px;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000;
}

.sidebar-open {
  left: 0;
}

.nav-links {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.nav-link {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 12px;
  font-size: 16px;
  transition: 0.3s;
  border-radius: 5px;
  width: 100%;
}

.nav-link:hover {
  background: #34495e;
}

/* Dropdown */
.dropdown {
  width: 100%;
  margin-top: 15px;
}

.dropdown-btn {
  background: #34495e;
  color: white;
  width: 100%;
  padding: 12px;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  background: #2c3e50;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 5px;
}

.dropdown-content a {
  display: block;
  color: white;
  padding: 10px;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  margin-right: 50px;
}

.dropdown-content a:hover {
  background: #ecf0f1;
  color: #2c3e50;
}

/* Navbar */
.navbar {
  width: 100%;
  background: #ecf0f1;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-active .navbar {
  margin-left: 250px;
}

.menu-btn {
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
}

.navbar-brand {
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
}

/* Search Box */
.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.search-box input {
  border: none;
  padding: 8px;
  outline: none;
  width: 150px;
}

.search-box button {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.search-box button:hover {
  background: #1c2833;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .search-box input {
    width: 100px;
  }

  .navbar {
    justify-content: space-between;
  }
}
</style>