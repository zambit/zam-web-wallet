<template>
  <div id="app" :class="[ $route.name ]">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/styles/main";

#app {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: visible;

  &.sign-in,
  &.sign-up,
  &.forgot-password,
  &.welcome {
    background-color: $dark-indigo;
  }
}
</style>
