<template>
  <div class="phone">
    <div class="d-flex">
      <v-input
        :value="country" type="text" class="phone__code" placeholder="Code"
        @input="$emit('country', $event.target.value)"
      />
      <v-input
        :value="phone" type="text" class="phone__value ml-2" placeholder="Phone"
        @input="$emit('phone', $event.target.value)"
      />
      <div
        v-if="countryShort.length > 0"
        class="phone__country mt-2 ml-2"
        :style="{ backgroundImage: `url(https://www.countryflags.io/${countryShort}/flat/64.png)` }"
      ></div>
    </div>
    <transition>
      <label v-if="error">{{ errorText }}</label>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import vInput from '@/components/common/input';

import phoneCodes from './phoneCodes.json';

export default {
  name: 'phone-input',
  props: {
    country: String,
    phone: String,
    errorText: String,
    error: Boolean,
  },
  data() {
    return {
      countryShort: '',
    };
  },
  watch: {
    country(value) {
      const r = phoneCodes.find(el => el.code === Number(value));
      this.countryShort = r ? r.country : '';
    },
  },
  components: {
    vInput,
  },
  async created() {
    const { data: { country } } = await axios.get('https://ipinfo.io');
    this.countryShort = country;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.phone__code {
  width: 100px;
}

.phone__value {
  width: 100%;
  flex-shrink: 1;
}

.phone__country {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background-color: #252b5f;
  border: 4px solid #1a1f50;
  border-radius: 100%;

  background-size: inherit;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
