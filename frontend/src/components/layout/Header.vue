<template>
  <header >
    <h1 >Admin Dashboard</h1>
     <!-- Sticky Navbar -->
  <nav id="navbar" class="sticky-nav bg-white/90 backdrop-blur-sm fixed w-full top-0 left-0 z-40 border-b border-slate-200">
    <div class="container mx-auto flex justify-between items-center py-3 px-4">
     <router-link to="/" class="text-2xl font-black text-blue-600 tracking-tight">Fahad Jadiya</router-link>
      <ul class="flex space-x-5 md:space-x-8 text-base font-medium">
        <li>
          <router-link to="/admin/profile" class="nav-link hover:text-blue-600 transition">
            <i class="fas fa-user"></i> Profile
          </router-link>
        </li>
        <li>
          <router-link to="/admin/experience" class="nav-link hover:text-blue-600 transition">
            <i class="fas fa-user"></i> Experience
          </router-link>
        </li>
        <li>
          <router-link to="/admin/skills" class="nav-link hover:text-blue-600 transition">
            <i class="fas fa-user"></i> Skills
          </router-link>
        </li>
        <li>
          <router-link to="/login" class="nav-link hover:text-blue-600 transition">
            <i class="fas fa-user"></i> Logout
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  </header>
</template>
