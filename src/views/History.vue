<template>
  <div id="main">
    <layout-main>
      <template slot="content">
        <history-list />
      </template>
    </layout-main>
  </div>
</template>

<script>
import layoutMain from '@/components/layout/main';
import historyList from '@/components/blocks/historyList';

export default {
  name: 'history-page',
  components: {
    layoutMain,
    historyList,
  },
};
</script>
