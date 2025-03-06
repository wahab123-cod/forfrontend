<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card shadow-sm p-4">
          <h3 class="text-center mb-4">Sign Up</h3>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="Username" class="form-label">User Name</label>
              <input
                type="text"
                class="form-control"
                id="Username"
                v-model="Username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="Gmail" class="form-label">Email Address</label>
              <input
                type="email"
                class="form-control"
                id="Gmail"
                v-model="Gmail"
                required
              />
            </div>
            <div class="mb-3">
              <label for="phoneno" class="form-label">Phone Number</label>
              <input
                type="tel"
                class="form-control"
                id="phoneno"
                v-model="phoneno"
                required
              />
            </div>
            <div class="mb-3">
              <label for="Password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="Password"
                v-model="Password"
                required
              />
            </div>
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary btn-lg">
                Sign Up
              </button>
            </div>
            <p class="mt-3 text-center">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="isModalVisible" class="modal show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered text-success">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registration Successful</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Your account has been created successfully!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { registerUser } from '../middleware/api.js';
export default {
  data() {
    return {
      Username: '',
      Gmail: '',
      Password: '',
      phoneno: '',
      isModalVisible: false,
      errorMessage: '', // To display error messages
    };
  },
  methods: {
    async submitForm() {
      try {
        const userdata = {
          Username: this.Username,
          Gmail: this.Gmail,
          Password: this.Password,
          phoneno: this.phoneno,
        };

        const response = await registerUser(userdata);
        console.log('Response Data:', response.data);

      
        this.isModalVisible = true;

     
        this.Username = '';
        this.Gmail = '';
        this.Password = '';
        this.phoneno = '';

       
    /*     setTimeout(() => {
          this.$router.push('/login');
        }, 2000); */
      } catch (error) {
        console.error('Error occurred while sending data to DB:', error);

  
        if (error.response) {
         
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
     
          this.errorMessage = 'No response from the server. Please try again later.';
        } else {
          
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin-bottom: 40px;
}

.card {
  border-radius: 15px;
  background-color: #f9f9f9;
}

h3 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #4c8f29;
}

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

.modal.show {
  display: block;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal-content {
  border-radius: 10px;
  background-color: white;
}
</style>