<template>
  <div class="row justify-content-center mt-5">
    <div class="col-12 col-lg-5">
      <form class="text-center" @submit.prevent="submitTransactionForm">
        <v-input
          :vPlaceholder="'Phone'"
          :value="formData.phone"
          :error="inputs.phone.error"
          :erroText="inputs.phone.errorText"
          class="transaction-input"
          @input="formData.phone = $event.target.value"
        />
        <v-input
          :vPlaceholder="'Amount'"
          :value="formData.amount"
          :error="inputs.amount.error"
          :erroText="inputs.amount.errorText"
          class="transaction-input mt-input"
          @input="formData.amount = $event.target.value"
        />
        <div class="mt-4 text-center">
          <div>Total</div>
          <div>{{ formData.amount.length > 0 ? formData.amount : '0.00' }}</div>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <span>blockchain fee: $0.00</span>
          <span>zamzam fee: $0.00</span>
        </div>
        <button type="submit" class="btn btn-submit mt-4">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import vInput from '@/components/common/input';

export default {
  name: 'transaction-form',
  data() {
    return {
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

    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

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
</style>
