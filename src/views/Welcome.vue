<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="slider flickity-js w-100">
          <template v-for="n in 4">
            <div :key="n" class="slider-item w-100 text-center">
              <svg class="rounded-circle" style="width: 220px; height: 220px;">
                <use xlink:href="#zamzam-logo"></use>
              </svg>
              <h2 class="mt-2">Large Title {{ n }}</h2>
              <p>Et harum Discription quidem rerum facilis est et expedita
                distinctiolorem ipsun</p>
            </div>
          </template>
        </div>
        <div class="d-flex flex-column align-items-center mt-5">
          <router-link to="/sign-up" class="btn text-uppercase btn-reg">Registration
          </router-link>
          <router-link to="/sign-in" class="btn btn-block text-uppercase text-white mt-2">Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from 'flickity';
import 'flickity/css/flickity.css';

import '@/assets/images/svg/zamzam-logo.svg';

export default {
  name: 'welcome-page',
  data() {
    return {
      flickity: null,
    };
  },
  mounted() {
    this.flickity = new Flickity(document.querySelector('.flickity-js'), {
      cellAlign: 'center',
      contain: true,
      prevNextButtons: false,
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.btn-reg {
  background: white;
  border-radius: 28px;
  box-shadow: 0 6px 16px -6px $cornflower;
  color: $cornflower;
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  padding: 19px 60px;
}
</style>

<style lang="scss">
@import "@/assets/styles/_settings.scss";

.flickity-page-dots .dot {
  width: 8px;
  height: 8px;
  opacity: 1;
  background: #454b73;
  transition: background .2s ease;
}

.flickity-page-dots .dot.is-selected {
  background: $cornflower;
}
</style>
