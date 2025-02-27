<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-10 col-lg-10"> <!-- ⬆️ Increased width -->
        <div class="card shadow-lg p-5"> 
          <h2 class="text-center mb-4">Login</h2> 
          <form @submit.prevent="login">
            <div class="mb-4">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" class="form-control form-control-lg" id="email" v-model="Gmail" required />
            </div>

            <div class="mb-4">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control form-control-lg" id="password" v-model="Password" required />
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary btn-lg w-100">Login</button> 
            </div>
            <p class="mt-3 text-center">
              Don't have an account? <router-link to="/signup">Sign Up</router-link>
            </p>
            <p class="mt-3 text-center">
              Forget Password? <router-link to="/forgetpass">Forget Password</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      Gmail: "",
      Password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const userdata = {
          Gmail: this.Gmail,
          Password: this.Password,
        };
        const res = await axios.post("http://localhost:3001/login", userdata);

        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token); 
          alert("Login successful!");
          this.$router.push("/dashboard"); 
        }
      } catch (err) {
        console.log("Error during login:", err);
        this.errorMessage = err.response?.data?.message || "Invalid email or password.";
      }
    },
  },
};
</script>

<style scoped>
/* ✅ Increased width for larger box */
.container {
  max-width: 650px; /* ⬆️ Bigger container */
  margin: 80px auto;
  margin-bottom: 80px auto;
};


/* ✅ Made card larger */
.card {
  border-radius: 15px;
  background-color: #f9f9f9;
  padding: 40px; /* ⬆️ Increased padding */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* ⬆️ Stronger shadow */
}

/* ✅ Increased title size */
h2 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #4c8f29;
  font-size: 2.5rem; /* ⬆️ Bigger text */
}

/* ✅ Enlarged form inputs */
.form-label {
  color: #555;
  font-weight: 600;
}

.form-control {
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 16px; /* ⬆️ More padding */
  font-size: 1.2rem; /* ⬆️ Bigger font */
}

.form-control:focus {
  border-color: #4c8f29;
  box-shadow: 0 0 8px rgba(76, 143, 41, 0.4);
}

/* ✅ Enlarged button */
.btn-primary {
  background-color: #4c8f29;
  border-color: #4c8f29;
  font-size: 1.4rem; /* ⬆️ Bigger font */
  font-weight: bold;
  padding: 14px; /* ⬆️ More padding */
}

.btn-primary:hover {
  background-color: #3b6b22;
  border-color: #3b6b22;
}

/* ✅ Improved responsiveness */
@media (max-width: 768px) {
  .container {
    max-width: 100%; /* ⬆️ Full width on mobile */
    padding: 20px;
  }

  .card {
    padding: 30px;
  }

  h2 {
    font-size: 2rem;
  }

  .form-control {
    padding: 14px;
  }

  .btn-lg {
    padding: 15px;
  }
}
</style>
