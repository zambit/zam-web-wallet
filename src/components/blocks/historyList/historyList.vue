<template>
  <div class="container-fluid h-100 py-4 position-relative">
    <div :class="['row h-100', { 'blurred' : showFilters } ]">
      <div class="col-12 col-md-12 col-lg-6">
        <div class="tsx-wrap h-100">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="block-title">Transactions</h2>
            <div v-if="transactions.length > 0" class="d-flex">
              <button type="button" class="btn btn-link p-0" @click="toggleFiltersVisibility">
                Filter
                <svg class="tsx__filter-icon">
                  <use xlink:href="#icon__filters"></use>
                </svg>
              </button>
            </div>
          </div>
          <!--<div v-if="transactions.length > 0" class="tsx-search">-->
          <!--<div class="d-flex">-->
          <!--<input-->
          <!--v-model="search"-->
          <!--placeholder="Search"-->
          <!--type="text"-->
          <!--title="search transaction"-->
          <!--class="w-100 tsx__search-input"-->
          <!--&gt;-->
          <!--</div>-->
          <!--</div>-->
          <div
            v-infinite-scroll="infiniteScrollCallback"
            :infinite-scroll-disabled="historyIsFetching"
            :infinite-scroll-distance="10"
            class="tsx-body mt-3"
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
                    {{ parseGroupDate(transaction.end_date - 1) }}
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
      <div class="col-12 col-md-12 col-lg-6 mt-4 mt-lg-0">
        <div class="row h-100">
          <div class="col-12 col-wrap">
            <div class="stub">
              <h3>Coming soon...</h3>
            </div>
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
          <div class="col-12 col-wrap pt-4">
            <div class="news-wrap tsx-wrap">
              <div class="stub">
                <h3>Coming soon...</h3>
              </div>
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
    <transition appear name="fade">
      <div v-show="showFilters" class="filters">
        <button type="submit" class="filters__close-btn" @click="toggleFiltersVisibility">
          <svg class="filters__close-icon">
            <use xlink:href="#navbar__icon__close"></use>
          </svg>
        </button>
        <div class="container-fluid filters__overlay h-100">
          <div class="row justify-content-center h-100">
            <div class="col-12 col-md-6 col-xl-5">
              <div class="d-flex flex-column h-100">


                <div class="filters__item">
                  <h4 class="filters__item-header">Transaction Date</h4>
                  <div class="d-flex mt-3">
                    <div class="">
                      <input
                        v-model="formData.group"
                        id="groupDay"
                        class="d-none"
                        type="radio"
                        name="group"
                        value="day"
                      >
                      <label
                        for="groupDay"
                        :class="['filters__tag', { 'filters__tag--active' : formData.group ===
                        'day' }]"
                      >
                        Day
                      </label>
                    </div>
                    <div class="ml-3">
                      <input
                        v-model="formData.group"
                        id="groupWeek"
                        class="d-none"
                        type="radio"
                        name="group"
                        value="week"
                      >
                      <label
                        for="groupWeek"
                        :class="['filters__tag', { 'filters__tag--active' : formData.group ===
                        'week' }]"
                      >
                        Week
                      </label>
                    </div>

                    <div class="ml-3">
                      <input
                        v-model="formData.group"
                        id="groupMonth"
                        class="d-none"
                        type="radio"
                        name="group"
                        value="month"
                      >
                      <label
                        for="groupMonth"
                        :class="['filters__tag', { 'filters__tag--active' : formData.group ===
                        'month' }]"
                      >
                        Month
                      </label>
                    </div>
                  </div>
                </div>


                <div class="filters__item">
                  <h4 class="filters__item-header">Select dates</h4>
                  <div class="d-flex mt-3">
                    <input
                      v-model="formData.from_time"
                      type="text"
                      class="filters__date-input"
                      @input="formData.from_time = $event.target.value"
                    >
                    <input
                      v-model="formData.until_time"
                      type="text"
                      class="filters__date-input ml-3"
                      @input="formData.until_time = $event.target.value"
                    >
                  </div>
                </div>


                <div class="filters__item">
                  <h4 class="filters__item-header">Operation</h4>
                  <div class="d-flex mt-3">
                    <div>
                      <input
                        v-model="formData.sent"
                        class="d-none"
                        type="checkbox"
                        id="sent"
                      >
                      <label
                        :class="['filters__tag', { 'filters__tag--active' : formData.sent }]"
                        for="sent"
                      >
                        Sent
                      </label>
                    </div>
                    <div class="ml-3">
                      <input
                        v-model="formData.received"
                        class="d-none"
                        type="checkbox"
                        id="received"
                      >
                      <label
                        :class="['filters__tag', { 'filters__tag--active' : formData.received }]"
                        for="received"
                      >
                        Received
                      </label>
                    </div>
                  </div>
                </div>


                <div class="filters__item">
                  <h4 class="filters__item-header">Coins</h4>
                  <div class="d-flex mt-3">
                    <template v-for="(coin, index) in coinsInUse">
                      <div :key="coin" :class="[{'ml-3' : index !== 0 }]">
                        <input
                          v-model="formData.coin"
                          :value="coin"
                          :id="coin"
                          class="d-none"
                          :type="formData.coin === coin ? 'checkbox' : 'radio'"
                          name="coin"
                        >
                        <label
                          :class="['filters__coin', { 'filters__coin--active' : formData.coin ===
                          coin }]"
                          :for="coin"
                        >
                          <svg class="filters__coin-icon">
                            <use :xlink:href="`#icon__${coin}`"></use>
                          </svg>
                          <span class="filters__coin-name">{{ coin.toUpperCase() }}</span>
                        </label>
                      </div>
                    </template>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn filters__btn mt-auto mx-auto"
                  @click="submitFilters"
                >Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import Inputmask from 'inputmask';
import { format } from 'date-fns';

import api from '@/api';
import { formatBalance } from '@/helpers';

import historyItem from '@/components/blocks/historyItem';

import './icon__filters.svg';
import './icon__zam.svg';
import './icon__bch.svg';
import './icon__btc.svg';
import './icon__eth.svg';

export default {
  name: 'history-list',
  data() {
    return {
      page: 0,
      search: '',
      showFilters: false,
      historyIsFetching: false,
      formData: {
        group: 'day',
        from_time: '',
        until_time: '',
        sent: false,
        received: false,
        coin: null,
      },
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
    async fetchHistory({ params = {}, replace = true }) {
      if (replace) {
        this.page = 0;
      }

      if (this.page === null) {
        return false;
      }

      const date = new Date();
      this.historyIsFetching = true;

      const response = await api.wallet.transaction.getAll({
        params: {
          group: params.group,
          from_time: params.from_time,
          until_time: params.until_time,
          direction: params.direction,
          coin: params.coin,
          count: 38,
          page: this.page,
          timezone: date.getTimezoneOffset() / 60,
        },
      });

      if (response.data.result) {
        this.page = response.data.data.next;
        this.transactions = replace ?
          [...response.data.data.transactions] :
          [...this.transactions, ...response.data.data.transactions];
      } else {
        alert('Failed to fetch history'); // eslint-disable-line
      }
      this.historyIsFetching = false;

      return true;
    },
    async submitFilters() {
      await this.fetchHistory({
        params: {
          group: this.formData.group,
          from_time: this.fromTime,
          until_time: this.untilTime,
          direction: this.direction,
          coin: this.formData.coin || null,
        },
        replace: true,
      });

      this.toggleFiltersVisibility();
    },
    async infiniteScrollCallback() {
      await this.fetchHistory({
        params: {
          group: this.formData.group,
          from_time: null,
          until_time: null,
          direction: null,
          coin: null,
        },
        replace: false,
      });
    },
    toggleFiltersVisibility() {
      this.showFilters = !this.showFilters;

      document.querySelector('.layout-content').classList.toggle('overflow-hidden');
      document.querySelector('.layout__wallets-btn').classList.toggle('d-none');
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
  computed: {
    ...mapGetters({
      coinsInUse: 'coinsInUse',
    }),
    fromTime() {
      const [date, month, year] = this.formData.from_time.split('.');

      if (Number.isNaN(+date) || Number.isNaN(+month) || Number.isNaN(+year)) {
        return null;
      }

      return Math.floor(+new Date(Number(`20${year}`), month - 1, date) / 1000);
    },
    untilTime() {
      const [date, month, year] = this.formData.until_time.split('.');

      if (Number.isNaN(+date) || Number.isNaN(+month) || Number.isNaN(+year)) {
        return null;
      }

      return Math.floor(+new Date(Number(`20${year}`), month - 1, date) / 1000);
    },
    direction() {
      switch (true) {
        case (this.formData.sent && this.formData.received):
        case (!this.formData.sent && !this.formData.received):
        default:
          return null;
        case (this.formData.sent):
          return 'outgoing';
        case (this.formData.received):
          return 'incoming';
      }
    },
  },
  mounted() {
    const im = new Inputmask('99.99.99', {
      placeholder: 'DD.MM.YY',
      showMaskOnHover: false,
    });

    im.mask(document.querySelectorAll('.filters__date-input'));
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
  height: calc(100% - 100px);
  overflow: auto;
  margin: 0 -16px;
  padding: 0 16px;

  @include media-breakpoint-down(lg) {
    height: 400px;
  }
}

.table-wrap,
.news-wrap {
  position: relative;
  overflow: auto;
  opacity: .5;
  pointer-events: none;
  user-select: none;
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

.stub {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-wrap {
  height: 50%;

  @include media-breakpoint-down(lg) {
    height: auto;
  }
}

.filters {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(11, 14, 67, 0.6);
}

.filters__overlay {
  overflow-x: hidden;
  overflow-y: visible;
}

.filters__item {
  margin-top: 30px;
}

.filters__item-header {
  font-size: 1.375rem;
  font-weight: bold;
  color: #ffffff;
}

.filters__tag {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  padding: 6px 20px;
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  color: #ffffff;
  border: solid 1.3px $sky-blue;
  border-radius: 24px;
  transition: background-color .2s ease;
  cursor: pointer;
}

.filters__tag--active {
  background-color: $sky-blue;
}

.filters__date-input {
  width: 160px;
  height: 45px;
  padding: 0 16px;
  font-size: 1.125rem;
  font-weight: 500;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
}

.filters__coin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border-radius: 16px;
  background-color: #19215c;
  transition: background-color .2s ease;
  cursor: pointer;
}

.filters__coin--active {
  background-color: $sky-blue;
}

.filters__coin-icon {
  width: 34px;
  height: 34px;
}

.filters__coin-name {
  font-size: .75rem;
  line-height: 1.17;
  color: #ffffff;
  margin-top: 12px;
}

.filters__btn {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 248px;
  height: 74px;
  margin-bottom: 10px;
  font-size: 1.3125rem;
  font-weight: bold;
  letter-spacing: -0.7px;
  color: #ffffff;
  border-radius: 78px;
  background-color: #8de37f;
  box-shadow: 0 6px 14px -6px rgba(93, 118, 243, 0.24), 0 12px 24px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.filters__close-btn {
  position: absolute;
  top: 36px;
  right: 72px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;

  @include media-breakpoint-down(md) {
    top: 31px;
    right: 18px;
  }
}

.filters__close-icon {
  width: 24px;
  height: 24px;

  fill: white;

  @include media-breakpoint-down(md) {
    width: 20px;
    height: 20px;
  }
}

.blurred {
  filter: blur(6px);
}
</style>
