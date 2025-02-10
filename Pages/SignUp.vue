<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card shadow-sm p-4">
          <h3 class="text-center mb-4">Sign Up</h3>

          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">User Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="form.name"
                required
              />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="form.email"
                required
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="form.password"
                required
                @input="checkPasswordStrength"
              />
              <div v-if="passwordlengtherror" class="text-danger">
                Please Provide a Strong Password
              </div>
            </div>

            <div class="mb-3">
              <label for="confirmPassword" class="form-label"
                >Confirm Password</label
              >
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                v-model="form.confirmPassword"
                required
                :class="{ 'is-invalid': confirmPasswordError }"
              />
              <div class="invalid-feedback">Passwords do not match!</div>
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

    <div
      v-if="isModalVisible"
      class="modal fade show d-block"
      tabindex="-2"
      id="successModal"
      aria-labelledby="successModalLabel"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">
              Form Submitted Successfully
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Your form has been successfully submitted! Thank you for
            registering.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
          </div>
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      passwordlengtherror: false,
      confirmPasswordError: false,
      isModalVisible: false,
    };
  },
  methods: {
    submitForm() {
      const regix = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

      if (!regix.test(this.form.password)) {
        this.passwordlengtherror = true;
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.confirmPasswordError = true;
        return;
      }

      this.confirmPasswordError = false;
      this.passwordlengtherror = false;

      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.confirmPassword = "";

      this.isModalVisible = true;
    },

    checkPasswordStrength() {
      const regix = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      if (regix.test(this.form.password)) {
        this.passwordlengtherror = false;
      } else {
        this.passwordlengtherror = true;
      }
    },

    closeModal() {
      this.isModalVisible = false;
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
  font-family: "Arial", sans-serif;
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

.is-invalid {
  border-color: #e74c3c;
}

.invalid-feedback {
  color: #e74c3c;
}

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
.modal.show {
  display: block;
}

.modal-content {
  border-radius: 10px;
}
</style>
