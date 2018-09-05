<template>
  <div>
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
                <button
                  class="btn btn-link pointer p-0 ml-3"
                  type="button"
                  title="Copy address to clipboard"
                  @click="copyAddressToClipboard"
                >
                  <svg class="wallet-panel__icon-copy">
                    <use xlink:href="#wallet-panel__icon__copy"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 col-lg-6">
          <div class="d-flex justify-content-end justify-content-xl-between h-100">
            <div class="d-flex flex-column">
            <span class="wallet-panel__balance text-right text-lg-left">
              {{ balanceInCoins }}
            </span>
              <span class="wallet-panel__fiat-balance text-right text-lg-left">
              {{ balanceInFiat }}
            </span>
              <span class="wallet-panel__coin-cost" hidden>$ 7.560 +5.57% (24h)</span>
            </div>
            <div class="d-none d-xl-flex align-items-center ml-5">
              <button
                type="button" class="wallet-panel__btn"
                @click="$emit('wallet', { wallet: wallet.id, state: 'send' })"
              >
                Send
                <svg class="wallet-panel__btn-icon blue">
                  <use xlink:href="#wallet-card__icon__arrow-up"></use>
                </svg>
              </button>
              <button
                type="button"
                class="wallet-panel__btn ml-3"
                @click="$emit('wallet', { wallet: wallet.id, state: 'deposit' })"
              >
                Deposit
                <svg class="wallet-panel__btn-icon green">
                  <use xlink:href="#wallet-card__icon__arrow-down"></use>
                </svg>
              </button>
            </div>
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
    <div class="row d-xl-none justify-content-center wallet-panel__btn-row">
      <button
        type="button"
        class="wallet-panel__btn-mobile blue"
        @click="$router.push(`/${wallet.coin}/${wallet.wallet_name}/send`)"
      >
          Send
          <svg>
            <use xlink:href="#wallet-card__icon__arrow-up"></use>
          </svg>
        </button>
      <button
        type="button"
        class="wallet-panel__btn-mobile ml-4 green"
        @click="$router.push(`/${wallet.coin}/${wallet.wallet_name}/deposit`)"
      >
          Deposit
          <svg>
            <use xlink:href="#wallet-card__icon__arrow-down"></use>
          </svg>
        </button>
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
  fill: white;
  transition: transform .2s ease, fill .2s ease;

  &:active {
    transform: scale(.5);
    fill: $lightish-green;
  }
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

.wallet-panel__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 53px;
  border-radius: 72px;
  border: none;
  background: white;
  font-size: 1rem;
  font-weight: 300;
  color: #888aa7;
}

.wallet-panel__btn-icon {
  width: 16px;
  height: 16px;
  margin-left: 10px;


  &.green {
    fill: $lightish-green;
  }

  &.blue {
    fill: $sky-blue;
  }
}

.wallet-panel__btn-mobile {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 115px;

  padding: 12px 0;

  border-radius: 72px;
  border: none;

  color: white;

  & > svg {
    fill: white;

    width: 16px;
    height: 16px;

    margin-left: 8px;
  }

  &.green {
    background-color: #8de37f;
  }

  &.blue {
    background-color: #54b9f3;
  }
}

.wallet-panel__btn-row {
  position: relative;

  background-color: #f5f5f5;
  padding: 20px 0;

  &::after {
    content: '';
    position: absolute;
    top: 100%;

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 12px 0 12px;
    border-color: #f5f5f5 transparent transparent transparent;

  }
}
</style>
