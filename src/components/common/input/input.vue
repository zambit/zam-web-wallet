<template>
  <div class="input">
    <div :class="['input__body', { 'input__body--focus' : isFocused || $attrs.value }]">
      <small class="input__placeholder" @click="focusInput">{{ vPlaceholder }}</small>
      <input
        v-bind="$attrs"
        v-on="$listeners"
        ref="input"
        class="input__root"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
    </div>
    <div class="input__labels-wrap">
      <label
        v-if="showLabel"
        :for="$attrs.id"
        :class="['input__label', labelModClass]"
      >{{ errorText }}</label>
      <label v-if="labelRightText.length > 0" :for="$attrs.id">
        {{ labelRightText }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-input',
  inheritAttrs: false,
  props: {
    vPlaceholder: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    error: Boolean,
    errorText: {
      type: String,
      default: '',
    },
    helpText: {
      type: String,
      default: '',
    },
    labelRightText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    focusInput() {
      this.isFocused = true;
      this.$refs.input.focus();
    },
  },
  computed: {
    labelModClass() {
      return this.error ?
        'input__label--error' :
        'input__label--help';
    },
    labelText() {
      return this.error ? this.errorText : this.helpText;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.input {
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 1;

  .input__body {
    position: relative;
    border-radius: 12px;
    background-color: #1f255a;
    transition: color .2s ease;

    &:hover {
      background-color: #282e66;

      .input__placeholder {
        color: $cornflower;
      }
    }
  }

  .input__body--focus {
    background-color: #2a3271 !important; // override hover styles while input is focused

    .input__placeholder {
      color: $cornflower;
      transform: translate(0, -150%) scale(.5);
    }
  }

  .input__placeholder {
    position: absolute;
    top: 50%;
    left: 16px;
    font-size: 20px;
    line-height: 1.2;
    color: #6970b2;
    transform: translate(0, -50%);
    transition: transform .2s ease, font-size .2s ease, color .2s ease;
    transform-origin: left bottom;

    user-select: none;

    &:hover {
      cursor: text;
    }
  }

  .input__root {
    width: 100%;
    border: none;
    border-radius: 8px;
    color: inherit;
    font-size: 20px;
    line-height: 1;
    padding: 31px 16px 16px;
    background: transparent;

    &:focus {
      outline: none;
    }
  }

  .input__label {
    font-size: 14px;
    line-height: inherit;
    margin-top: 8px;
    margin-left: 8px;

    &.input__label--help {
      color: $cornflower;
    }

    &.input__label--error {
      color: $red;
    }
  }

  .input__labels-wrap {
    position: absolute;
    top: 100%;
  }
}
</style>
