<template>
  <div id="settings">
    <layout-header />
    <div class="d-flex h-100" ref="layoutWrapper">
      <layout-aside class="layout-aside h-100" ref="layoutAside"/>
      <div class="layout-content d-flex flex-column w-100" ref="layoutContent">
        <div class="text-center w-100 py-5">
          <h1 style="color: #000000;">This page is under construction</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import layoutHeader from '@/components/layout/header';
import layoutAside from '@/components/layout/aside';

export default {
  name: 'settings-page',
  components: {
    layoutAside,
    layoutHeader,
  },
};
</script>

<style lang="scss" scoped>
#settings {
  height: 100%;
  overflow: hidden;
}
</style>
