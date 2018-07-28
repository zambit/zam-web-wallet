<template>
  <div class="container pb-5">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <img class="logo" src="@/assets/images/svg/zamzam-logo.svg" alt="ZamTech Logo">
      </div>
      <div class="col-12 col-lg-5">
        <h1 class="font-weight-bold">Register for sending cryptocurrency</h1>

        <form class="mt-4" @submit.prevent="handleFormSubmit($event)">
          <phone-input
            :country="formData.country"
            :phone="formData.phone"
            :error="inputs.phone.error"
            :errorText="inputs.phone.errorText"
            @country="formData.country = $event"
            @phone="formData.phone = $event"
          />

          <transition appear name="fade">
            <div v-if="step > 0" class="d-flex justify-content-between">
              <v-input
                :value="formData.code"
                :error="inputs.code.error"
                :errorText="inputs.code.errorText"
                placeholder="SMS code"
                class="mr-4"
                @input="formData.code = $event.target.value"
              />
              <small
                v-if="false"
                class="text-action flex-grow-1 mt-2"
                @click="requestSmsConfirmation({ phone: formData.country + formData.phone})"
              >
                Send code again in {{ smsTimer }}
              </small>
            </div>
          </transition>

          <transition appear name="fade">
            <div v-if="step > 1">
              <v-input
                :value="formData.password"
                :error="inputs.password.error"
                :errorText="inputs.password.errorText"
                placeholder="Password"
                type="password"
                @input="formData.password = $event.target.value"
              />
              <v-input
                :value="formData.passwordConfirmation"
                placeholder="Confirm password"
                type="password"
                @input="formData.passwordConfirmation = $event.target.value"
              />
            </div>
          </transition>
          <div>
            <v-checkbox id="agreeWithRulesCheckbox">
              <slot>
                <label for="agreeWithRulesCheckbox">
                  Test for the call to confirm the
                  <router-link to="/">&nbsp;legal
                    document
                  </router-link>
                </label>
              </slot>
            </v-checkbox>
          </div>
          <button type="submit" class="btn btn-reg mt-4 mx-auto">
            {{ submitButtonTexts[step] }}
            <img src="@/assets/images/svg/icon-arrow-right.svg" alt="icon arrow right" class="ml-5">
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

import api from '@/api';

import phoneInput from '@/components/blocks/phoneInput';
import vCheckbox from '@/components/common/checkbox';
import VInput from '@/components/common/input';

export default {
  name: 'sign-up-page',
  data() {
    return {
      smsTimer: 0,
      submitButtonTexts: [
        'Send SMS',
        'Send code',
        'Register account',
      ],
      /**
       * Describes steps of registration.
       * 0 (first step) - send phone
       * 1 (second step) - send sms verification
       * 2 (third step) - send phone and password
       */
      step: 0,
      formData: {
        country: '',
        phone: '',
        code: '',
        agreedWithRules: false,
        password: '',
        passwordConfirmation: '',
      },
      inputs: {
        phone: {
          error: false,
          errorText: '',
          helpText: 'Write anything you want',
        },
        code: {
          error: false,
          errorText: '',
          helpText: 'Write anything you want',
        },
        password: {
          error: false,
          errorText: '',
          helpText: 'Write anything you want',
        },
      },
    };
  },
  components: {
    VInput,
    phoneInput,
    vCheckbox,
  },
  methods: {
    async handleFormSubmit() {
      let result = false;

      switch (this.step) {
        default:
        case 0:
          result = await this.requestSmsConfirmation({ phone: this.formData.phone });
          break;
        case 1:
          result = await this.sendSmsVerificationCode({
            phone: this.formData.phone,
            code: this.formData.code,
          });
          break;
        case 2:
          result = await this.createAccount({});
          break;
      }

      if (result) {
        this.step += 1;
      }
    },
    async requestSmsConfirmation({ phone }) {
      const response = await api.auth.signUpStart({ data: { phone } });

      if (!response.data.result) {
        this.inputs.phone.error = true;
        this.inputs.phone.errorText = response.data.errors[0].message;
        return false;
      }

      return true;
    },
    async sendSmsVerificationCode({ phone, code }) {
      const response = await api.auth.signUpVerify({ data: { phone, verification_code: code } });

      if (!response.data.result) {
        this.inputs.phone.error = true;
        this.inputs.phone.errorText = response.data.errors[0].message;
        return false;
      }

      Cookies.set('token', response.data.data.signup_token);

      return true;
    },
    async createAccount() {
      const token = Cookies.get('token');

      const response = await api.auth.signUpFinish({
        data: {
          phone: this.formData.country + this.formData.phone,
          signup_token: token,
          password: this.formData.password,
          password_confirmation: this.formData.passwordConfirmation,
        },
      });

      if (!response.data.result) {
        return false;
      }
      api.instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
      Cookies.set('jwt', response.data.data.token);

      this.$router.push('/');

      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
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
