<template>
  <div id="main">
    <layout-header />
    <div class="d-flex h-100" ref="layoutWrapper">
      <layout-aside class="layout-aside h-100" ref="layoutAside" @card="toggleSlide" />
      <div class="layout-content d-flex flex-column w-100" ref="layoutContent">
        <wallet-panel :wallet="activeWallet" />
        <transaction-form @show-cards="toggleSlide" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import layoutHeader from '@/components/layout/header';
import layoutAside from '@/components/layout/aside';
import walletPanel from '@/components/blocks/walletPanel';
import transactionForm from '@/components/blocks/transactionForm';

export default {
  name: 'main-page',
  data() {
    return {
      showAside: true,
    };
  },
  components: {
    layoutHeader,
    layoutAside,
    walletPanel,
    transactionForm,
  },
  methods: {
    toggleSlide() {
      document.querySelector('.tsx-root').scrollTo(0, 0);
      if (this.$refs.layoutWrapper.classList.contains('layout-slide-mobile')) {
        return this.$refs.layoutWrapper.classList.remove('layout-slide-mobile');
      }
      return this.$refs.layoutWrapper.classList.add('layout-slide-mobile');
    },
  },
  computed: {
    ...mapGetters([
      'activeWallet',
    ]),
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
</style>
