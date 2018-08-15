<template>
  <div class="position-relative h-100">
    <div class="row justify-content-center mt-5">
      <div class="col-12 col-lg-5">
        <form :class="['text-center', { 'blur' : showModal }]" @submit.prevent="showModal = true">
          <v-input
            :vPlaceholder="'Phone'"
            :value="formData.phone"
            :error="inputs.phone.error"
            :erroText="inputs.phone.errorText"
            class="transaction-input phone-input"
            required
            @input="formData.phone = $event.target.value"
          />
          <v-input
            :vPlaceholder="`Amount in ${wallet.coin}`"
            :value="formData.amount"
            :error="inputs.amount.error"
            :erroText="inputs.amount.errorText"
            :max="wallet.balances[wallet.coin]"
            min="0"
            type="number"
            class="transaction-input mt-input no-spinners"
            required
            @input="formData.amount = $event.target.value"
          />
          <div class="mt-4 text-center">
            <div class="total-title">Total</div>
            <div class="total-amount">
              {{ formData.amount.length > 0 ? formData.amount : '0.00' }}
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3 fee-row">
            <span class="py-3 total-fee">blockchain fee: $0.00</span>
            <span class="py-3 total-fee">zamzam fee: $0.00</span>
          </div>
          <button type="submit" class="btn btn-submit mt-4" @click="state = 'submit'">
            Send
          </button>
        </form>
      </div>
    </div>
    <transition appear name="fade">
      <div v-if="showModal" class="tsx-overlay h-100">
        <div class="tsx-wrap">
          <div class="close rounded thick tsx-overlay__close-btn pointer" @click="closeModal"></div>
          <template v-if="state === 'submit'">
            <div class="d-flex flex-column align-items-center">
              <h1 class="tsx-title">Confirm <br> transaction</h1>
              <h2 class="tsx-amount">{{ formData.amount + ' ' + wallet.coin }}</h2>
              <div class="tsx-arrow"></div>
              <span class="tsx-phone mt-4">From: {{ userPhone }}</span>
              <span class="tsx-phone mt-1">To: {{ formData.phone }}</span>
              <button
                type="button" class="circle tsx-overlay__send-btn mt-4 pointer"
                @click="postTransaction"
              >
                <span>Send</span>
              </button>
            </div>
          </template>

          <template v-if="state === 'success'">
            <div class="d-flex flex-column align-items-center">
              <h1 class="tsx-title">Transaction <br> <span class="green">completed</span></h1>
              <h2 class="tsx-amount">{{ formData.amount }}</h2>
              <div class="tsx-arrow"></div>
              <span class="tsx-phone mt-4">From: {{ userPhone }}</span>
              <span class="tsx-phone mt-1">To: {{ formData.phone }}</span>
              <div class="circle mt-4"></div>
            </div>
          </template>

          <template v-if="state === 'failure'">
            <div class="d-flex flex-column align-items-center">
              <h1 class="tsx-title">Transaction <br> <span class="red">canceled</span></h1>
              <template v-for="(error, index) in errors">
                <span :key="index" class="tsx-phone">{{ error }}</span>
              </template>
              <div class="circle mt-5">
                <div class="close black rounded circle-close"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex';

import api from '@/api';
import vInput from '@/components/common/input';

export default {
  name: 'transaction-form',
  data() {
    return {
      showModal: false,
      state: 'init', // 'submit', 'success', 'failure'
      errors: [],
      formData: {
        phone: '',
        amount: '',
      },
      inputs: {
        phone: {
          error: false,
          errorText: '',
        },
        amount: {
          error: false,
          errorText: '',
        },
      },
    };
  },
  components: {
    vInput,
  },
  methods: {
    submitTransactionForm() {
      this.state = 'submit';
    },
    async postTransaction() {
      const response = await api.wallet.transaction.send({
        data: {
          wallet_id: this.wallet.id,
          recipient: this.formData.phone,
          amount: this.formData.amount,
        },
      });

      if (!response.data.result) {
        this.state = 'failure';
        this.errors = response.data.errors.map(el => el.message);
      } else {
        this.state = 'success';
        await this.$store.dispatch('fetchWallets', { convert: 'usd' });
      }
    },
    closeModal() {
      this.errors = [];
      this.state = 'submit';
      this.showModal = false;
      this.formData.phone = '';
      this.formData.amount = '';
    },
  },
  computed: {
    ...mapState({
      userPhone: state => state.user.phone,
    }),
    ...mapGetters({
      wallet: 'activeWallet',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

$green: #8ad87d;
$red: #ed9aa2;

.transaction-input /deep/ {

  & .input__body {
    background-color: white;
    border: solid 2px #ececec;

    &:hover, &:focus {
      background-color: white;

      & .input__placeholder {
        color: $sky-blue;
      }

      & .input__root {
        color: #5e5e5e;
      }
    }
  }

  & .input__placeholder {
    color: $sky-blue;
  }

  & .input__root {
    color: #5e5e5e;
  }

  & .input__body--focus {
    background-color: white !important;
  }
}

.btn-submit {
  font-size: 1.3125rem;
  line-height: 1;
  font-weight: 500;
  color: white;
  padding: 25px 100px;
  border-radius: 78px;
  background-color: #8de37f;
  box-shadow: 0 6px 14px -6px $cornflower, 0 12px 24px 0 rgba(0, 0, 0, 0.06);
}

.total-title {
  font-size: 1rem;
  text-align: center;
  color: #bababa;
}

.total-amount {
  font-size: 1.625rem;
  line-height: 1;
  font-weight: 500;
  text-align: center;
  color: #424242;
}

.total-fee {
  font-size: .875rem;
  color: #9b9b9b;
}

.fee-row {
  border-top: solid 1px #e5e5e5;
}

.tsx-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(11, 14, 67, 0.6);
}

.tsx-wrap {
  display: flex;
  flex-direction: column;
  padding: 38px 72px;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  border-radius: 100%;
  background: #ffffff;
  box-shadow: 0 19px 18px 0 rgba(0, 0, 0, 0.14);
  outline: none;
  border: 0;
}

.tsx-title {
  font-size: 2.5rem;
  line-height: 1;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
}

.tsx-amount {
  font-size: 2.875rem;
  line-height: 1;
  font-weight: normal;
  color: white;

  margin-top: 30px;
}

.tsx-overlay__close-btn {
  margin-left: auto;
  width: 24px;
  height: 24px;
  margin-bottom: 24px;

  &::before, &::after {
    background: white;
  }
}

/* hide up/down arrows ("spinners") on input fields marked type="number" */
.no-spinners {
  -moz-appearance: textfield;
}

.no-spinners::-webkit-outer-spin-button,
.no-spinners::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.green {
  color: $green;
}

.red {
  color: $red;
}

.tsx-overlay__send-btn {
  background: $green;
  color: white;
  font-size: 1.5rem;
  line-height: 1;
}

.circle-close {
  width: 48px;
  height: 48px;

  &::before, &::after {
    background: $red;
  }
}

.tsx-phone {
  font-size: 1rem;
  color: white;
}

.blur {
  filter: blur(5px);
}
</style>
