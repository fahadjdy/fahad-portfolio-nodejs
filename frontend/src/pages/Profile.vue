<template>
  <Base>
    <ProfileComponent />
    <Footer />
  </Base>
</template>

<script>
import ProfileComponent from '../components/profile/Profile.vue';
import Footer from '../components/layout/Footer.vue';
import Base from '../components/layout/Base.vue';

export default {
  components: {
    Base,
    ProfileComponent,
    Footer
  }
};
</script>
