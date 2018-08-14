<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <img class="logo my-5" src="@/assets/images/svg/zamzam-logo.svg" alt="ZamTech Logo">
      </div>
      <div class="col-12 col-sm-9 col-md-7 col-lg-5 col-xl-5">
        <div class="row">
          <div class="col-12">
            <h1 class="font-weight-bold text-center">Login for sending cryptocurrency</h1>
          </div>
        </div>
        <form
          @submit.prevent="submitSignIn"
          class="mt-4"
        >
          <div class="row">
            <div class="col-12">
              <phone-input
                :country="formData.country"
                :phone="formData.phone"
                :error="inputs.phone.error"
                :errorText="inputs.phone.errorText"
                class=""
                @country="formData.country = $event"
                @phone="formData.phone = $event"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center">
              <v-input
                :v-placeholder="'Password'"
                :value="formData.password"
                id="password"
                type="password"
                name="password"
                class="mt-input"
                required
                @input="formData.password = $event.target.value"
              />
              <button type="submit" class="btn btn-reg mt-input mx-auto">
                Log in
              </button>
              <router-link to="/forgot-password" class="btn-link d-inline-block p-3 my-3">
                Forgot password?
              </router-link>
              <p class="mt-5">
                Don`t have account yet?
                <router-link to="/sign-up" class="btn-link"><strong>SIGN UP</strong></router-link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import vInput from '@/components/common/input';
import phoneInput from '@/components/blocks/phoneInput';

export default {
  name: 'sign-in-page',
  data() {
    return {
      formData: {
        password: '',
        phone: '',
        country: '',
      },
      inputs: {
        phone: {
          error: false,
          errorText: '',
        },
        password: {
          error: false,
          errorText: '',
        },
      },
    };
  },
  components: {
    vInput,
    phoneInput,
  },
  methods: {
    ...mapActions({
      signIn: 'signIn',
    }),
    async submitSignIn() {
      const response = await this.signIn({
        phone: this.formData.phone,
        password: this.formData.password,
      });

      if (!response.data.result) {
        const fields = { phone: 0, password: 0 };
        const errors = response.data.errors.filter(el => typeof fields[el.name] !== 'undefined');

        errors.forEach((el) => {
          this.inputs[el.name].error = true;
          this.inputs[el.name].errorText = el.message;
        });

        return false;
      }

      window.localStorage.setItem('visited', '1');
      return this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.logo {
  width: 46px;
  height: 46px;
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
