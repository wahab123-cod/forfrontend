<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <div class="card shadow-sm p-4">
            <h3 class="text-center mb-4">Login</h3>
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="form.email" required />
              </div>
  
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="form.password" required />
              </div>
  
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary btn-lg">Login</button>
              </div>
              
              <p class="mt-3 text-center">
                Don't have an account? <router-link to="/signup">Sign Up </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      submitForm() {
        // You can handle login logic here (for example, send the form data to your backend)
        if (this.form.email && this.form.password) {
          alert('Login successful!');
        } else {
          alert('Please fill in both fields!');
        }
      },
    },
  };
</script>

<style scoped>
  /* Main Container */
  .container {
    max-width: 650px;
    margin-bottom: 40px;
  }
  
  /* Card Styling */
  .card {
    border-radius: 15px;
    background-color: #f9f9f9;
  }
  
  /* Title Style */
  h3 {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    color: #4c8f29;
  }
  
  /* Form Inputs */
  .form-label {
    color: #555;
    font-weight: 600;
  }
  
  .form-control {
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  .form-control:focus {
    border-color: #4c8f29;
    box-shadow: 0 0 0 0.2rem rgba(76, 143, 41, 0.25);
  }
  
  /* Submit Button */
  .btn-primary {
    background-color: #4c8f29;
    border-color: #4c8f29;
    font-size: 1.1rem;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .btn-primary:hover {
    background-color: #3b6b22;
    border-color: #3b6b22;
  }
  
  /* Mobile Responsiveness */
  @media (max-width: 576px) {
    .card {
      padding: 20px;
    }
  
    h3 {
      font-size: 1.5rem;
    }
  
    .form-control {
      padding: 15px;
    }
  
    .btn-lg {
      padding: 15px;
    }
  }
  </style>