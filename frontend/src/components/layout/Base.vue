<template>
  <div>
    <!-- Header -->
    <HeaderFile />

    <!-- Page content -->
    <main>
      <slot></slot>
    </main>

    <!-- Footer -->
    <FooterFile />
  </div>
</template>

<script>
import HeaderFile from './Header.vue';
import FooterFile from './Footer.vue';

export default {
  name: 'BaseLayout',
  components: {
    HeaderFile,
    FooterFile
  }
};
</script>

<style scoped>
main {
  min-height: calc(100vh - 150px); /* Adjust according to header/footer height */
  padding: 20px;
}
</style>
