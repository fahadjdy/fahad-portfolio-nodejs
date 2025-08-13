<template>
  <header class="bg-white shadow flex items-center justify-between px-6 py-4 sticky top-0 z-30">
    <!-- Mobile toggle button -->
    <button
      v-if="showToggle"
      @click="$emit('openSidebar')"
      class="text-[var(--main)] focus:outline-none"
    >
      <i class="fas fa-bars text-2xl"></i>
    </button>

    <h1 class="text-xl font-semibold text-gray-700 flex items-center gap-2">
      <i class="fas fa-home text-[var(--main)]"></i>
      Dashboard
    </h1>

    <!-- Profile -->
    <div class="relative flex items-center space-x-4">
      <button @click="toggleProfileMenu" class="focus:outline-none flex items-center">
        <img src="https://i.pravatar.cc/40" alt="Admin" class="w-10 h-10 rounded-full border-2 border-[var(--third)] shadow-sm">
        <i class="fas fa-caret-down text-[var(--main)] ml-2"></i>
      </button>
      <div
        v-show="isProfileMenuOpen"
        class="absolute right-0 top-14 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
      >
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <i class="fas fa-user mr-2"></i> Profile
        </a>
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <i class="fas fa-sign-out-alt mr-2 text-red-500"></i> Logout
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showToggle: { type: Boolean, default: true }
  },
  data() {
    return {
      isProfileMenuOpen: false
    };
  },
  methods: {
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }
  }
};
</script>
