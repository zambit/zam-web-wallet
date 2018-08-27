<template>
  <div class="history-icon d-flex">
    <svg class="history-item__coin-icon">
      <use :xlink:href="coinIconSrc"></use>
    </svg>
    <div class="w-100">
      <div class="row no-gutters">
        <div class="col-6">
          <span>
            {{ transaction.sender ? `Recieved ${transaction.coin }` : `Sent ${transaction.coin}` }}
          </span>
        </div>
        <div class="col-6 text-right">
          <span>{{ transaction.amount.btc }}</span>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-6">
          <span>{{ transaction.sender || transaction.recipient }}</span>
        </div>
        <div class="col-6 text-right">
          <span>{{ transaction.amount.usd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { formatBalance } from '@/helpers';

export default {
  name: 'history-item',
  props: {
    transaction: {
      type: Object,
      default() {
        return {

        };
      },
    },
  },
  computed: {
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
  },
};
</script>

<style lang="scss" scoped>
.history-item__coin-icon {
  width: 34px;
  height: 34px;
}
</style>
