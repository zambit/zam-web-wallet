<template>
  <div id="settings">
    <layout-main>
      <template slot="content">
        <div class="text-center w-100 py-5">
          <h1 style="color: #000000;">This page is under construction</h1>
        </div>
      </template>
    </layout-main>
  </div>
</template>

<script>
import layoutMain from '@/components/layout/main';

export default {
  name: 'settings-page',
  components: {
    layoutMain,
  },
};
</script>

<style lang="scss" scoped>
#settings {
  height: 100%;
  overflow: hidden;
}
</style>
