<template>
  <div
    class="container-fluid d-flex align-items-center justify-content-center bg-light mt-5 mb-5"
  >
    <div class="card shadow-lg p-4 w-100" style="max-width: 900px">
      <h1 class="text-center text-primary mb-4">
        Hello Admin, Here is All Data
      </h1>

      <div v-if="showSearch" class="mb-3">
        <input
          type="text"
          v-model="searchQuery"
          @input="resetPagination"
          placeholder="Search by name..."
          class="form-control"
        />
        <div class="d-flex justify-content-end mt-3">
          <button class="btn btn-primary" @click="isSignupModalVisible = true">
            Add User
          </button>
          <button class="btn btn-primary" @click="fetchContacts">
  See ALL Messages
</button>


        </div>
      </div>

      <!-- Signup Modal -->
      <div v-if="isSignupModalVisible" class="modal show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Sign Up User</h5>
              <button
                type="button"
                class="btn-close"
                @click="isSignupModalVisible = false"
              ></button>
            </div>
            <div class="modal-body">
              <SignUp />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isSignupModalVisible"
        class="modal-backdrop fade show"
        @click="isSignupModalVisible = false"
      ></div>

      <div class="table-responsive">
        <table
          v-if="paginatedData.length"
          class="table table-striped table-bordered text-center"
        >
          <thead class="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th> Profile Picture   </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in paginatedData" :key="user._id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ user.Username }}</td>
              <td>{{ user.phoneno }}</td>
              <td>{{ user.Gmail }}</td>
             <td>  
             <img :src="user.profilePic ? `http://localhost:3001${user.profilePic}` : defaultPic" alt="Profile Picture" />
            </td>
              <td>
                <button
                  class="btn btn-warning btn-sm me-2"
                  @click="openUpdateModal(user)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="confirmDelete(user._id)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          v-if="showSearch && !filteredData.length"
          class="text-center text-muted"
        >
          No matching users found.
        </p>
      </div>

      <div class="d-flex justify-content-center mt-3">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="btn btn-secondary me-2"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="btn btn-secondary ms-2"
        >
          Next
        </button>
      </div>

      <div class="text-center mt-3">
        <button @click="ToGetAllData" class="btn btn-primary btn-lg">
          Fetch All Data
        </button>
      </div>
    </div>

    <!-- Update Modal -->
    <div v-if="isUpdateModalVisible" class="modal show d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Username</h5>
            <button
              type="button"
              class="btn-close"
              @click="isUpdateModalVisible = false"
            ></button>
          </div>
          <div class="modal-body">
            <input
              v-model="updatedUsername"
              type="text"
              class="form-control"
              placeholder="Enter new username"
            />
          </div>
          <div class="modal-body">
            <input
              v-model="updatephone"
              type="text"
              class="form-control"
              placeholder="Enter new phone number"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="isUpdateModalVisible = false"
            >
              Close
            </button>
            <button @click="updateUsername" class="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalVisible" class="modal show d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button
              type="button"
              class="btn-close"
              @click="isDeleteModalVisible = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="isDeleteModalVisible = false"
            >
              Cancel
            </button>
            <button @click="deleteUser" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
      <!-- Messages Page -->
  <div v-if="showMessagesPage">
        <h2 class="text-center text-success">All Messages</h2>
        <button class="btn btn-secondary mb-3" @click="showMessagesPage = false">Back</button>
        <div class="table-responsive">
          <table v-if="paginatedMessages.length" class="table table-striped table-bordered text-center">
            <thead class="table-success">
              <tr>
                <th>#</th>
 
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(msg, index) in paginatedMessages" :key="msg._id">
                <td>{{ (messagesPage - 1) * itemsPerPage + index + 1 }}</td>
                
                <td>{{ msg.Email }}</td>
                <td>{{ msg.Text }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="!messagesData.length" class="text-center text-muted">No messages found.</p>
        </div>

        <div class="d-flex justify-content-center mt-3">
          <button @click="prevMessagesPage" :disabled="messagesPage === 1" class="btn btn-secondary me-2">
            Previous
          </button>
          <span>Page {{ messagesPage }} of {{ totalMessagesPages }}</span>
          <button @click="nextMessagesPage" :disabled="messagesPage === totalMessagesPages" class="btn btn-secondary ms-2">
            Next
          </button>
        </div>
      </div>

  </div>
</template>

<script>
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./SignUp.vue";
import { Getdata } from '../middleware/api.js'
import {Deleteuser} from '../middleware/api.js'
import { Getcontact } from "../middleware/api.js";
export default {
  components: {
    SignUp,
    //mujh pe b chashmay karam aay mere aqa krna
    //haq tou mera b h rehmat ka takaza krna
    //--------------------------------------
    // tu kisi ko b uthata ni apne dar se
    // k teri shan k shaaaya  ni aisa krna
    //------------------------------------
    //mein k zarra hon mujhy wus at e sehra de day
    //k tere bus mein h katra ko b darya krna
    //----------------------------------------
    //ye tera kam h ay amina k dur e yakeen
    //sari ummat ki shafaaaat tan e tanha karna
    //----------------------------------------
    //muj pr mehshar mein  naseer un ki nazar par hi gai
    //kehne wale issay kehty h khuda ka krrna
    //----------------------------------------
   
  },

  data() {
    return {
      Alldata: [],
      messagesData: [],
      searchQuery: "",
      showSearch: false,
      userIdToUpdate: null,
      updatedUsername: "",
      updatephone: "",
      userIdToDelete: null,
      currentPage: 1,
      messagesPage: 1,
      itemsPerPage: 10,
      isSignupModalVisible: false,
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
      showMessagesPage: false,
    };
  },

  computed: {
    filteredData() {
      if (!this.searchQuery) return this.Alldata;
      return this.Alldata.filter((user) =>
        user.Username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
    totalMessagesPages() {
      return Math.ceil(this.messagesData.length / this.itemsPerPage);
    },
    paginatedMessages() {
      const start = (this.messagesPage - 1) * this.itemsPerPage;
      return this.messagesData.slice(start, start + this.itemsPerPage);
    },
  },

  methods: {
    async fetchContacts() {
  this.errorMessage = "";
  try {
    const res = await Getcontact();
    console.log("Fetched Messages:", res.data); 
    if (res && res.data && Array.isArray(res.data)) {
      this.messagesData = res.data;
      this.showMessagesPage = true;
    } else {
      console.error("Unexpected response format:", res);
      this.errorMessage = "Invalid data format received.";
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    this.errorMessage = "Failed to fetch messages.";
  }
}
,
    async ToGetAllData() {
      try {
        const response = await Getdata();
        console.log("the pic is ",response.data)
        this.Alldata = response.data;
        this.showSearch = true;
     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    resetPagination() {
      this.currentPage = 1;
    },
    confirmDelete(id) {
      this.userIdToDelete = id;
      this.isDeleteModalVisible = true;
    },
    async deleteUser() {
      if (!this.userIdToDelete) return;
      try {
        await Deleteuser(this.userIdToDelete);
        this.ToGetAllData();
        this.isDeleteModalVisible = false;
      } catch (error) {
        console.error("Error while deleting user:", error);
      }
    },
    openUpdateModal(user) {
      this.userIdToUpdate = user._id;
      this.updatedUsername = user.Username;
      this.updatephone = user.phoneno;
      this.isUpdateModalVisible = true;
    },
    async updateUsername() {
      if (!this.userIdToUpdate || !this.updatedUsername.trim()) return;
      try {
        await axios.put("http://localhost:3001/updatename", {
          userId: this.userIdToUpdate,
          Username: this.updatedUsername,
          phoneno: this.updatephone,
        });
        this.ToGetAllData();
        this.isUpdateModalVisible = false;
      } catch (error) {
        console.error("Error updating username:", error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>

<style scoped>
 img {
      width: 30px;
      border-radius: 40px;
 }
</style>