<template>
    <Header />
   <div class="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Experience</h2>

    <!-- Add Experience Form -->
    <form @submit.prevent="addExperience" class="space-y-5">
      <!-- Designation -->
      <div>
        <label for="designation" class="block text-sm font-medium text-gray-700 mb-1">Designation</label>
        <input
          type="text"
          id="designation"
          v-model="experience.designation"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300"
        />
      </div>

      <!-- Office -->
      <div>
        <label for="office" class="block text-sm font-medium text-gray-700 mb-1">Office</label>
        <input
          type="text"
          id="office"
          v-model="experience.office"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300"
        />
      </div>

      <!-- Year -->
      <div>
        <label for="year" class="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <input
          type="text"
          id="year"
          v-model="experience.year"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          v-model="experience.description"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
               shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Add Experience
      </button>
    </form>

    <!-- Experience List -->
    <ul class="mt-6 divide-y divide-gray-200">
      <li
        v-for="exp in experiences"
        :key="exp.id"
        class="py-3 flex justify-between items-center"
      >
        <div>
          <p class="font-semibold text-gray-800">{{ exp.designation }}</p>
          <p class="text-sm text-gray-500">{{ exp.office }} • {{ exp.year }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Header from '../components/layout/Header.vue';
import experienceService from '../services/experienceService';

export default {
  data() {
    return {
      experience: {
        designation: '',
        office: '',
        year: '',
        description: '',
      },
      experiences: [],
    }
  },
  methods: {
    async addExperience() {
      try {
        const newExperience = await experienceService.add(this.experience);
        this.experiences.push(newExperience);
        this.experience = {
          designation: '',
          office: '',
          year: '',
          description: '',
        };
      } catch (error) {
        console.error("Error adding experience:", error);
      }
    }
  },
  async mounted() {
    try {
      const data = await experienceService.getAll();
      this.experiences = data.data;
    } catch (error) {
      console.error("Error loading experiences:", error);
    }
  },
  components: {
    Header
  }
};
</script>

