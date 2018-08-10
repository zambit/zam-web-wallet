<template>
  <aside class="aside">
    <section class="aside__total-balance-wrap">
      <div class="aside__total-fiat-balance">$ 212,456</div>
      <div class="aside__total-balance">28.3467 BTC</div>
    </section>
    <section class="aside__wallets">
      <div class="aside__wallets-menu d-flex justify-content-between flex-shrink-0">
        <h3>My accounts</h3>
        <button type="button" class="btn btn-link" hidden>Add new +</button>
      </div>
      <div class="aside__wallets-wrap d-flex flex-column">
        <template v-for="wallet in wallets">
          <wallet-card
            :key="wallet.id"
            :wallet="wallet"
            class="mb-3"
            @card="setActiveWallet($event)"
          />
        </template>
      </div>
    </section>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import walletCard from '@/components/blocks/walletCard';

export default {
  name: 'layout-aside',
  components: {
    walletCard,
  },
  methods: {
    ...mapActions([
      'setActiveWallet',
    ]),
  },
  computed: {
    ...mapState({
      wallets: state => state.wallets.items,
    }),
  },
  async created() {
    return this.$store.dispatch('fetchWallets');
  },
};
</script>

<style lang="scss" scoped>
.aside {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 420px;
  border-right: 2px solid #efefef;
}

.aside__wallets-menu {
  padding: 10px 24px;
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
