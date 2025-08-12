<template>
    <Header />
  <div>
    <h2>Experience</h2>
    <form @submit.prevent="addExperience">
      <div>
        <label for="designation">Designation:</label>
        <input type="text" id="designation" v-model="experience.designation" />
      </div>
      <div>
        <label for="office">Office:</label>
        <input type="text" id="office" v-model="experience.office" />
      </div>
      <div>
        <label for="year">Year:</label>
        <input type="text" id="year" v-model="experience.year" />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="experience.description"></textarea>
      </div>
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="exp in experiences" :key="exp.id">
        {{ exp.designation }} ({{ exp.year }})
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

