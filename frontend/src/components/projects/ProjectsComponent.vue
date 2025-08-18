<template>
  <div class="flex flex-wrap">
    <!-- Form -->
    <div class="w-full lg:w-1/3">
      <div class="max-w-xlg mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          {{ isEditing ? "Edit Project" : "Add Project" }}
        </h2>

        <form @submit.prevent="isEditing ? updateProject() : addProject()" class="space-y-5">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input v-model="project.title" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="project.description" rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"></textarea>
          </div>

          <!-- Tech Stack -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
            <input v-model="project.tech_stack" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <!-- Links -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
              <input v-model="project.link" type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Github</label>
              <input v-model="project.github" type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
            </div>
          </div>

          <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              @change="handleFileChange"
              class="w-full px-4 py-2 ..."
            />
            <div class="mt-2 flex flex-wrap gap-2">
              <img v-if="isEditing" :src="`http://localhost:8889/public/${project.image}`"
                class="w-16 h-16 object-cover rounded border border-gray-300" />
            </div>
          </div>


          <!-- Dates -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input v-model="project.from_date" type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input v-model="project.to_date" type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
            </div>
          </div>

          <!-- Current -->
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="project.is_current" class="h-4 w-4 text-blue-600" />
            <label class="text-sm text-gray-700">Currently Working</label>
          </div>

          <!-- Order No -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Order No</label>
            <input v-model="project.order_no" type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
          </div>

          <!-- Submit -->
          <button type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
            shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            {{ isEditing ? "Update Project" : "Add Project" }}
          </button>
        </form>
      </div>
    </div>

    <!-- List -->
    <div class="w-full lg:w-1/2 max-w-xlg mx-10 p-6 bg-white shadow-xl rounded-lg">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">Project List</h2>
        <button v-if="isEditing" @click="resetForm"
          class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">
          Add Project
        </button>
      </div>

      <ul class="mt-6 divide-y divide-gray-200">
        <li v-for="(proj, index) in projects" :key="proj.id" class="py-3 flex justify-between items-center">
          <div>
            <p class="font-semibold text-gray-800">
              {{ index + 1 }}. {{ proj.title }} | {{ proj.tech_stack }}
            </p>
            <p class="text-sm text-gray-500">
              {{ $common.formatDate(proj.from_date) }} -
              {{ proj.is_current ? "Present" : $common.formatDate(proj.to_date) }}
            </p>
            <p class="text-sm text-gray-500">{{ proj.description }}</p>
          </div>

          <div class="flex items-center gap-2">
            <a v-if="proj.link" :href="proj.link" target="_blank"
              class="text-blue-500 hover:underline text-sm">View Project</a>
            <a v-if="proj.github" :href="proj.github" target="_blank"
              class="text-blue-500 hover:underline text-sm">Github</a>
          </div>

          <div v-if="proj.image" class="flex items-center gap-2">
            <img  :src="`http://localhost:8889/public/${proj.image}`" 
              class="w-10 h-10 object-cover rounded-full border border-gray-300" />
          </div>


          <!-- Actions -->
          <div class="flex gap-3">
            <button @click="editProject(proj)"
              class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">
              <i class="fas fa-pen"></i>
            </button>
            <button @click="deleteProject(proj.id)"
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
import projectService from "../../services/projectService.js";
import { formatDateForInput } from "../../utils/common.js";

export default {
  data() {
    return {
      project: {
        id: null,
        title: "",
        description: "",
        tech_stack: "",
        link: "",
        github: "",
        image: "",  
        imageFile: null, 
        from_date: "",
        to_date: "",
        is_current: false,
        order_no: "",
      },
      projects: [],
      isEditing: false,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.project.imageFile = file; 
      }
    },
    async addProject() {
      try {
        
        await projectService.add(this.project, true);
        await this.loadProjects();
        this.resetForm();
      } catch (error) {
        console.error("Error adding project:", error);
      }
    },

    async updateProject() {
      try {
        await projectService.update(this.project.id, this.project, true);
        await this.loadProjects();
        this.resetForm();
      } catch (error) {
        console.error("Error updating project:", error);
      }
    },

    editProject(proj) {
        this.project = {
          ...proj,
          is_current: proj.is_current === 1,
          from_date: formatDateForInput(proj.from_date),
          to_date: formatDateForInput(proj.to_date),
          imageFile: null, // No file selected on edit by default
        };
        this.isEditing = true;
      },
    async deleteProject(id) {
      if (confirm("Are you sure you want to delete this project?")) {
        await projectService.delete(id);
        this.projects = this.projects.filter((proj) => proj.id !== id);
      }
    },
    async loadProjects() {
      try {
        const data = await projectService.getAll();
        this.projects = data.data;
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    },
    resetForm() {
      this.project = {
        id: null,
        title: "",
        description: "",
        tech_stack: "",
        link: "",
        github: "",
        image: [],
        imageFile: null, 
        from_date: "",
        to_date: "",
        is_current: false,
        order_no: "",
      };
      this.isEditing = false;
    },
  },
  async mounted() {
    await this.loadProjects();
  },
};
</script>
