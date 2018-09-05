<template>
  <div class="container-fluid h-100 py-4">
    <div class="row h-100">
      <div class="col-12 col-md-12 col-lg-6">
        <div class="tsx-wrap">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="block-title">Transactions</h2>
            <div v-if="transactions.length > 0" class="d-flex">
              <button type="button" class="btn btn-link p-0">
                Filter
                <svg class="tsx__filter-icon">
                  <use xlink:href="#icon__filters"></use>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="transactions.length > 0" class="tsx-search">
            <div class="d-flex">
              <input
                v-model="search"
                placeholder="Search"
                type="text"
                title="search transaction"
                class="w-100 tsx__search-input"
              >
            </div>
          </div>
          <div
            v-infinite-scroll="fetchHistory"
            :infinite-scroll-disabled="historyIsFetching"
            :infinite-scroll-distance="10"
            class="tsx-body mt-3"
            style="overflow: auto; height: calc(100% - 100px)"
          >
            <template v-if="transactions.length === 0">
              <div class="d-flex align-items-center justify-content-center h-100">
                <p class="tsx-stub">No data in this period</p>
              </div>
            </template>
            <template v-else>
              <template v-for="(transaction, index) in transactions">
                <div :key="index" class="history-group d-flex justify-content-between">
                  <span class="history-group__date">
                    {{ parseGroupDate(transaction.end_date) }}
                  </span>
                  <span class="history-group__total-amount">
                    {{ formatGroupTotalAmount(transaction.total_amount.usd) }}
                  </span>
                </div>
                <div :key="`t-${index}`" class="mt-2">
                  <template v-for="item in transaction.items">
                    <history-item
                      :key="item.id"
                      :transaction="item"
                    />
                  </template>
                </div>
              </template>
              <p v-if="page === null" :key="'stub'" class="text-center">End of history</p>
            </template>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-lg-6">
        <div class="row h-100">
          <div class="col-12 h-50">
            <div class="table-wrap tsx-wrap">
              <table class="table">
                <thead class="table__thead">
                  <tr>
                    <th class="table__th">Currency</th>
                    <th class="table__th">Buy</th>
                    <th class="table__th">Sell</th>
                    <th class="table__th">Changes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table__tr">
                    <td class="table__pair">
                      <svg class="table__pair-icon">
                        <use xlink:href="#icon__bitcoin"></use>
                      </svg>
                      <span>BTC/USD</span>
                    </td>
                    <td class="table__buy">20.000</td>
                    <td class="table__sell">22.531</td>
                    <td class="table__change">+5.5%</td>
                  </tr>
                  <tr class="table__tr">
                    <td class="table__pair">
                      <svg class="table__pair-icon">
                        <use xlink:href="#icon__bitcoin-cash"></use>
                      </svg>
                      <span>BTC/USD</span>
                    </td>
                    <td class="table__buy">3.500</td>
                    <td class="table__sell">2.900</td>
                    <td class="table__change">-3.5%</td>
                  </tr>
                  <tr class="table__tr">
                    <td class="table__pair">
                      <svg class="table__pair-icon">
                        <use xlink:href="#icon__ethereum"></use>
                      </svg>
                      <span>BTC/USD</span>
                    </td>
                    <td class="table__buy">3.500</td>
                    <td class="table__sell">2.900</td>
                    <td class="table__change">-3.5%</td>
                  </tr>
                  <tr class="table__tr">
                    <td class="table__pair">
                      <svg class="table__pair-icon">
                        <use xlink:href="#icon__zam"></use>
                      </svg>
                      <span>BTC/USD</span>
                    </td>
                    <td class="table__buy">3.500</td>
                    <td class="table__sell">2.900</td>
                    <td class="table__change">-3.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12 pt-4 h-50">
            <div class="news-wrap tsx-wrap">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between">
                  <h2 class="block-title">News</h2>
                  <router-link to="/">See all</router-link>
                </div>
                <template v-for="n in 3">
                  <div class="d-flex flex-column news" :key="`news-${n}`">
                    <h3 class="news__title">Why did we choose the Stellar blockchain?</h3>
                    <p class="news__desc">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry
                      …</p>
                    <time class="news__time-posted">18 APR 2018</time>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
import { format } from 'date-fns';

import api from '@/api';
import { formatBalance } from '@/helpers';

import historyItem from '@/components/blocks/historyItem';

import './icon__filters.svg';

export default {
  name: 'history-list',
  data() {
    return {
      page: 0,
      search: '',
      historyIsFetching: false,
      transactions: [],
    };
  },
  directives: {
    infiniteScroll,
  },
  components: {
    historyItem,
  },
  methods: {
    async fetchHistory() {
      if (this.page === null) {
        return false;
      }

      const date = new Date();
      this.historyIsFetching = true;

      const response = await api.wallet.transaction.getAll({
        params: {
          group: 'day',
          count: 38,
          page: this.page,
          timezone: date.getTimezoneOffset() / 60,
        },
      });

      if (response.data.result) {
        this.page = response.data.data.next;
        console.log(response.data.data.transactions);
        this.transactions = [...this.transactions, ...response.data.data.transactions];
      } else {
        alert('Failed to fetch history'); // eslint-disable-line
      }
      this.historyIsFetching = false;

      return true;
    },
    parseGroupDate(unix) {
      return format(unix * 1000, 'DD MMM, dd');
    },
    formatGroupTotalAmount(number) {
      return formatBalance({
        str: number,
        decimals: 2,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.tsx-wrap {
  height: 100%;
  padding: 19px 16px;
  border-radius: 12px;
  background-color: #ffffff;
  border: solid 1px rgba(93, 118, 243, 0.12);
  overflow: hidden;

  @include media-breakpoint-down(lg) {
    height: auto;
  }
}

.tsx-body {
  overflow: auto;

  margin: 0 -16px;
  padding: 0 16px;
}

.table-wrap,
.news-wrap {
  overflow: auto;
}

.tsx__filter-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}

.tsx-search {
  margin-top: 16px;
}

.tsx__search-input {
  border-radius: 4px;
  border: solid 2px #ececec;
  font-size: 1rem;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 30px;

  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: $silver;
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: $silver;
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: $silver;
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: $silver;
  }
}

.news {
  padding: 20px 0;

  &:not(:last-child) {
    border-bottom: 1px solid $silver;
  }
}

.news__title {
  font-size: 16px;
  font-weight: 500;
  color: #111649;
  margin-bottom: 0;
}

.news__desc {
  font-size: .875rem;
  line-height: 1;
  color: #888aa7;
  margin-top: 4px;
  margin-bottom: 0;
}

.news__time-posted {
  font-size: .8125rem;
  line-height: 1;
  color: $silver;
  margin-top: 10px;
}

.table {
  width: 100%;
  table-layout: fixed;
}

.table__thead {
}

.table__th {
  font-size: 1rem;
  font-weight: 100;
  color: #888aa7;
}

.table__tr {
  border-bottom: 1px solid $silver;
}

.table__pair {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #1a1f50;
  padding: 20px 0;
}

.table__pair-icon {
  width: 34px;
  height: 34px;
  margin-right: 10px;
}

.table__buy,
.table__sell {
  font-size: 1.125rem;
  font-weight: 500;
  color: $dark-indigo;
}

.table__change {
  font-size: 1.125rem;
  font-weight: 500;
  color: #8ad87d;
}

.history-group {
}

.history-group__date {
  font-size: 1rem;
  color: #888aa7;
}

.history-group__total-amount {
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
  color: $dark-indigo;
}

.tsx-stub {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.2px;
  text-align: center;
  color: #888aa7;
}
</style>
