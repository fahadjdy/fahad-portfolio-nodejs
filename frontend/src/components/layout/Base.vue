<template>
  <div class="flex min-h-screen">
   

     <!-- Overlay for mobile -->
    <div
      v-if="!isDesktop"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-40"
      :class="{
        'opacity-0 pointer-events-none': !isSidebarOpen,
        'opacity-100': isSidebarOpen
      }"
      @click="closeSidebar"
    ></div>

     <!-- Sidebar -->
    <Sidebar
      :isOpen="isSidebarOpen"
      :showClose="!isDesktop"
      class="z-40"
      @close="closeSidebar"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen transition-all duration-300" :class="{
      'md:ml-64': isSidebarOpen && isDesktop,
      'ml-0': !isSidebarOpen || !isDesktop
    }">
      <!-- Header with toggle button for mobile -->
      <Header :showToggle="!isDesktop" @openSidebar="openSidebar" />

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot></slot>
      </main>
      <!-- Footer -->
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';

export default {
  name: 'BaseLayout',
  data() {
    return {
      isSidebarOpen: false,
      isDesktop: false
    };
  },
  mounted() {
    this.checkScreen(); // run once immediately
    window.addEventListener('resize', this.checkScreen);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen);
  },
  methods: {
    checkScreen() {
      this.isDesktop = window.outerWidth >= 768;
      this.isSidebarOpen = this.isDesktop; // open sidebar only on desktop
    },
    openSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
      
    }
  },
  components: {
    Header,
    Sidebar,
    Footer
  }
};
</script>
