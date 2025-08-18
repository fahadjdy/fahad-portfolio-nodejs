<template>
  <Base>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
      Manage Skills
    </h2>

    <!-- Add / Edit Form -->
    <form @submit.prevent="saveSkill"
      class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl shadow-md">
      <!-- Skill Name -->
      <div class="flex flex-col">
        <label for="name" class="text-sm font-medium text-gray-700 mb-2">
          Skill Name
        </label>
        <input id="name" v-model="form.name" type="text" required placeholder="e.g., PHP, JavaScript, Python"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
      </div>

      <!-- Skill Level -->
      <div class="flex flex-col">
        <label for="level" class="text-sm font-medium text-gray-700 mb-2">
          Level
        </label>
        <select id="level" v-model="form.level" required
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
          <option value="" disabled>Select level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>Expert</option>
        </select>
      </div>

      <!-- Order No -->
      <div class="flex flex-col">
        <label for="order_no" class="text-sm font-medium text-gray-700 mb-2">
          Order No
        </label>
        <input id="order_no" v-model.number="form.order_no" type="number" min="1" placeholder="Order No"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
      </div>

      <!-- Buttons -->
      <div class="flex gap-3 col-span-1 md:col-span-3 justify-end mt-4">
        <button type="submit"
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
          {{ isEditing ? "Update" : "Add" }}
        </button>
        <button v-if="isEditing" type="button" @click="resetForm"
          class="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-200">
          Cancel
        </button>
      </div>
    </form>


    <!-- List of Skills -->
    <table class="w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-1 border">Name</th>
          <th class="p-1 border">Level</th>
          <th class="p-1 border">Order</th>
          <th class="p-1 border w-32 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="skill in skills" :key="skill.id" class="hover:bg-gray-50">
          <td class="p-1 border">{{ skill.name }}</td>
          <td class="p-1 border">{{ skill.level }}</td>
          <td class="p-1 border">{{ skill.order_no }}</td>
          <td class="p-1 border text-center">
            <button @click="editSkill(skill)" class="px-2  bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Edit
            </button>
            <button @click="deleteSkill(skill.id)"
              class="px-2  bg-red-600 text-white rounded hover:bg-red-700 ml-2">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </Base>
</template>

<script>
import Base from "../components/layout/Base.vue";
import skillsService from "../services/skillsService";

export default {
  name: "SkillsComponent",
  data() {
    return {
      skills: [],
      form: {
        id: null,
        name: "",
        level: "",
        order_no: "",
      },
      isEditing: false,
    };
  },
  async created() {
    await this.loadSkills();
  },
  methods: {
    async loadSkills() {
      try {
        const res = await skillsService.getAll();
        this.skills = res.data || [];
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    },
    async saveSkill() {
      try {
        if (this.isEditing) {
          await skillsService.update(this.form.id, {
            name: this.form.name,
            level: this.form.level,
            order_no: this.form.order_no,
          });
        } else {
          await skillsService.add({
            name: this.form.name,
            level: this.form.level,
            order_no: this.form.order_no,
          });
        }
        await this.loadSkills();
        this.resetForm();
      } catch (err) {
        console.error("Error saving skill:", err);
      }
    },
    editSkill(skill) {
      this.form.id = skill.id;
      this.form.name = skill.name;
      this.form.level = skill.level;
      this.form.order_no = skill.order_no;
      this.isEditing = true;
    },
    async deleteSkill(id) {
      try {
        await skillsService.delete(id);
        this.skills = this.skills.filter((s) => s.id !== id); // optimistically update
      } catch (err) {
        console.error("Error deleting skill:", err);
      }
    },
    resetForm() {
      this.form.id = null;
      this.form.name = "";
      this.form.level = "";
      this.form.order_no = "";
      this.isEditing = false;
    },
  },
  components: {
    Base,
  },
};
</script>
