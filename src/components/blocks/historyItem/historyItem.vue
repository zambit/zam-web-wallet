<template>
  <div class="history-item d-flex">
    <svg class="history-item__coin-icon">
      <use :xlink:href="coinIconSrc"></use>
    </svg>
    <div class="w-100 history-item__inner-wrap">
      <div class="row no-gutters">
        <div class="col-6">
          <span class="history-item__title">
            {{ transactionTitle }}
          </span>
        </div>
        <div class="col-6 text-right">
          <span :class="['history-item__coin-amount', { 'green' : transaction.sender }]">
            {{ transaction.sender ? '+' : '-'}}
            {{ transactionAmountInCoins }}
          </span>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-6">
          <span class="history-item__from">
            {{ transaction.sender || transaction.recipient }}</span>
        </div>
        <div class="col-6 text-right">
          <span class="history-item__amount-fiat">
            {{ transaction.sender ? '+' : '-'}}
            {{ fiats.USD.sign + transactionAmountInFiat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import capitalize from 'lodash.capitalize';

import { formatBalance } from '@/helpers';

export default {
  name: 'history-item',
  props: {
    transaction: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapState({
      fiats: state => state.common.fiats,
    }),
    coinIconSrc() {
      switch (true) {
        case (this.transaction.coin === 'bch'):
          return '#icon__bitcoin-cash';
        case (this.transaction.coin === 'btc'):
          return '#icon__bitcoin';
        case (this.transaction.coin === 'eth'):
          return '#icon__ethereum';
        case (this.transaction.coin === 'zam'):
        default:
          return '#icon__zam';
      }
    },
    transactionTitle() {
      const coin = this.transaction.coin ? this.transaction.coin.toUpperCase() : '';
      const status = this.transaction.status === 'success' ?
        'Done' :
        capitalize(this.transaction.status);

      if (!coin) {
        return '';
      }

      return `${status} ${coin}`;
    },
    transactionAmountInFiat() {
      if (this.transaction.amount.usd) {
        return formatBalance({
          str: this.transaction.amount.usd,
          decimals: 2,
        });
      }
      return '0';
    },
    transactionAmountInCoins() {
      if (this.transaction.amount[this.transaction.coin]) {
        return formatBalance({
          str: this.transaction.amount[this.transaction.coin],
          decimals: 6,
        });
      }
      return '0';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.history-item {
  padding-top: 15px;
}

.history-item__inner-wrap {
  padding-bottom: 15px;
}

.history-item__coin-icon {
  width: 34px;
  height: 34px;

  margin-right: 8px;
}

.history-item__title {
}

.history-item__coin-amount {
  font-size: 1rem;
  font-weight: 500;
  color: $dark-indigo;
}

.history-item__from,
.history-item__amount-fiat {
  display: block;

  font-size: .875rem;
  color: #888aa7;

  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

.history-item {
  &:not(:last-child) {
    .history-item__inner-wrap {
      border-bottom: 1px solid $silver;
    }
  }
}

.green {
  color: $weird-green;
}

</style>
