<template>
  <div class="row no-gutters">
    <div class="col-12 position-relative">
      <v-input
        :v-placeholder="'Phone'"
        :value="phone"
        :theme="theme"
        :error="error"
        :errorText="errorText"
        type="text"
        class="phone__value w-100"
        @input="parseInputValue($event.target.value)"
      />
      <transition appear name="fade">
        <div
          v-if="country.length > 0"
          class="phone__country"
          :style="{ backgroundImage: `url(https://www.countryflags.io/${country}/flat/64.png)` }"
        ></div>
      </transition>
    </div>
  </div>
</template>

<script>
import { AsYouType, parseNumber } from 'libphonenumber-js';
import axios from 'axios';
import vInput from '@/components/common/input';

import phoneCodes from './phoneCodes.json';

export default {
  name: 'phone-input',
  props: {
    phone: String,
    errorText: String,
    theme: String,
    error: Boolean,
    guessCountryOnCreated: Boolean,
  },
  data() {
    return {
      country: '',
      formatter: new AsYouType(),
    };
  },
  components: {
    vInput,
  },
  methods: {
    parseInputValue(value) {
      const { countryCallingCode = '' } = parseNumber(value, { extended: true });

      const countryInfo = phoneCodes.find(el => el.code === `+${countryCallingCode}`);

      if (countryInfo) {
        this.country = countryInfo.country;
      } else {
        this.country = '';
      }

      this.formatter.reset();
      this.$emit('value', this.formatter.input(value));
    },
  },
  async created() {
    if (this.guessCountryOnCreated) {
      let response = '';

      /**
       * Get user country based on IP information
       */
      try {
        response = await axios.get('https://ipinfo.io');
      } catch (e) {
        this.country = '';
        return false;
      }

      // Value is RU, US, etc
      this.country = response.data.country || '';

      const countryInfo = phoneCodes.find(el => el.country === this.country);

      if (countryInfo) {
        this.$emit('value', countryInfo.code);
      }
    }
    return true;
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
  position: absolute;
  right: 16px;
  top: 24px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-size: inherit;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
