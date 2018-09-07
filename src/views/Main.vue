<template>
  <div id="main">
    <layout-main>
      <template slot="content">
        <wallet-panel :wallet="activeWallet"/>
        <template v-if="state === 'send'">
          <transaction-form />
        </template>
        <template v-if="state === 'deposit'">
          <wallet-deposit />
        </template>
      </template>
    </layout-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import api from '@/api';

import layoutMain from '@/components/layout/main';
import walletPanel from '@/components/blocks/walletPanel';
import transactionForm from '@/components/blocks/transactionForm';
import walletDeposit from '@/components/blocks/walletDeposit';

import '@/components/layout/partials/aside/button__show-sidebar.svg';

export default {
  name: 'main-page',
  data() {
    return {
      state: '',
    };
  },
  components: {
    layoutMain,
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
  @include media-breakpoint-down(lg) {
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
