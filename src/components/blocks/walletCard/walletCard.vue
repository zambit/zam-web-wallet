<template>
  <div class="wallet-card">
    <div class="wallet-card__chart-container" :id="`wallet-card-chart-${wallet.id}`"></div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex">
          <svg class="wallet-card__icon">
            <use :xlink:href="coinIconSrc"></use>
          </svg>
          <div class="w-100">
            <div class="row align-items-center">
              <div class="col-7 col-lg-8">
                <span class="wallet-card__name">{{ wallet.wallet_name }}</span>
              </div>
              <div class="col-5 col-lg-4">
                <span class="wallet-card__balance d-block">
                  {{ balanceInCoins }}
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-1">
              <div class="col-7">
                <span class="wallet-card__phone mt-2">{{ phone }}</span>
              </div>
              <div class="col-5">
                <span class="wallet-card__fiat-balance d-block">
                  {{ balanceInFiat }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 text-center">
        <button
          type="button"
          :class="['btn btn-link wallet-card__button', { 'wallet-card__button--disabled' :
          !!disabled }]"
          :disabled="disabled"
          @click="$router.push(`/${wallet.coin}/${wallet.wallet_name}/send`)"
        >
          Send
          <svg class="wallet-card__icon-arrow blue">
            <use xlink:href="#wallet-card__icon__arrow-up"></use>
          </svg>
        </button>
      </div>
      <div class="col-6 text-center">
        <button
          type="button"
          :class="['btn btn-link wallet-card__button', { 'wallet-card__button--disabled' :
          !!disabled }]"
          :disabled="disabled"
          @click="$router.push(`/${wallet.coin}/${wallet.wallet_name}/deposit`)"
        >
          Deposit
          <svg class="wallet-card__icon-arrow green">
            <use xlink:href="#wallet-card__icon__arrow-down"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
]
<script>
import { mapState } from 'vuex';

import { formatBalance } from '@/helpers';

import './icon__bitcoin-cash.svg';
import './icon__bitcoin.svg';
import './icon__ethereum.svg';
import './icon__zam.svg';
import './wallet-card__icon__arrow-down.svg';
import './wallet-card__icon__arrow-up.svg';

export default {
  name: 'wallet-card',
  props: {
    disabled: Boolean,
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

.wallet-card {
  position: relative;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px 12px 12px;
  box-shadow: 0 4px 42px -8px #bec1c5;
}

.wallet-card__chart-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.wallet-card__name {
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  color: $dark-indigo;
}

.wallet-card__balance {
  font-size: 1.125rem;
  line-height: 1;
  font-weight: bold;
  text-align: right;
  color: $dark-indigo;
}

.wallet-card__phone {
  font-size: 0.875rem;
  line-height: 1;
  font-weight: 500;
  color: #888aa7;
}

.wallet-card__fiat-balance {
  font-size: .875rem;
  line-height: 1;
  text-align: right;
  color: #888aa7;
}

.wallet-card__button {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: #888aa7;
}

.wallet-card__button--disabled {
  opacity: .5;
  cursor: not-allowed !important; // override bootstrap .btn styles
  pointer-events: auto;
}

.wallet-card__icon-arrow {
  width: 16px;
  height: 16px;
  margin-left: 8px;

  &.green {
    fill: $lightish-green;
  }

  &.blue {
    fill: $sky-blue;
  }
}

.wallet-card__icon {
  width: 34px;
  height: 34px;
  margin-right: 10px;
}

</style>
