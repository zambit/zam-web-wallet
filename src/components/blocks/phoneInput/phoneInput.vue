<template>
  <div class="row no-gutters">
    <div class="col-4 pr-2">
      <v-input
        :v-placeholder="'Code'"
        :value="country" type="text" class="phone__code w-100"
        @input="$emit('country', $event.target.value)"
      />
    </div>
    <div class="col-8 position-relative">
      <v-input
        :v-placeholder="'Phone'"
        :value="phone" type="text" class="phone__value w-100"
        :error="error"
        :errorText="errorText"
        @input="$emit('phone', $event.target.value)"
      />
      <div
        v-if="countryShort.length > 0"
        class="phone__country"
        :style="{ backgroundImage: `url(https://www.countryflags.io/${countryShort}/flat/64.png)` }"
      ></div>
    </div>
  </div>
</template>

<script>
import Inputmask from 'inputmask';
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
      const obj = phoneCodes.find(el => el.code === value);
      this.countryShort = obj ? obj.country : '';
      this.applyPhoneInputMask(value);
    },
  },
  components: {
    vInput,
  },
  methods: {
    applyPhoneInputMask(code) {
      const el = document.querySelector('.phone__value .input__root');

      if (!code) {
        Inputmask.remove(el);
        return false;
      }

      const c = phoneCodes.find(p => p.code === code);

      // If no phone object was found or mask doesn't exists for this country - remove previous mask
      if (!c || !c.mask) {
        Inputmask.remove(el);
        return false;
      }

      // else apply new mask
      const im = new Inputmask(c.mask, {
        showMaskOnHover: false,
      });
      return im.mask(el);
    },
  },
  async created() {
    const { data: { country } } = await axios.get('https://ipinfo.io');
    // Value is RU, USA, etc
    this.countryShort = country;

    const c = phoneCodes.find(el => el.country === country);
    this.$emit('country', c.code || '+7');
  },
  mounted() {
    // Apply country code mask
    const im = new Inputmask('+9[9][9][9][9][9]', {
      showMaskOnHover: false,
    });
    im.mask(document.querySelector('.phone__code .input__root'));

    this.applyPhoneInputMask(this.country);
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
