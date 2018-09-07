<template>
  <div id="main">
    <layout-header />
    <div
      ref="layoutWrapper"
      :class="['d-flex h-100', { 'layout-slide-mobile' : showContent }]"
    >
      <layout-aside class="layout-aside h-100" ref="layoutAside"/>
      <div class="layout-content d-flex flex-column w-100" ref="layoutContent">
        <slot name="content"></slot>
      </div>
    </div>
    <transition appear name="fade">
      <div
        v-if="showContent"
        class="pointer"
        @click="showContent = false"
      >
        <svg class="layout__wallets-btn">
          <use xlink:href="#button__show-sidebar"></use>
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import EventBus from '@/eventBus';
import layoutAside from '@/components/layout/partials/aside';
import layoutHeader from '@/components/layout/partials/header';

export default {
  name: 'layout-main',
  data() {
    return {
      showContent: true,
    };
  },
  components: {
    layoutAside,
    layoutHeader,
  },
  watch: {
    $route: {
      handler() {
        this.showContent = true;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions([
      'setActiveWallet',
    ]),
    handleWalletEvent({ wallet }) {
      this.showContent = true;
      this.setActiveWallet(wallet);
    },
  },
  created() {
    EventBus.$on('wallet', this.handleWalletEvent);
  },
  beforeDestroy() {
    EventBus.$off('wallet', this.handleWalletEvent);
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/_settings.scss";

html, body {
  background-color: white !important;
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

#main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: black;
  overflow: hidden;
}

.layout-aside {
  transition: transform .2s ease;

  @include media-breakpoint-down(md) {
    width: 100vw;
  }
}

.layout-content {
  overflow-x: hidden;
  overflow-y: auto;

  @include media-breakpoint-down(md) {
    min-width: 100vw !important;
    transition: transform .2s ease;
    transform: translateX(100%);
  }
}

.layout-slide-mobile {
  @include media-breakpoint-down(md) {
    .layout-aside,
    .layout-content {
      transform: translate(-100%, 0);
    }
  }
}

.layout__wallets-btn {
  position: fixed;

  bottom: 20px;
  right: 20px;

  width: 100px;
  height: 100px;

  @include media-breakpoint-up(lg) {
    display: none;
  }
}
</style>

