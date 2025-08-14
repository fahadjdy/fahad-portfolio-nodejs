<template>
  <aside
    class="fixed z-50 top-0 left-0 w-64 h-full bg-[var(--main)] text-white transform transition-all duration-300 ease-in-out flex flex-col shadow-xl backdrop-blur-md"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <div class="p-6 text-2xl font-bold flex items-center justify-between border-b border-white/10">
      <span>
        <i class="fas fa-user-shield mr-2 text-[var(--light)]"></i>
        Admin Panel
      </span>
    </div>

    <nav class="flex-1 px-4 py-4 space-y-2">

      <router-link to="/admin/experience" class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-[var(--second)] transition-colors">
        <i class="fas fa-award"></i>
        <span>Experience</span>
        
      </router-link>

      <router-link to="/admin/education" class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-[var(--second)] transition-colors">
        <i class="fas fa-book"></i>
        <span>Education</span>
      </router-link>

      <router-link to="/admin/hobbies" class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-[var(--second)] transition-colors">
        <i class="fas fa-certificate"></i>
        <span>Hobbies</span>
      </router-link>

      <router-link to="/admin/skills" class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-[var(--second)] transition-colors">
        <i class="fas fa-lightbulb"></i>
        <span>Skills</span>
      </router-link>

      <router-link to="/admin/projects" class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-[var(--second)] transition-colors">
        <i class="fas fa-project-diagram"></i>
        <span>Projects</span>
      </router-link>

      <router-link to="/admin/profile" class="block py-2 px-3 flex items-center gap-2 rounded hover:bg-[var(--second)] transition-colors">
        <i class="fas fa-cog"></i>
        <span>Profile</span>
      </router-link>

      <!-- Example submenu -->
      <div>
        <button
          @click="submenuOpen = !submenuOpen"
          class="w-full text-left py-2 px-3 rounded hover:bg-[var(--second)] flex items-center justify-between gap-2 transition-colors"
        >
          <div class="flex items-center gap-2">
            <i class="fas fa-layer-group"></i>
            <span>Menu</span>
          </div>
          <i class="fas fa-chevron-down transition-transform" :class="{ 'rotate-180': submenuOpen }"></i>
        </button>

        <div
          v-show="submenuOpen"
          class="ml-8 border-l border-[var(--light)] pl-3 mt-1 space-y-1"
        >
          <a href="#" class="flex items-center gap-2 py-1 px-2 rounded hover:bg-[var(--third)] text-sm transition-colors">
            <i class="fas fa-circle-notch text-xs"></i> Submenu 1
          </a>
          <a href="#" class="flex items-center gap-2 py-1 px-2 rounded hover:bg-[var(--third)] text-sm transition-colors">
            <i class="fas fa-dot-circle text-xs"></i> Submenu 2
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    isOpen: { type: Boolean, required: true }
  },
  data() {
    return {
      submenuOpen: false
    };
  }
};
</script>
