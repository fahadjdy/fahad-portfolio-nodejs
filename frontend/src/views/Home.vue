<template>
  <Base>
    <div>
      <h1>Home</h1>
      <p>Welcome to my portfolio website!</p>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <Profile/>
          </div>
          <div class="col-6">
            <Experience/>
          </div>
        </div>
      </div>
    </div>
  </Base>
</template>

<script setup>
import Base from '../views/layout/Base.vue';
import Profile from '../views/admin/Profile.vue';
import Experience from '../views/admin/Experience.vue';
</script>
