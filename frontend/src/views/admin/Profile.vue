<template>
  <Header />

  <div>
    <h2>Edit Profile</h2>
    <form @submit.prevent="updateProfile">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="profile.name" id="name" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="profile.email" id="email" />
      </div>
      <div>
        <label for="contact">Contact:</label>
        <input type="text" v-model="profile.contact" id="contact" />
      </div>
      <div>
        <label for="address">Address:</label>
        <textarea v-model="profile.address" id="address"></textarea>
      </div>
      <div>
        <label for="image">Profile Image:</label>
        <input type="file" @change="handleImageUpload" id="image" />
        <div v-if="imagePreview" class="mt-4">
          <img :src="imagePreview" class="w-48 h-48 object-cover" />
        </div>
      </div>
      <button type="submit">Update Profile</button>
    </form>

    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="success" class="text-green-500">{{ success }}</p>
  </div>
</template>

<script>
import Header from '../layout/Header.vue';
import axios from 'axios';

export default {
  data() {
    return {
      profile: {
        id: null,
        name: '',
        email: '',
        contact: '',
        address: '',
        image: ''
      },
      imagePreview: null,
      image: null,
      error: null,
      success: null
    };
  },
  methods: {
    handleImageUpload(event) {
      this.image = event.target.files[0];
      if (this.image) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imagePreview = e.target.result; // Live preview
        };
        reader.readAsDataURL(this.image);
      }
    },
    async updateProfile() {
      try {
        const formData = new FormData();
        formData.append('name', this.profile.name);
        formData.append('email', this.profile.email);
        formData.append('contact', this.profile.contact);
        formData.append('address', this.profile.address);
        if (this.image) {
          formData.append('image', this.image);
        }

        const token = localStorage.getItem('token');
        const response = await axios.post(
          `http://localhost:8889/fahad-jadiya/profile/edit/${this.profile.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          }
        );

        this.success = 'Profile updated successfully!';
        
        // ✅ Use image path from backend after upload
        if (response.data.data?.image) {
          this.imagePreview = `http://localhost:8889/public/${response.data.data.image}`;
        }

      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update profile.';
      }
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:8889/fahad-jadiya/profile');
      const profileData = response.data.data[0] || response.data;
      this.profile = profileData;

      // ✅ Show existing DB image on page load
      if (this.profile.image) {
        this.imagePreview = `http://localhost:8889/public/${this.profile.image}`;
      }
    } catch (error) {
      this.error = 'Failed to load profile data.';
    }
  },
  components: {
    Header
  }
};
</script>
