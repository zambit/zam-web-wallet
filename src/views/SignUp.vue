<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <svg class="logo my-5">
          <use xlink:href="#zamzam-logo"></use>
        </svg>
      </div>
    </div>
    <form @submit.prevent="handleFormSubmit($event)">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 col-xl-5">
          <div class="row no-gutters">
            <div class="col-12 text-center">
              <h1 class="font-weight-bold">Register for sending cryptocurrency</h1>
            </div>
            <div class="col-12 mt-4">
              <phone-input
                :phone="formData.phone"
                :error="inputs.phone.error"
                :error-text="inputs.phone.errorText"
                :guess-country-on-created="true"
                @value="formData.phone = $event"
              />
            </div>
            <div class="col-4 pr-2">
              <transition appear name="fade">
                <v-input
                  v-show="step > 0"
                  :vPlaceholder="'sms-code'"
                  :value="formData.code"
                  :error="inputs.verification_code.error"
                  :errorText="inputs.verification_code.errorText"
                  class="js-sms-input w-100 mr-4 mt-input"
                  @input="formData.code = $event.target.value"
                />
              </transition>
            </div>
            <div class="col-8">
              <transition appear name="fade">
                <button
                  v-if="step === 1"
                  type="button"
                  class="btn btn-send-code mt-input"
                  @click="requestSmsConfirmation({ phone: formData.phone })"
                >
                  {{ step > 0 && !date ? 'Send code' : `Send code 0:${timer}` }}
                </button>
              </transition>
            </div>
            <div class="col-12">
              <transition appear name="fade">
                <v-input
                  v-if="step > 1"
                  :vPlaceholder="'Password'"
                  :value="formData.password"
                  :error="inputs.password.error"
                  :errorText="inputs.password.errorText"
                  type="password"
                  class="mt-input"
                  @input="formData.password = $event.target.value"
                />
              </transition>
            </div>
            <div class="col-12">
              <v-input
                v-if="step > 1"
                :vPlaceholder="'Confirm password'"
                :value="formData.passwordConfirmation"
                :error="inputs.password_confirmation.error"
                :errorText="inputs.password_confirmation.errorText"
                type="password"
                class="mt-input"
                @input="formData.passwordConfirmation = $event.target.value"
              />
            </div>
            <div class="col-12 mt-input">
              <v-checkbox
                id="agreeWithRulesCheckbox"
                class="d-inline-block"
                required
              >
                <slot>
                  <label for="agreeWithRulesCheckbox" class="d-flex">
                    <span>
                      I accept the
                      <a
                        href="https://terms.zam.io/TERMS_OF_USE_for_site.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Terms of Use
                      </a>
                      and give my consent to
                      ZamZamTechnology OÜ to process my personal
                      data for the services outlined in the
                      <a
                        href="https://privacy.zam.io/PRIVACY_POLICY.pdf"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </slot>
              </v-checkbox>
            </div>
            <div class="col-12 text-center">
              <button
                type="submit"
                :class="['btn btn-reg mt-input mx-auto', { 'animation' : submitButtonDisabled }]"
              >
                {{ submitButtonTexts[step] }}
              </button>
              <p class="mt-5">
                Already have an account?
                <router-link to="/sign-in" class="btn-link"><strong>SIGN IN</strong></router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Inputmask from 'inputmask';
import Cookies from 'js-cookie';

import api from '@/api';

import phoneInput from '@/components/blocks/phoneInput';
import vCheckbox from '@/components/common/checkbox';
import VInput from '@/components/common/input';

import '@/assets/images/svg/zamzam-logo.svg';

export default {
  name: 'sign-up-page',
  data() {
    return {
      date: null,
      timer: 59,
      submitButtonDisabled: false,
      timerUpdateInterval: 0,
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
        verification_code: {
          error: false,
          errorText: '',
          helpText: 'Write anything you want',
        },
        password: {
          error: false,
          errorText: '',
          helpText: 'Write anything you want',
        },
        password_confirmation: {
          error: false,
          errorText: '',
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
          result = await this.requestSmsConfirmation({
            phone: this.rawPhone,
          });
          break;
        case 1:
          result = await this.sendSmsVerificationCode({
            phone: this.rawPhone,
            code: this.formData.code,
          });
          break;
        case 2:
          result = await this.createAccount({});
          break;
      }

      if (result && this.step < 2) {
        this.step += 1;
      }
    },
    async requestSmsConfirmation({ phone }) {
      this.date = new Date();
      this.date.setSeconds(59);

      const response = await api.auth.signUpStart({ data: { phone } });

      if (!response.data.result) {
        const phoneError = response.data.errors.find(el => el.name === 'phone');

        if (phoneError) {
          this.inputs.phone.error = true;
          this.inputs.phone.errorText = phoneError.message;
        }
        return false;
      }

      this.timerUpdateInterval = setInterval(() => {
        if (this.date.getSeconds() === 0) {
          clearInterval(this.timerUpdateInterval);
          this.date = null;
        } else {
          this.date.setSeconds(this.date.getSeconds() - 1);
          this.timer = this.date.getSeconds();
        }
      }, 1000);

      return true;
    },
    async sendSmsVerificationCode({ phone, code }) {
      const response = await api.auth.signUpVerify({ data: { phone, verification_code: code } });

      if (!response.data.result) {
        const fields = { verification_code: 0 };
        const errors = response.data.errors.filter(el => typeof fields[el.name] !== 'undefined');

        errors.forEach((el) => {
          this.inputs[el.name].error = true;
          this.inputs[el.name].errorText = el.message;
        });

        return false;
      }

      Cookies.set('signup_token', response.data.data.signup_token);

      return true;
    },
    async createAccount() {
      const token = Cookies.get('signup_token');

      const response = await api.auth.signUpFinish({
        data: {
          phone: this.rawPhone,
          signup_token: token,
          password: this.formData.password,
          password_confirmation: this.formData.passwordConfirmation,
        },
      });

      if (!response.data.result) {
        const fields = { phone: 0, password: 0, password_confirmation: 0 };
        const errors = response.data.errors.filter(el => typeof fields[el.name] !== 'undefined');

        errors.forEach((el) => {
          this.inputs[el.name].error = true;
          this.inputs[el.name].errorText = el.message;
        });

        return false;
      }
      api.instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
      Cookies.set('jwt', response.data.data.token);
      Cookies.remove('signup_token');
      window.localStorage.setItem('visited', '1');

      this.submitButtonDisabled = true;

      setTimeout(() => {
        this.submitButtonDisabled = false;
        this.$router.push('/');
      }, 2000);

      return true;
    },
  },
  computed: {
    rawPhone() {
      return this.formData.phone.replace(new RegExp(' ', 'g'), '');
    },
  },
  mounted() {
    const im = new Inputmask('99 99 99', {
      showMaskOnHover: false,
      autoUnmask: true,
      placeholder: ' ',
    });

    im.mask(document.querySelector('.js-sms-input .input__root'));
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

  &:hover {
    box-shadow: 0 6px 16px -8px $cornflower;
  }

  &.animation {
    color: #3a4994;
    background: #aeaeae;
    cursor: not-allowed;
    animation: box-shadow 1s ease infinite;
  }
}

@keyframes box-shadow {
  0% {
    box-shadow: 0 4px 30px 0 rgba(0, 170, 219, 0.4);
  }

  100% {
    box-shadow: 0 6px 16px -8px $cornflower;
  }
}

.btn-send-code {
  padding: 25px 32px;
  background: transparent;
  color: $flat-blue;
}
</style>
