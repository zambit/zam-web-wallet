<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <img class="logo my-5" src="@/assets/images/svg/zamzam-logo.svg" alt="ZamTech Logo">
      </div>
      <div class="col-12 col-sm-9 col-md-7 col-lg-5 col-xl-5">
        <form @submit.prevent="handleFormSubmit($event)">
          <div class="row">
            <div class="col-12">
              <h1 class="font-weight-bold text-center">Restore your <br> password</h1>
            </div>
            <div class="col-12 mt-4">
              <phone-input
                :country="formData.country"
                :phone="formData.phone"
                :error="inputs.phone.error"
                :errorText="inputs.phone.errorText"
                @country="formData.country = $event"
                @phone="formData.phone = $event"
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
                  v-if="step > 0"
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
              <transition appear name="fade">
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
              </transition>
            </div>
            <div class="col-12 text-center">
              <div class="d-inline-block mt-input">
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
              <button type="submit" class="btn btn-reg mt-input mx-auto">
                {{ submitButtonTexts[step] }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Inputmask from 'inputmask';
import Cookies from 'js-cookie';

import api from '@/api';

import phoneInput from '@/components/blocks/phoneInput';
import vCheckbox from '@/components/common/checkbox';
import VInput from '@/components/common/input';

export default {
  name: 'forgot-password-page',
  data() {
    return {
      date: null,
      timer: 59,
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
        },
        verification_code: {
          error: false,
          errorText: '',
        },
        password: {
          error: false,
          errorText: '',
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
          result = await this.requestSmsConfirmation({ phone: this.fullPhone });
          break;
        case 1:
          result = await this.sendSmsVerificationCode({
            phone: this.fullPhone,
            code: this.formData.code,
          });
          break;
        case 2:
          result = await this.setNewPassword({});
          break;
      }

      if (result) {
        this.step += 1;
      }
    },
    async requestSmsConfirmation({ phone }) {
      this.date = new Date();
      this.date.setSeconds(59);
      this.timer = 59;

      const response = await api.auth.recoveryStart({ data: { phone } });

      if (!response.data.result) {
        const fields = { phone: 0 };
        const errors = response.data.errors.filter(el => typeof fields[el.name] !== 'undefined');

        errors.forEach((el) => {
          this.inputs[el.name].error = true;
          this.inputs[el.name].errorText = el.message;
        });

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
      const response = await api.auth.recoveryVerify({ data: { phone, verification_code: code } });

      if (!response.data.result) {
        const fields = { phone: 0, verification_code: 0 };
        const errors = response.data.errors.filter(el => typeof fields[el.name] !== 'undefined');

        errors.forEach((el) => {
          this.inputs[el.name].error = true;
          this.inputs[el.name].errorText = el.message;
        });

        return false;
      }

      Cookies.set('recovery_token', response.data.data.recovery_token);

      return true;
    },
    async setNewPassword() {
      const token = Cookies.get('recovery_token');

      const response = await api.auth.recoveryFinish({
        data: {
          phone: this.fullPhone,
          recovery_token: token,
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

      Cookies.remove('recovery_token');

      this.$router.push('/sign-in');

      return true;
    },
  },
  computed: {
    fullPhone() {
      return this.formData.country + this.formData.phone;
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
}

.btn-send-code {
  padding: 25px 32px;
  background: transparent;
  color: $flat-blue;
}
</style>
