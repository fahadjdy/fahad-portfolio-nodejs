<template>
  <Header />
  <ProfileComponent />
  <Footer />
</template>

<script>
import Header from '../components/layout/Header.vue';
import ProfileComponent from '../components/profile/Profile.vue';
import Footer from '../components/layout/Footer.vue';

export default {
  components: {
    Header,
    ProfileComponent,
    Footer
  }
};
</script>
