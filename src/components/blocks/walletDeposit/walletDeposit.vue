<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-4">
        <div class="d-flex justify-content-center mt-5">
          <button
            type="button"
            class="wd-switch wd-switch--active"
          >
            <svg class="wd-switch__icon mr-2">
              <use xlink:href="#tsx-form__icon__chain"></use>
            </svg>
            Address
          </button>
          <button
            type="button"
            class="wd-switch ml-4"
            disabled
            style="cursor: not-allowed; opacity: .5;"
          >
            <svg class="wd-switch__icon mr-2">
              <use xlink:href="#tsx-form__icon__chain"></use>
            </svg>
            Card
          </button>
        </div>
        <div class="d-flex flex-column align-items-center mt-5">
          <canvas id="canvas"></canvas>
          <span class="wd-address">{{ wallet.address }}</span>
          <div class="d-flex justify-content-between mt-5 w-100">
            <div class="d-flex flex-column align-items-center">
              <svg class="wd-action__icon">
                <use xlink:href="#wallet-panel__icon__copy"></use>
              </svg>
              <span class="wd-action__label">Copy Address</span>
            </div>
            <div class="d-flex flex-column align-items-center wd-action"
            style="opacity: .5; cursor: not-allowed;">
              <svg class="wd-action__icon">
                <use xlink:href="#wallet-deposit__icon__share"></use>
              </svg>
              <span class="wd-action__label">Share address</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QRCode from 'qrcode';

import './wallet-deposit__icon__share.svg';

export default {
  name: 'wallet-deposit',
  watch: {
    'wallet.address': {
      handler() {
        this.renderQR();
      },
    },
  },
  methods: {
    renderQR() {
      QRCode.toCanvas(
        document.querySelector('#canvas'),
        this.wallet.address,
        (error) => {
          if (error) console.error(error);
        },
      );
    },
  },
  computed: {
    ...mapGetters({
      wallet: 'activeWallet',
    }),
  },
  mounted() {
    this.renderQR();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

#canvas {
  width: 210px;
  height: 210px;
}

.wd-action {

}

.wd-action__icon {
  width: 30px;
  height: 30px;

  fill: $sky-blue;
}

.wd-action__label {
  font-size: .875rem;
  color: #000000;

  margin-top: 10px;
}

.wd-address {
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
}

.wd-switch {
  display: flex;
  align-items: center;

  color: #888aa7;

  padding: 12px 20px;
  background-color: transparent;

  font-size: .875rem;
  font-weight: 500;

  border-radius: 56px;
  border: none;

  transition: background-color .2s ease, color .2s ease;
}

.wd-switch--active {
  background-color: #54b9f3;
  color: #ffffff;

  .wd-switch__icon {
    fill: white;
  }
}

.wd-switch__icon {
  width: 22px;
  height: 22px;

  fill: $lightish-green;
}
</style>
