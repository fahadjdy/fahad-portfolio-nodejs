<template>
  <header >
    <h1 >Admin Dashboard</h1>
    <nav>
      <ul >
        <li >
          <router-link
            to="/admin/profile"
          >
            Profile
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/experience">
            Experience
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/education">
            Education
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/skills">
            Skills
          </router-link>
        </li>
        <li>
          <router-link
            to="/login">
            Logout
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
