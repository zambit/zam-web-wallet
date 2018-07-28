<template>
  <div class="input">
    <input v-bind="$attrs" v-on="$listeners" class="input__root">
    <label
      v-if="showLabel"
      :for="$attrs.id"
      :class="['input__label', labelModClass]"
    ></label>
  </div>
</template>

<script>
export default {
  name: 'v-input',
  inheritAttrs: false,
  props: {
    showLabel: {
      type: Boolean,
      default: true,
    },
    error: Boolean,
    errorText: {
      type: String,
      default: '&nbsp;',
    },
    helpText: {
      type: String,
      default: '&nbsp;',
    },
  },
  data() {
    return {};
  },
  computed: {
    labelModClass() {
      return this.error ? 'input__label--error' : 'input__label--help';
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
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.input__root {
  background-color: #181c4e;
  border: none;
  border-radius: 8px;
  color: inherit;
  font-size: 20px;
  line-height: inherit;
  padding: 16px;
  transition: background-color .2s ease;

  &:focus {
    background-color: #252b5f;
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

input.input__root::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #565b86;
  font-size: inherit;
  font-weight: 500;
  line-height: inherit;
}

input.input__root::-moz-placeholder { /* Firefox 19+ */
  color: #565b86;
  font-size: inherit;
  font-weight: 500;
  line-height: inherit;
}

input.input__root:-ms-input-placeholder { /* IE 10+ */
  color: #565b86;
  font-size: inherit;
  font-weight: 500;
  line-height: inherit;
}

input.input__root:-moz-placeholder { /* Firefox 18- */
  color: #565b86;
  font-size: inherit;
  font-weight: 500;
  line-height: inherit;
}
</style>
