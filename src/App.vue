<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app-root',
  mounted() {
    window.localStorage.setItem('visited', '1');
  },
};
</script>

<style lang="scss">
@import "assets/styles/main";
</style>
