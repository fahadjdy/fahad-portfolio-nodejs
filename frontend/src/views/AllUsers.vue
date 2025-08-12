<!-- src/views/AllUsers.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">All Users</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <table v-else class="w-full border" border="1">
      <thead>
        <tr>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Email</th>
          <th class="border px-4 py-2">Role</th>
          <th class="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="border px-4 py-2">{{ user.name }}</td>
          <td class="border px-4 py-2">{{ user.email }}</td>
          <td class="border px-4 py-2">{{ user.role }}</td>
          <td class="border px-4 py-2">
            <button @click="editUser(user.id)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AllUsers",
  data() {
    return {
      users: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDQ1NjAyOSwiZXhwIjoxNzU0NTQyNDI5fQ.8kfT49kUs6zY3MKM0r3TwXGEiWfGs4K8ecGEcvXNkco'
        // const token = localStorage.getItem("token"); // or use Vuex/store

        const response = await axios.get("http://localhost:8889/api/auth/admin/get-all-users?limit=10&page=1", {
          headers: {
            Authorization: `Bearer ${token}`, // must match your backend JWT auth
          },
        });
        this.users = response.data.data || response.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to load users.";
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(id){
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDQ1NjAyOSwiZXhwIjoxNzU0NTQyNDI5fQ.8kfT49kUs6zY3MKM0r3TwXGEiWfGs4K8ecGEcvXNkco'
        // const token = localStorage.getItem("token"); // or use Vuex/store
        const response = await axios.delete(`http://localhost:8889/api/auth/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        this.fetchUsers();
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to load users.";
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
