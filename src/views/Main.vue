<template>
  <div id="main">
    <layout-header/>
    <div class="d-flex h-100">
      <layout-aside class="h-100"/>
      <div class="d-flex flex-column w-100">
        <wallet-panel :wallet="activeWallet"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import layoutHeader from '@/components/layout/header';
import layoutAside from '@/components/layout/aside';
import walletPanel from '@/components/blocks/walletPanel';

export default {
  name: 'main-page',
  components: {
    layoutHeader,
    layoutAside,
    walletPanel,
  },
  computed: {
    ...mapGetters([
      'activeWallet',
    ]),
  },
};
</script>


<style lang="scss">
@import "@/assets/styles/_settings.scss";

html, body {
  background-color: white !important;
}
</style>

<style lang="scss" scoped>
#main {
  display: flex;
  flex-direction: column;

  height: 100vh;

  color: black;
}
</style>
