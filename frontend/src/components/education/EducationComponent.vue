<template>
  <div class="flex flex-wrap">
    <!-- Form -->
    <div class="w-full lg:w-1/3">
      <div class="max-w-xlg mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {{ isEditing ? "Edit Education" : "Add Education" }}
        </h2>

        <form @submit.prevent="isEditing ? updateEducation() : addEducation()" class="space-y-5">
          <!-- School -->
          <div>
            <label for="school" class="block text-sm font-medium text-gray-700 mb-1">School</label>
            <input type="text" id="school" v-model="education.school"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <!-- Degree -->
          <div>
            <label for="degree" class="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input type="text" id="degree" v-model="education.degree"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" id="location" v-model="education.location"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <!-- Order -->
          <div>
            <label for="order_no" class="block text-sm font-medium text-gray-700 mb-1">Order</label>
            <input type="number" id="order_no" v-model="education.order_no"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- From Date -->
            <div>
              <label for="from_date" class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input type="date" id="from_date" v-model="education.from_date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
            </div>

            <!-- To Date -->
            <div>
              <label for="to_date" class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                To Date
                <i class="fa fa-info-circle text-gray-400 cursor-pointer hover:text-gray-600"
                  title="Leave empty if currently studying"></i>
              </label>
              <input type="date" id="to_date" v-model="education.to_date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
            </div>
          </div>

          <!-- Grade -->
          <div>
            <label for="grade" class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <input type="text" id="grade" v-model="education.grade"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" v-model="education.description" rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"></textarea>
          </div>

          <!-- Submit -->
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            {{ isEditing ? "Update Education" : "Add Education" }}
          </button>
        </form>
      </div>
    </div>

    <!-- List -->
    <div class="w-full lg:w-1/2 max-w-xlg mx-10 p-6 bg-white shadow-xl rounded-lg">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">Education List</h2>
        <button v-if="isEditing" @click="addEducationButton"
          class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">
          Add Education
        </button>
      </div>

      <ul class="mt-6 divide-y divide-gray-200">
        <li v-for="(edu, index) in educations" :key="edu.id" class="py-3 flex justify-between items-center">
          <div>
            <p class="font-semibold text-gray-800">
              {{ index + 1 }}. {{ edu.degree }} - {{ edu.school }}
            </p>
            <p class="text-sm text-gray-500">
              {{ edu.location }} • {{ $common.formatDate(edu.from_date) }} -
              {{ edu.to_date ? $common.formatDate(edu.to_date) : "Present" }}
            </p>
            <p class="text-sm text-gray-500">{{ edu.grade }}</p>
            <p class="text-sm text-gray-500">{{ edu.description }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button @click="editEducation(edu)"
              class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">
              <i class="fas fa-pen"></i>
            </button>
            <button @click="deleteEducation(edu.id)"
              class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import educationService from '../../services/educationServices';

export default {
  data() {
    return {
      education: {
        id: null,
        school: '',
        degree: '',
        location: '',
        from_date: '',
        to_date: '',
        is_current: false,
        grade: '',
        description: '',
        order_no: '',
      },
      educations: [],
      isEditing: false,
    };
  },
  methods: {
    async addEducation() {
      try {
        await educationService.add(this.education);
        await this.loadEducations();
        this.resetForm();
      } catch (error) {
        console.error("Error adding education:", error);
      }
    },
    addEducationButton() {
      this.resetForm();
      this.isEditing = false;
    },
    editEducation(edu) {
      const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      };

      this.education = {
        ...edu,
        from_date: formatDate(edu.from_date),
        to_date: formatDate(edu.to_date),
      };

      this.isEditing = true;
    },
    async updateEducation() {
      if (!this.education.id) return;
      try {
        await educationService.update(this.education.id, this.education);
        await this.loadEducations();
        this.resetForm();
        this.isEditing = false;
      } catch (error) {
        console.error("Error updating education:", error);
      }
    },
    async deleteEducation(id) {
      if (confirm("Are you sure you want to delete this education?")) {
        await educationService.delete(id);
        this.educations = this.educations.filter(edu => edu.id !== id);
      }
    },
    async loadEducations() {
      try {
        const data = await educationService.getAll();
        this.educations = data.data;
      } catch (error) {
        console.error("Error loading educations:", error);
      }
    },
    resetForm() {
      this.education = {
        id: null,
        school: '',
        degree: '',
        location: '',
        from_date: '',
        to_date: '',
        is_current: false,
        grade: '',
        description: '',
        order_no: '',
      };
      this.isEditing = false;
    }
  },
  async mounted() {
    await this.loadEducations();
  }
};
</script>
