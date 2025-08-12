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
import Header from '../layout/Header.vue'

import axios from 'axios';

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
      const response = await axios.post('http://localhost:8889/fahad-jadiya/experience', this.experience);
      this.experiences.push(response.data);
      this.experience = {
        designation: '',
        office: '',
        year: '',
        description: '',
      };
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:8889/fahad-jadiya/experience');
    console.log(response.data);
    this.experiences = response.data.data;
  },
    components: {
        Header
    }
}
</script>
