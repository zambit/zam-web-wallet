<template>
  <div class="wallet-card" @click="$emit('card', wallet.id)">
    <div class="row">
      <div class="col-12">
        <div class="d-flex">
          <img :src="require(`./${coinIconSrc}`)" class="wallet-card__icon" alt="">
          <div class="w-100">
            <div class="row align-items-center">
              <div class="col-8">
                <span class="wallet-card__name">{{ wallet.wallet_name }}</span>
              </div>
              <div class="col-4">
                <span class="wallet-card__balance d-block">
                  {{ balanceInCoins }}
                </span>
              </div>
            </div>
            <div class="row align-items-center mt-1">
              <div class="col-8">
                <span class="wallet-card__phone mt-2">{{ phone }}</span>
              </div>
              <div class="col-4">
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
          class="btn btn-link wallet-card__button wallet-card__button--send"
        >
          Send
        </button>
      </div>
      <div class="col-6 text-center">
        <button
          type="button"
          class="btn btn-link wallet-card__button wallet-card__button--deposit"
        >
          Deposit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'wallet-card',
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
        return this.fiats.USD.sign + parseFloat(this.wallet.balances.usd);
      }
      return `${this.fiats.USD.sign}0.00`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.wallet-card {
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px 12px 12px;
  box-shadow: 0 4px 42px -8px #bec1c5;
  cursor: pointer;
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

  &::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: .5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto;
  }

  &.wallet-card__button--send::after {
    background-image: url("./wallet-card__icon__arrow-down--blue.svg");
  }

  &.wallet-card__button--deposit::after {
    background-image: url("./wallet-card__icon__arrow-up--green.svg");
  }
}

.wallet-card__icon {
  width: 34px;
  height: 34px;
  margin-right: 10px;
}

</style>
