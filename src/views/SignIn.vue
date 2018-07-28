<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <img class="logo" src="@/assets/images/svg/zamzam-logo.svg" alt="ZamTech Logo">
      </div>
      <div class="col-12 col-lg-5">
        <h1 class="font-weight-bold">Register for sending cryptocurrency</h1>
        <form
          @submit.prevent="submitSignIn"
          class="mt-4"
        >
          <v-input
            :value="formData.phone"
            placeholder="Enter your phone"
            id="phone"
            type="text"
            name="phone"
            required
            @input="formData.phone = $event.target.value"
          />
          <v-input
            :value="formData.password"
            placeholder="Enter password"
            id="password"
            type="password"
            name="password"
            required
            @input="formData.password = $event.target.value"
          />
          <button type="submit" class="btn btn-reg mt-4 mx-auto">
            Log in
            <img src="@/assets/images/svg/icon-arrow-right.svg" alt="icon arrow right" class="ml-5">
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import vInput from '@/components/common/input';

export default {
  name: 'sign-in-page',
  data() {
    return {
      formData: {
        phone: '',
        password: '',
      },
    };
  },
  components: {
    vInput,
  },
  methods: {
    ...mapActions({
      signIn: 'signIn',
    }),
    async submitSignIn() {
      const r = await this.signIn({ phone: this.formData.phone, password: this.formData.password });

      if (!r.data.result) {
        alert('failed to log in'); // eslint-disable-line
      }

      return this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.logo {
  width: 94px;
  height: 95px;
  margin-top: 68px;
  margin-bottom: 90px;
}

.btn-reg {
  display: flex;
  align-items: center;
  border-radius: 62px;
  background-image: linear-gradient(to top, #f4f4f4, #ffffff);
  box-shadow: 0 4px 30px 0 rgba(0, 170, 219, 0.4);
  padding: 19px 82px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
}
</style>
