<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Login</h2>

    <form @submit.prevent="login" class="mb-4">
      <div class="mb-4">
        <label for="email" class="block mb-2">Email</label>
        <input type="email" id="email" v-model="email" class="border p-2 w-full" />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input type="password" id="password" v-model="password" class="border p-2 w-full" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>

    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
   async login() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}`+'/auth/login', {
            email: this.email,
            password: this.password
            })
            localStorage.setItem('token', response.data.token)
            this.$router.push('/admin/profile')
        } catch (error) {
            this.error = error.response?.data?.error || 'Something went wrong. Please try again.'
        }
    }
  }
}
</script>
