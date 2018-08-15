<template>
  <div class="wallet-panel">
    <div class="row">
      <div class="col-6">
        <div class="d-flex align-items-center">
          <img :src="require(`./${coinIconSrc}`)" class="wallet-panel__icon" alt="">
          <div class="d-flex flex-column">
            <h3 class="wallet-panel__name mb-0">{{ wallet.wallet_name }}</h3>
            <span class="wallet-panel__phone">{{ phone }}</span>
            <div class="d-flex align-items-center">
              <span class="wallet-panel__address">{{ wallet.address }}</span>
              <button class="btn btn-link p-0 ml-3" type="button" @click="copyAddressToClipboard">
                <img src="./wallet-panel__icon__copy.svg" alt="">
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="d-flex flex-column">
          <span class="wallet-panel__balance">
            {{ balanceInCoins }}
          </span>
          <span class="wallet-panel__fiat-balance">
            {{ balanceInFiat }}
          </span>
          <span class="wallet-panel__coin-cost" hidden>$ 7.560 +5.57% (24h)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'wallet-panel',
  props: {
    wallet: {
      type: Object,
      required: true,
      default() {
        return {
          address: '',
          balances: {},
          coin: '',
          id: '',
          wallet_name: '',
        };
      },
    },
  },
  methods: {
    copyAddressToClipboard() {
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.setAttribute('value', this.wallet.address);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    },
  },
  computed: {
    ...mapState({
      phone: state => state.user.phone,
      fiats: state => state.common.fiats,
    }),
    coinIconSrc() {
      switch (true) {
        case (this.wallet.coin === 'bch'):
          return 'icon__bitcoin-cash.svg';
        case (this.wallet.coin === 'btc'):
          return 'icon__bitcoin.svg';
        case (this.wallet.coin === 'eth'):
          return 'icon__ethereum.svg';
        case (this.wallet.coin === 'zam'):
        default:
          return 'icon__zam.svg';
      }
    },

    balanceInCoins() {
      if (this.wallet.balances[this.wallet.coin]) {
        return parseFloat(this.wallet.balances[this.wallet.coin]);
      }
      return '0.00';
    },
    balanceInFiat() {
      if (this.wallet.balances.usd) {
        return this.fiats.USD.sign + parseFloat(this.wallet.balances.usd).toFixed(2);
      }
      return `${this.fiats.USD.sign}0.00`;
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet-panel {
  padding: 22px 12px 28px 28px;
  background-image: linear-gradient(to left, #454e8e, #212655);
}

.wallet-panel__name {
  font-size: 1.25rem;
  line-height: 1;
  font-weight: bold;
  color: #ffffff;
}

.wallet-panel__phone {
  font-size: .875rem;
  font-weight: 500;
  color: #888aa7;
  margin-top: 10px;
}

.wallet-panel__address {
  font-size: .875rem;
  font-weight: 500;
  color: #ffffff;
}

.wallet-panel__balance {
  font-size: 1.625rem;
  line-height: 1;
  font-weight: bold;
  color: #ffffff;
}

.wallet-panel__icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  margin-right: 35px;
}

.wallet-panel__fiat-balance {
  font-size: 1.125rem;
  color: #ffffff;
}
</style>
