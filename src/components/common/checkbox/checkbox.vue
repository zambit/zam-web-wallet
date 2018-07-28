<template>
  <div class="checkbox">
    <input v-bind="$attrs" v-on="$listeners" class="checkbox__root" type="checkbox">
    <slot tag="label" class="checkbox__label"></slot>
  </div>
</template>

<script>
export default {
  name: 'v-checkbox',
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.checkbox {
  position: relative;
  display: flex;
  align-items: center;
}

.checkbox__root {
  position: absolute; // take it out of document flow
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  opacity: 0; // hide it

  & + label {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 1;
    color: white;
    position: relative;
    cursor: pointer;
    padding: 0;
    transition: all .2s ease;

    & > label {
      cursor: pointer;
    }
  }

  // Box.
  & + label::before {
    content: '';
    flex-shrink: 0;
    margin-right: 12px;
    display: inline-block;
    vertical-align: text-top;
    width: 32px;
    height: 32px;
    background-color: #1a1f50;
    border-radius: 50%;
    border: 1px solid #1a1f50;
    transition: background-color .2s ease;
  }

  // Box hover
  &:hover + label::before,
  &:focus + label::before {
    background-color: #252b5f;
  }

  // Box checked
  &:checked + label::before {
    background-color: white;
  }

  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label::before {
    box-shadow: none;
    background: #dddddd;
  }

  // Checkmark. Could be replaced with an image
  & + label::after {
    content: '';
    position: absolute;
    left: 10px;
    top: 17px;
    background-color: #4b51a0;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #4b51a0,
    4px 0 0 #4b51a0,
    4px -2px 0 #4b51a0,
    4px -4px 0 #4b51a0,
    4px -6px 0 #4b51a0,
    4px -8px 0 #4b51a0,
    4px -10px 0 #4b51a0,
    4px -12px 0 #4b51a0;
    transform: rotate(45deg);
    transition: background-color .2s ease;
  }

  &:checked + label::after {
    background-color: $cornflower;
    box-shadow: 2px 0 0 $cornflower,
    4px 0 0 $cornflower,
    4px -2px 0 $cornflower,
    4px -4px 0 $cornflower,
    4px -6px 0 $cornflower,
    4px -8px 0 $cornflower,
    4px -10px 0 $cornflower,
    4px -12px 0 $cornflower;
  }
}
</style>
