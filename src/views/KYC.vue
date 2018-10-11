<template>
  <div id="kyc">
    <layout-main>
      <template slot="content">
        <section class="kyc-section pb-5">
          <div class="container-fluid px-0">
            <div class="row">
              <div class="col-12">
                <div class="banner d-flex justify-content-md-between align-items-center">
                  <div class="order-1 order-md-0">
                    <h1 class="banner__title">Identify verification</h1>
                    <p class="banner__desc">Pass the procedure of identification to the end and get
                      bonus
                      <strong>500 ZAM-tokens</strong>
                    </p>
                  </div>
                  <svg class="banner__img order-0 order-md-1 flex-shrink-0">
                    <use xlink:href="#kyc-banner"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="container form-container">
            <div class="row mt-0 mt-md-5">
              <div class="col-12 col-lg-3">
                <template v-for="(step, index) in steps">
                  <div
                    :key="index"
                    :class="[
                    'step',
                    { 'step--progress' : step.status === 'pending' },
                    { 'step--done' : step.status === 'verified' },
                    { 'step--active' : activeStep === index },
                    { 'step--disabled' : step.disabled }
                    ]"
                  >
                    <div class="d-flex flex-column">
                      <div class="step__index">{{ index }}</div>
                    </div>
                    <div class="ml-3">
                      <div class="d-flex align-items-center">
                        <h4 class="step__name mb-0">{{ step.name }}</h4>
                        <span class="d-md-none step__state ml-3">
                          {{ getStepState(step.status) }}
                        </span>
                        <svg :class="
                        ['d-none step__icon ml-3',
                        { 'd-block' : step.status === 'pending' }]"
                        >
                          <use xlink:href="#icon--awaiting"></use>
                        </svg>
                        <svg :class="
                        ['d-none step__icon ml-3',
                        { 'd-block' : step.status === 'verified' }]"
                        >
                          <use xlink:href="#icon--checkmark"></use>
                        </svg>
                      </div>
                      <p v-html="step.desc" class="mt-1 mb-0"></p>
                      <span class="step__state mt-1 d-none d-md-block">
                        {{ getStepState(step.status) }}
                      </span>
                    </div>
                  </div>
                </template>
              </div>
              <div class="col-12 col-lg-6">
                <form class="mt-3 mt-lg-0" @submit.prevent="submitForm">
                  <p class="form-kyc-step mb-0">KYC0</p>
                  <h2 class="form-title">Personal Info</h2>
                  <v-input
                    :v-placeholder="'Email'"
                    :value="formData.email"
                    :theme="'light'"
                    :error="inputs.email.error"
                    :error-text="inputs.email.errorText"
                    :disabled="submitButtonDisabled"
                    class="kyc-input mt-4"
                    type="email"
                    required
                    @input="formData.email = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'First name'"
                    :value="formData.first_name"
                    :theme="'light'"
                    :error="inputs.first_name.error"
                    :error-text="inputs.first_name.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.first_name = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'Last name'"
                    :value="formData.last_name"
                    :theme="'light'"
                    :error="inputs.last_name.error"
                    :error-text="inputs.last_name.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.last_name = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'Date of birth'"
                    :value="formData.birth_date"
                    :theme="'light'"
                    :error="inputs.birth_date.error"
                    :error-text="inputs.birth_date.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input js-input-bdate"
                    type="text"
                    required
                    @input="formData.birth_date = $event.target.value"
                  />
                  <div class="mt-4">
                    <label
                      :class="['kyc-radio', { 'kyc-radio--active' : formData.sex === 'male' }]"
                      for="formDataSexMale"
                    >
                      <input
                        v-model="formData.sex"
                        :disabled="submitButtonDisabled"
                        id="formDataSexMale"
                        type="radio"
                        name="sex"
                        class="d-none"
                        value="male"
                        required
                      >
                      Male
                    </label>
                    <label
                      :class="['kyc-radio', { 'kyc-radio--active' : formData.sex === 'female' }]"
                      for="formDataSexFemale"
                    >
                      <input
                        v-model="formData.sex"
                        :disabled="submitButtonDisabled"
                        id="formDataSexFemale"
                        type="radio"
                        name="sex"
                        class="d-none"
                        value="female"
                        required
                      >
                      Female
                    </label>
                  </div>
                  <h2 class="form-title mt-5">Personal Address</h2>
                  <v-input
                    :v-placeholder="'Country'"
                    :value="formData.country"
                    :theme="'light'"
                    :error="inputs.country.error"
                    :error-text="inputs.country.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.country = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'City'"
                    :value="formData.city"
                    :theme="'light'"
                    :error="inputs.city.error"
                    :error-text="inputs.city.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.city = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'State/Region'"
                    :value="formData.region"
                    :theme="'light'"
                    :error="inputs.region.error"
                    :error-text="inputs.region.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.region = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'Street'"
                    :value="formData.street"
                    :theme="'light'"
                    :error="inputs.street.error"
                    :error-text="inputs.street.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.street = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'House number'"
                    :value="formData.house"
                    :theme="'light'"
                    :error="inputs.house.error"
                    :error-text="inputs.house.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.house = $event.target.value"
                  />
                  <v-input
                    :v-placeholder="'Postal Code'"
                    :value="formData.postal_code"
                    :theme="'light'"
                    :error="inputs.postal_code.error"
                    :error-text="inputs.postal_code.errorText"
                    :disabled="submitButtonDisabled"
                    class="mt-4 kyc-input"
                    type="text"
                    required
                    @input="formData.postal_code = $event.target.value"
                  />
                  <button
                    :disabled="submitButtonDisabled"
                    type="submit"
                    class="btn-kyc mt-4 mx-auto mx-md-0"
                  >
                    Verify
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </template>
    </layout-main>
  </div>
</template>

<script>
import { parse, format } from 'date-fns';
import Inputmask from 'inputmask';
import api from '@/api';
import vInput from '@/components/common/input';
import layoutMain from '@/components/layout/main';

import '@/assets/images/svg/kyc-banner.svg';
import '@/assets/images/svg/icon--awaiting.svg';
import '@/assets/images/svg/icon--checkmark.svg';

export default {
  name: 'kyc-page',
  data() {
    return {
      activeStep: 0,
      submitButtonDisabled: false,
      formData: {
        email: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        sex: 'male',
        country: '',
        city: '',
        region: '',
        street: '',
        house: '',
        postal_code: '',
      },
      inputs: {
        email: {
          error: false,
          errorText: '',
        },
        first_name: {
          error: false,
          errorText: '',
        },
        last_name: {
          error: false,
          errorText: '',
        },
        birth_date: {
          error: false,
          errorText: '',
        },
        sex: {
          error: false,
          errorText: '',
        },
        country: {
          error: false,
          errorText: '',
        },
        city: {
          error: false,
          errorText: '',
        },
        region: {
          error: false,
          errorText: '',
        },
        street: {
          error: false,
          errorText: '',
        },
        house: {
          error: false,
          errorText: '',
        },
        postal_code: {
          error: false,
          errorText: '',
        },
      },
      steps: [
        {
          name: 'KYC0',
          desc: 'Personal info, Personal address',
          status: 'unloaded',
          disabled: false,
        },
        {
          name: 'KYC1',
          desc: 'Selfie of a customer holding the adove document. <br><br> Photo passport, or ID card, or Driving license. <br><br> Upload document confirming address of residence.',
          status: 'unloaded',
          disabled: true,
        },
      ],
    };
  },
  components: {
    vInput,
    layoutMain,
  },
  methods: {
    async submitForm() {
      const birthday = parse(this.formData.birth_date);

      const response = await api.user.postPersonalInfo({
        data: {
          email: this.formData.email,
          first_name: this.formData.first_name,
          last_name: this.formData.last_name,
          birth_date: +birthday,
          sex: this.formData.sex,
          country: this.formData.country,
          city: this.formData.city,
          region: this.formData.region,
          street: this.formData.street,
          house: this.formData.house,
          postal_code: Number(this.formData.postal_code),
        },
      });

      if (!response.data.result) {
        const fields = Object.keys(this.inputs);
        const errors = response.data.errors.filter(el => fields.includes(el.name));

        errors.forEach((el) => {
          this.inputs[el.name].error = true;
          this.inputs[el.name].errorText = el.message;
        });

        return false;
      }

      this.submitButtonDisabled = true;
      this.steps[0].status = 'pending';

      return true;
    },
    getStepState(status) {
      switch (true) {
        case (status === 'unloaded'):
        default:
          return 'Not verified';
        case (status === 'pending'):
          return 'On verification';
        case (status === 'verified'):
          return 'Verified';
      }
    },
  },
  async created() {
    const response = await api.user.getPersonalInfo({});

    if (response.data.result && response.data.data.personal_data) {
      const d = response.data.data.personal_data;

      this.steps[0].status = 'pending';
      this.submitButtonDisabled = true;

      this.formData = Object.assign({}, {
        email: d.email,
        first_name: d.first_name,
        last_name: d.last_name,
        birth_date: format(d.birth_date, 'YYYY/MM/DD'),
        sex: d.sex,
        country: d.country,
        city: d.address.city,
        region: d.address.region,
        street: d.address.street,
        house: d.address.house,
        postal_code: d.address.postal_code,
      });
    }
  },
  mounted() {
    Inputmask('9999/99/99', {
      placeholder: 'YYYY/MM/DD',
      showMaskOnHover: false,
    }).mask('.js-input-bdate .input__root');

    document.querySelector('.layout__wallets-btn').classList.toggle('d-none');
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.btn-kyc {
  display: flex;
  padding: 25px 82px;
  border: none;
  font-size: 1.3125rem;
  border-radius: 37px;
  background-color: #8de37f;
  box-shadow: 0 6px 14px 0 rgba(93, 118, 243, 0.24);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.7px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
    opacity: .5;
  }
}

.kyc-input /deep/ {
  &:hover .input__placeholder,
  .input__placeholder {
    font-size: 1rem;
    color: #888aa7 !important;
  }

  .input__root {
    padding: 13px 16px 16px;
  }
}

.step {
  display: flex;
  cursor: pointer;

  &:hover {
    .step__name {
      color: #1b1b1b;
    }
  }

  &:last-child {
    margin-top: 30px;

    @include media-breakpoint-down(md) {
      margin-top: 0;
    }
  }

  @include media-breakpoint-down(md) {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 18px;
    padding-bottom: 18px;

    margin-right: -15px;
    margin-left: -15px;
  }
}

.step--active {

  @include media-breakpoint-down(md) {
    background-color: #f8f8f8;
  }

  .step__name {
    font-weight: bold;
  }
}

.step--progress {
  .step__index {
    color: #54b9f3;
    border-color: #54b9f3;
  }
  .step__state {
    color: #54b9f3;
  }
}

.step--done {
  .step__index {
    color: $green;
    border-color: $green;
  }
  .step__state {
    color: $green;
  }
}

.step--disabled {
  opacity: .5;
  cursor: not-allowed;
}

.step__index {
  display: flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: solid 2px #d0021b;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1;
  color: #d0021b;
  transition: border-color .2s ease;
}

.step__icon {
  width: 20px;
  height: 20px;
}

.step__name {
  font-size: 1.125rem;
  line-height: 1.17;
  color: #1b1b1b;
  margin-bottom: 0;
  transition: color .2s ease;
}

.step__state {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.21;
  color: #d0021b;
}

.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(to left, #b8e986, #8de37f);
  padding: 26px 84px;

  @include media-breakpoint-down(md) {
    padding: 37px 20px;
  }
}

.banner__title {
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.18;
  color: #ffffff;

  @include media-breakpoint-down(md) {
    font-size: 1.3125rem;
  }
}

.banner__desc {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.13;
  letter-spacing: -0.4px;
  color: #ffffff;
  margin-top: 14px;
  margin-bottom: 0;

  @include media-breakpoint-down(md) {
    font-weight: normal;
  }
}

.banner__img {
  width: 256px;
  height: 160px;

  @include media-breakpoint-down(md) {
    width: 112px;
    height: 82px;
  }
}

.kyc-radio {
  position: relative;
  display: inline-flex;
  min-width: 125px;
  height: 44px;
  margin-bottom: 0;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.13;
  letter-spacing: -0.5px;
  text-align: center;
  color: #000000;
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    margin-right: 18px;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    background-color: white;
    border: 2px solid #010101;
    border-radius: 100%;
    transition: border-color .2s ease;
  }

  &::after {
    content: '';
    position: absolute;
    flex-shrink: 0;
    left: 4px;
    top: 17px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: transparent;
    transition: background-color .2s ease;
  }
}

.kyc-radio--active {
  &::before {
    border: 2px solid $sky-blue;
  }

  &::after {
    background-color: $sky-blue;
  }
}

.form-container {
  padding-left: 34px;
  padding-right: 34px;

  @include media-breakpoint-down(md) {
    padding-right: 15px;
    padding-left: 15px;
  }
}

.form-title {
  font-size: 1.875rem;
  font-weight: bold;
  line-height: 1.17;
  color: #666666;
}

.form-kyc-step {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.21;
  color: #9b9b9b;
}
</style>
