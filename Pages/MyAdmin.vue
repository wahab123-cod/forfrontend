<template>
  <div class="container-fluid d-flex align-items-center justify-content-center bg-light mt-5 mb-5">
    <div class="card shadow-lg p-4 w-100" style="max-width: 900px;">
      <h1 class="text-center text-primary mb-4">Hello Admin, Here is All Data</h1>

      <div v-if="showSearch" class="mb-3">
        <input type="text" v-model="searchQuery" @input="resetPagination" placeholder="Search by name..." class="form-control" />
      </div>

      <div class="table-responsive">
        <table v-if="paginatedData.length" class="table table-striped table-bordered text-center">
          <thead class="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in paginatedData" :key="user._id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ user.Username }}</td>
              <td>{{ user.Gmail }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="openUpdateModal(user)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" @click="confirmDelete(user._id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="showSearch && !filteredData.length" class="text-center text-muted">No matching users found.</p>
      </div>

      <div class="d-flex justify-content-center mt-3">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary me-2">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary ms-2">Next</button>
      </div>

      <div class="text-center mt-3">
        <button @click="ToGetAllData" class="btn btn-primary btn-lg">Fetch All Data</button>
      </div>
    </div>

    <!-- Update Modal -->
    <div id="updateModal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Username</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input v-model="updatedUsername" type="text" class="form-control" placeholder="Enter new username" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="updateUsername" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div id="deleteModal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button @click="deleteUser" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
export default {
  data() {
    return {
      Alldata: [],
      searchQuery: "",
      showSearch: false,
      userIdToUpdate: null,
      updatedUsername: "",
      userIdToDelete: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) return this.Alldata;
      const searchLower = this.searchQuery.toLowerCase();
      return this.Alldata.filter((user) => user.Username.toLowerCase().includes(searchLower));
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async ToGetAllData() {
      try {
        const res = await axios.get("http://localhost:3001/alldata");
        this.Alldata = res.data;
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
      new bootstrap.Modal(document.getElementById("deleteModal")).show();
    },
    async deleteUser() {
      if (!this.userIdToDelete) return;
      try {
        await axios.delete(`http://localhost:3001/user/${this.userIdToDelete}`);
        this.ToGetAllData();
        this.userIdToDelete = null;
        bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
      } catch (error) {
        console.error("Error while deleting user:", error);
      }
    },
    openUpdateModal(user) {
      this.userIdToUpdate = user._id;
      this.updatedUsername = user.Username;
      new bootstrap.Modal(document.getElementById("updateModal")).show();
    },
    async updateUsername() {
      if (!this.userIdToUpdate || !this.updatedUsername.trim()) return;
      try {
        await axios.put("http://localhost:3001/updatename", {
          userId: this.userIdToUpdate,
          Username: this.updatedUsername,
        });
        this.ToGetAllData();
        bootstrap.Modal.getInstance(document.getElementById("updateModal")).hide();
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

