<template>
  <div class="wallet-panel">
    <div class="row">
      <div class="col-7 col-lg-6">
        <div class="d-flex align-items-center">
          <svg class="wallet-panel__icon d-none d-lg-block">
            <use :xlink:href="coinIconSrc"></use>
          </svg>
          <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
              <h3 class="wallet-panel__name mb-0">{{ wallet.wallet_name }}</h3>
              <svg class="wallet-panel__icon wallet-panel__icon--small d-lg-none">
                <use :xlink:href="coinIconSrc"></use>
              </svg>
            </div>
            <span class="wallet-panel__phone">{{ phone }}</span>
            <div class="d-none d-lg-flex align-items-center">
              <span class="wallet-panel__address">{{ wallet.address }}</span>
              <button class="btn btn-link p-0 ml-3" type="button" @click="copyAddressToClipboard">
                <svg class="wallet-panel__icon-copy">
                  <use xlink:href="#wallet-panel__icon__copy"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-5 col-lg-6">
        <div class="d-flex flex-column">
          <span class="wallet-panel__balance text-right text-lg-left">
            {{ balanceInCoins }}
          </span>
          <span class="wallet-panel__fiat-balance text-right text-lg-left">
            {{ balanceInFiat }}
          </span>
          <span class="wallet-panel__coin-cost" hidden>$ 7.560 +5.57% (24h)</span>
        </div>
      </div>
    </div>
    <div class="row d-lg-none">
      <div class="col-12">
        <div class="d-flex align-items-center mt-4 mt-lg-0">
          <span class="wallet-panel__address w-100">{{ wallet.address }}</span>
          <button class="btn btn-link p-0 ml-3" type="button" @click="copyAddressToClipboard">
            <svg class="wallet-panel__icon-copy">
              <use xlink:href="#wallet-panel__icon__copy"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { formatBalance } from '@/helpers';

import './wallet-panel__icon__copy.svg';

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
          return '#icon__bitcoin-cash';
        case (this.wallet.coin === 'btc'):
          return '#icon__bitcoin';
        case (this.wallet.coin === 'eth'):
          return '#icon__ethereum';
        case (this.wallet.coin === 'zam'):
        default:
          return '#icon__zam';
      }
    },

    balanceInCoins() {
      if (this.wallet.balances[this.wallet.coin]) {
        return formatBalance({
          str: this.wallet.balances[this.wallet.coin],
          decimals: 6,
        });
      }
      return '0';
    },
    balanceInFiat() {
      if (this.wallet.balances.usd) {
        return this.fiats.USD.sign + formatBalance({
          str: this.wallet.balances.usd,
          decimals: 2,
        });
      }
      return `${this.fiats.USD.sign}0`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.wallet-panel {
  padding: 22px 12px 28px 28px;
  background-image: linear-gradient(to left, #454e8e, #212655);

  @include media-breakpoint-down(md) {
    padding: 22px;
  }
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

  @include media-breakpoint-down(md) {
    font-size: 1rem;

    margin-top: 0;
  }
}

.wallet-panel__address {
  width: 100%;
  font-size: .875rem;
  font-weight: 500;
  color: #ffffff;

  @include media-breakpoint-down(md) {
    width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.wallet-panel__balance {
  font-size: 1.625rem;
  line-height: 1;
  font-weight: bold;
  color: #ffffff;

  @include media-breakpoint-down(md) {
    font-size: 1.125rem;
    line-height: inherit;
  }
}

.wallet-panel__icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  margin-right: 35px;
}

.wallet-panel__icon-copy {
  width: 24px;
  height: 24px;
}

.wallet-panel__icon--small {
  width: 26px;
  height: 26px;

  margin-left: 9px;
  margin-right: 0;
}

.wallet-panel__fiat-balance {
  font-size: 1.125rem;
  color: #ffffff;

  @include media-breakpoint-down(md) {
    font-size: 1rem;
  }
}
</style>
