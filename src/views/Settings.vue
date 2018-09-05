<template>
  <div id="settings">
    <layout-header />
    <div class="d-flex h-100 layout-slide-mobile" ref="layoutWrapper">
      <layout-aside class="layout-aside h-100" ref="layoutAside" @wallet="handleWalletChange"/>
      <div class="layout-content d-flex flex-column w-100" ref="layoutContent">
        <div class="text-center w-100 py-5">
          <h1 style="color: #000000;">This page is under construction</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import layoutHeader from '@/components/layout/header';
import layoutAside from '@/components/layout/aside';

export default {
  name: 'settings-page',
  data() {
    return {
      state: 'send',
    };
  },
  components: {
    layoutAside,
    layoutHeader,
  },
  methods: {
    ...mapActions([
      'setActiveWallet',
    ]),
    handleWalletChange({ wallet, state }) {
      this.$router.push('/');

      this.state = state;
      this.setActiveWallet(wallet);

      this.toggleSlide();
    },
    toggleSlide() {
      const el = document.querySelector('.tsx-root');

      if (el) {
        el.scrollTo(0, 0);
      }

      if (this.$refs.layoutWrapper.classList.contains('layout-slide-mobile')) {
        return this.$refs.layoutWrapper.classList.remove('layout-slide-mobile');
      }
      return this.$refs.layoutWrapper.classList.add('layout-slide-mobile');
    },
  },
};
</script>

<style lang="scss" scoped>
#settings {
  height: 100%;
  overflow: hidden;
}
</style>
