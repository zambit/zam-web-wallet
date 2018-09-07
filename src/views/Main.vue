<template>
  <div id="main">
    <layout-header />
    <div class="d-flex h-100 layout-slide-mobile" ref="layoutWrapper">
      <layout-aside class="layout-aside h-100" ref="layoutAside" @wallet="handleWalletChange" />
      <div class="layout-content d-flex flex-column w-100" ref="layoutContent">
        <wallet-panel :wallet="activeWallet" @wallet="handleWalletChange"/>
        <template v-if="state === 'send'">
          <transaction-form @show-cards="toggleSlide" />
        </template>
        <template v-if="state === 'deposit'">
          <wallet-deposit @show-cards="toggleSlide" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import api from '@/api';

import layoutHeader from '@/components/layout/header';
import layoutAside from '@/components/layout/aside';
import walletPanel from '@/components/blocks/walletPanel';
import transactionForm from '@/components/blocks/transactionForm';
import walletDeposit from '@/components/blocks/walletDeposit';

export default {
  name: 'main-page',
  data() {
    return {
      showAside: true,
      state: '',
    };
  },
  components: {
    layoutHeader,
    layoutAside,
    walletPanel,
    transactionForm,
    walletDeposit,
  },
  watch: {
    $route: {
      async handler(value) {
        this.state = this.$route.params.state;

        const response = await api.wallet.get({});

        if (!response.data.result) {
          return this.$router.push('/');
        }

        const wallet = response.data.data.wallets.find(el => el.coin === value.params.coin &&
          el.wallet_name.toLowerCase() === value.params.name.toLowerCase());

        return wallet ?
          this.setActiveWallet(wallet.id) :
          this.$router.push('/');
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions([
      'setActiveWallet',
    ]),
    handleWalletChange({ wallet, state }) {
      this.state = state;
      this.setActiveWallet(wallet);

      this.toggleSlide();
    },
    toggleSlide() {
      const el = document.querySelector('.tsx-root');

      if (el) {
        el.scrollTo(0, 0);
      }

      console.log('toggle');
      if (this.$refs.layoutWrapper.classList.contains('layout-slide-mobile')) {
        console.log('remove');
        return this.$refs.layoutWrapper.classList.remove('layout-slide-mobile');
      }
      console.log('add');
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
