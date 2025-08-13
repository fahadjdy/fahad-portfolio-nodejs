<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Edit Profile</h2>

    <form @submit.prevent="saveProfile" class="space-y-5">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input type="text" v-model="profile.name" id="name" autocomplete="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300" />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" v-model="profile.email" id="email" autocomplete="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300" />
      </div>

      <!-- Contact -->
      <div>
        <label for="contact" class="block text-sm font-medium text-gray-700 mb-1">Contact</label>
        <input type="tel" v-model="profile.contact" id="contact" autocomplete="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300" />
      </div>

      <!-- Address -->
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea v-model="profile.address" id="address" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 resize-none transition duration-300"></textarea>
      </div>

      <!-- Image -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
        <input type="file" @change="handleImageUpload" id="image" accept="image/*" class="w-full border border-gray-300 rounded-lg p-2 shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition duration-300" />
        <div v-if="imagePreview" class="mt-4 flex justify-center">
          <img :src="imagePreview" alt="Profile preview"
            class="w-32 h-32 object-cover rounded-full border border-gray-300 shadow" />
        </div>
      </div>

      <!-- Submit -->
      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
               shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
        Update Profile
      </button>
    </form>

    <!-- Messages -->
    <transition name="fade">
      <p v-if="error" class="mt-4 text-sm text-red-500">{{ error }}</p>
    </transition>
    <transition name="fade">
      <p v-if="success" class="mt-4 text-sm text-green-500">{{ success }}</p>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


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

        this.success = "Profile updated successfully!";
        setTimeout(() => {
          this.success = null;
        }, 3000);
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
