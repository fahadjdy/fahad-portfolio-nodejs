<template>
  <Base>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
      Manage Hobbies
    </h2>

    <!-- Add / Edit Form -->
    <form @submit.prevent="saveHobby" class="mb-6 flex gap-4">
      <input
        v-model="form.name"
        type="text"
        required
        placeholder="Enter hobby"
        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {{ isEditing ? "Update" : "Add" }}
      </button>
      <button
        v-if="isEditing"
        type="button"
        @click="resetForm"
        class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
      >
        Cancel
      </button>
    </form>

    <!-- List of Hobbies -->
    <ul>
      <li
        v-for="hobby in hobbies"
        :key="hobby.id"
        class="flex justify-between items-center p-3 bg-gray-50 rounded mb-2"
      >
        <span class="text-gray-700">{{ hobby.name }}</span>
        <div class="flex gap-3">
          <button
            @click="editHobby(hobby)"
            class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            @click="deleteHobby(hobby.id)"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
  </Base>
</template>
<script>
import Base from '../components/layout/Base.vue';
import hobbiesService from "../services/hobbieServices";

export default {
  name: "HobbiesComponent",
  data() {
    return {
      hobbies: [],
      form: {
        id: null,
        name: "",
      },
      isEditing: false,
    };
  },
  async created() {
    await this.loadHobbies();
  },
  methods: {
    async loadHobbies() {
      try {
        const res = await hobbiesService.getAll();
        this.hobbies = res.data || [];
      } catch (err) {
        console.error("Error fetching hobbies:", err);
      }
    },
    async saveHobby() {
      try {
        if (this.isEditing) {
          await hobbiesService.update(this.form.id, { name: this.form.name });
        } else {
          await hobbiesService.add({ name: this.form.name });
        }
        await this.loadHobbies();
        this.resetForm();
      } catch (err) {
        console.error("Error saving hobby:", err);
      }
    },
    editHobby(hobby) {
      this.form.id = hobby.id;
      this.form.name = hobby.name;
      this.isEditing = true;
    },
    async deleteHobby(id) {
      try {
        await hobbiesService.delete(id);
        await this.loadHobbies();
      } catch (err) {
        console.error("Error deleting hobby:", err);
      }
    },
    resetForm() {
      this.form.id = null;
      this.form.name = "";
      this.isEditing = false;
    },
  },
  components: {
    Base
  }
};
</script>
