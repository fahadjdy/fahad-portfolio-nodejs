<template>
  <Base>
    <ProfileComponent />
  </Base>
</template>

<script>
import ProfileComponent from '../components/profile/ProfileComponent.vue';
import Base from '../components/layout/Base.vue';

export default {
  components: {
    Base,
    ProfileComponent
  }
};
</script>
