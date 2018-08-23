<template>
  <div class="wallet-card" @click="handleCardClick(wallet)">
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
          class="btn btn-link wallet-card__button"
        >
          Send
          <svg class="wallet-card__icon-arrow">
            <use xlink:href="#wallet-card__icon__arrow-up--blue"></use>
          </svg>
        </button>
      </div>
      <div class="col-6 text-center">
        <button
          type="button"
          class="btn btn-link wallet-card__button"
        >
          Deposit
          <svg class="wallet-card__icon-arrow">
            <use xlink:href="#wallet-card__icon__arrow-down--green"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import * as d3 from 'd3';

import { formatBalance } from '@/helpers';

import './icon__bitcoin-cash.svg';
import './icon__bitcoin.svg';
import './icon__ethereum.svg';
import './icon__zam.svg';
import './wallet-card__icon__arrow-down--green.svg';
import './wallet-card__icon__arrow-up--blue.svg';

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
  data() {
    /* eslint-disable */
    return {
      data: [
        {
          "date": "2016/09/30",
          "close": 837.31
        },
        {
          "date": "2016/09/29",
          "close": 829.05
        },
        {
          "date": "2016/09/28",
          "close": 828.72
        },
        {
          "date": "2016/09/27",
          "close": 816.11
        },
        {
          "date": "2016/09/26",
          "close": 799.16
        },
        {
          "date": "2016/09/23",
          "close": 805.75
        },
        {
          "date": "2016/09/22",
          "close": 804.7
        },
        {
          "date": "2016/09/21",
          "close": 789.74
        },
        {
          "date": "2016/09/20",
          "close": 780.22
        },
        {
          "date": "2016/09/19",
          "close": 775.1
        },
        {
          "date": "2016/09/16",
          "close": 778.52
        },
        {
          "date": "2016/09/15",
          "close": 769.69
        },
        {
          "date": "2016/09/14",
          "close": 761.09
        },
        {
          "date": "2016/09/13",
          "close": 761.01
        },
        {
          "date": "2016/09/12",
          "close": 771.49
        },
        {
          "date": "2016/09/09",
          "close": 760.14
        },
        {
          "date": "2016/09/08",
          "close": 784.06
        },
        {
          "date": "2016/09/07",
          "close": 784.48
        },
        {
          "date": "2016/09/06",
          "close": 788.87
        },
        {
          "date": "2016/09/02",
          "close": 772.44
        },
        {
          "date": "2016/09/01",
          "close": 770.62
        },
        {
          "date": "2016/08/31",
          "close": 769.16
        },
        {
          "date": "2016/08/30",
          "close": 767.58
        },
        {
          "date": "2016/08/29",
          "close": 771.29
        },
      ],
    }
  },
  /* eslint-disable */
  methods: {
    async fetchChartHistory() {
      const map = {
        btc: 'bitcoin',
        bch: 'bitcoin-cash',
        zam: null,
        eth: 'ethereum',
      };

      const response = await axios.get(
      `http://api.icex.ch/api/coins/${map[this.wallet.coin]}/hist`,
      {
        params: {
          convert: 'usd',
          interval: '1m',
          segment: '1y',
        }
      });

      if (response.data.result) {
        this.data = response.data.data[0].values.map(el => [
          el.timestamp,
          el.price.value,
        ]);
      }
    },
    handleCardClick(wallet) {
      this.$router.push('/');
      this.$emit('card', wallet.id);
    },
    initChart() {
      var margin = { top: 10, right: 20, bottom: 30, left: 30 };
      var width = 400 - margin.left - margin.right;
      var height = 565 - margin.top - margin.bottom;

      var svg = d3.select('.chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        // .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);


      var parseTime = d3.timeParse('%Y/%m/%d');

      const data = this.data;

      data.forEach(p => {
        p[0] = parseTime(p[0]);
        p[1] = +p[1];
      });

      var xScale = d3.scaleTime()
        .domain([
          d3.min(data, data => d3.min(data, d => d[0])),
          d3.max(data, data => d3.max(data, d => d[0]))
        ])
        .range([0, width]);
      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(5));

      var yScale = d3.scaleLinear()
        .domain([
          d3.min(data, co => d3.min(co.values, d => d.close)),
          d3.max(data, co => d3.max(co.values, d => d.close))
        ])
        .range([height, 0]);
      svg
        .append('g')
        .call(d3.axisLeft(yScale));

      var area = d3.area()
        .x(d => xScale(d.date))
        .y0(yScale(yScale.domain()[0]))
        .y1(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5));

      svg
        .selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('d', d => area(d.values))
        .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('stroke-width', 2)
        .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('fill-opacity', 0.5);


      function responsivefy(svg) {
        // get container + svg aspect ratio
        var container = d3.select(svg.node().parentNode),
          width = parseInt(svg.style("width")),
          height = parseInt(svg.style("height")),
          aspect = width / height;

        // add viewBox and preserveAspectRatio properties,
        // and call resize so that svg resizes on inital page load
        svg.attr("viewBox", "0 0 " + width + " " + height)
          .attr("preserveAspectRatio", "xMinYMid")
          .call(resize);

        // to register multiple listeners for same event type,
        // you need to add namespace, i.e., 'click.foo'
        // necessary if you call invoke this function for multiple svgs
        // api docs: https://github.com/mbostock/d3/wiki/Selections#on
        d3.select(window).on("resize." + container.attr("id"), resize);

        // get width of container and resize svg to fit it
        function resize() {
          var targetWidth = parseInt(container.style("width"));
          svg.attr("width", targetWidth);
          svg.attr("height", Math.round(targetWidth / aspect));
        }
      }
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
  mounted() {
    this.$nextTick(() => {
      this.fetchChartHistory();
      this.initChart();
    });
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
  cursor: pointer;
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

.wallet-card__icon-arrow {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}

.wallet-card__icon {
  width: 34px;
  height: 34px;
  margin-right: 10px;
}

</style>
