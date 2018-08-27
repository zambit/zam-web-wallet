<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="tsx-wrap">
          <div class="d-flex justify-content-between">
            <h2 class="tsx-title">Transactions</h2>
            <div class="d-flex">
              <button type="button" class="btn btn-link">
                Filter
                <!--<svg class="tsx-icon-chain mr-2">-->
                  <!--<use xlink:href="#tsx-form__icon__chain"></use>-->
                <!--</svg>-->
              </button>
            </div>
          </div>
          <div class="txs-search">

          </div>
          <div class="tsx-body">
            <template v-for="(transaction, index) in transactions">
              <history-item
                :key="transaction.id"
                :transaction="transaction"
                :class="[index !== transactions.length - 1 ? 'border-bottom' : '']"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="row">
          <div class="col-12">
            <div class="tsx-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Currency</th>
                    <th>Buy</th>
                    <th>Sell</th>
                    <th>Changes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BTC/USD</td>
                    <td>20.000</td>
                    <td>22.531</td>
                    <td>+5.5%</td>
                  </tr>
                  <tr>
                    <td>BTC/USD</td>
                    <td>3.500</td>
                    <td>2.900</td>
                    <td>-3.5%</td>
                  </tr>
                  <tr>
                    <td>BTC/USD</td>
                    <td>3.500</td>
                    <td>2.900</td>
                    <td>-3.5%</td>
                  </tr>
                  <tr>
                    <td>BTC/USD</td>
                    <td>3.500</td>
                    <td>2.900</td>
                    <td>-3.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12 mt-4">
            <div class="d-flex flex-column tsx-wrap">
              <div class="d-flex justify-content-between">
                <h2>News</h2>
                <router-link to="/">See all</router-link>
              </div>
              <template v-for="n in 3">
                <div class="d-flex flex-column" :key="`news-${n}`">
                  <h3>Why did we choose the Stellar blockchain?</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry …</p>
                  <time>18 APR 2018</time>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';

import historyItem from '@/components/blocks/historyItem';

export default {
  name: 'history-list',
  data() {
    return {
      transactions: [],
    };
  },
  components: {
    historyItem,
  },
  async created() {
    const response = await api.wallet.transaction.getAll({
      params: {
        // group: 'day',
        count: 20,
      },
    });

    if (response.data.result) {
      this.transactions = response.data.data.grouped_transactions[0].transactions;
    } else {
      alert('Failed to fetch history'); // eslint-disable-line
    }
  },
};
</script>

<style lang="scss" scoped>
.tsx-wrap {
  padding: 19px 16px 0;
  border-radius: 12px;
  background-color: #ffffff;
  border: solid 1px rgba(93, 118, 243, 0.12);
}
</style>
