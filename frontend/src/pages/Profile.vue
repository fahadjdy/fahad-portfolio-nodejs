<template>
  <Header />
  <ProfileComponent />
</template>

<script>
import Header from '../components/layout/Header.vue';
import ProfileComponent from '../components/profile/Profile.vue';

export default {
  components: {
    Header,
    ProfileComponent
  }
};
</script>
