<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between">
    <h1 class="text-3xl font-bold">Admin Dashboard</h1>
    <nav>
      <ul class="flex">
        <li class="mr-4"><router-link to="/admin/profile">Profile</router-link></li>
        <li class="mr-4"><router-link to="/admin/experience">Experience</router-link></li>
        <li class="mr-4"><router-link to="/admin/education">Education</router-link></li>
        <li class="mr-4"><router-link to="/admin/skills">Skills</router-link></li>
        <li><router-link to="/login">Logout</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>

</style>
