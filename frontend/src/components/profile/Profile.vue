<template>
  <div>
    <h2>Edit Profile</h2>

    <form @submit.prevent="saveProfile">
      <!-- Name -->
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="profile.name" id="name" autocomplete="name" />
      </div>

      <!-- Email -->
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="profile.email" id="email" autocomplete="email" />
      </div>

      <!-- Contact -->
      <div>
        <label for="contact">Contact:</label>
        <input type="tel" v-model="profile.contact" id="contact" autocomplete="tel" />
      </div>

      <!-- Address -->
      <div>
        <label for="address">Address:</label>
        <textarea v-model="profile.address" id="address" rows="3"></textarea>
      </div>

      <!-- Image -->
      <div>
        <label for="image">Profile Image:</label>
        <input type="file" @change="handleImageUpload" id="image" accept="image/*" />
        <div v-if="imagePreview">
          <img :src="imagePreview" alt="Profile preview" />
        </div>
      </div>

      <!-- Submit -->
      <button type="submit">Update Profile</button>
    </form>

    <!-- Messages -->
    <transition name="fade">
      <p v-if="error">{{ error }}</p>
    </transition>
    <transition name="fade">
      <p v-if="success">{{ success }}</p>
    </transition>
  </div>
</template>


<script>
import { getProfile, updateProfile } from '../../services/profileService';

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
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.image);
      }
    },
    async saveProfile() {
      try {
        const response = await updateProfile(this.profile.id, {
          ...this.profile,
          image: this.image
        });

        this.success = 'Profile updated successfully!';
        if (response.data?.image) {
          this.imagePreview = `http://localhost:8889/public/${response.data.image}`;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update profile.';
      }
    }
  },
  async mounted() {
    try {
      const profileData = await getProfile();
      this.profile = profileData;

      if (this.profile.image) {
        this.imagePreview = `http://localhost:8889/public/${this.profile.image}`;
      }
    } catch (error) {
      this.error = 'Failed to load profile data.';
    }
  }
};
</script>
