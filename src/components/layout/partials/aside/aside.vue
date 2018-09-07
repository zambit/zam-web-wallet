<template>
  <aside class="aside">
    <section class="aside__total-balance-wrap">
      <div class="aside__total-fiat-balance">$ {{ totalBalanceFiat }}</div>
      <div class="aside__total-balance">{{ totalBalanceBtc }} BTC</div>
    </section>
    <section class="aside__wallets">
      <div class="aside__wallets-menu d-flex justify-content-between flex-shrink-0">
        <h3 class="block-title">My accounts</h3>
        <button type="button" class="btn btn-link" hidden>Add new +</button>
      </div>
      <div class="aside__wallets-wrap d-flex flex-column">
        <template v-for="wallet in wallets">
          <wallet-card
            :key="wallet.id"
            :wallet="wallet"
            class="mb-3"
            @wallet="EventBus.$emit('wallet', $event)"
          />
        </template>
      </div>
    </section>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

import EventBus from '@/eventBus'; // eslint-disable-line
import walletCard from '@/components/blocks/walletCard/index';

export default {
  name: 'layout-aside',
  components: {
    walletCard,
  },
  computed: {
    ...mapState({
      wallets: state => state.wallets.items,
      totalBalanceFiat: state => state.user.totalBalanceFiat,
      totalBalanceBtc: state => state.user.totalBalanceBtc,
    }),
  },
  async created() {
    await this.$store.dispatch('fetchCurrentUser', { convert: 'usd' });
    return this.$store.dispatch('fetchWallets', { convert: 'usd' });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.aside {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 420px;
  border-right: 2px solid #efefef;
}

.aside__wallets-menu {
  padding: 15px 24px;
}

.aside__wallets-wrap {
  padding: 10px 24px;
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.aside__total-balance-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 128px;
  flex-shrink: 0;
  border-bottom: 2px solid #efefef;

  text-align: center;
}

.aside__wallets {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.aside__total-fiat-balance {
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -1.5px;
  color: #4a4a4a;

  & > small {
    font-size: 1.125rem;
  }
}

.aside__total-balance {
  font-size: .875rem;
  color: #6e6e6e;
}
</style>
