<template>
  <div id="main">
    <layout-header />
    <div class="d-flex h-100">
      <layout-aside class="layout-aside h-100" ref="layoutAside" @card="slide" />
      <div class="layout-content d-flex flex-column w-100" ref="layoutContent">
        <wallet-panel :wallet="activeWallet" />
        <transaction-form />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import layoutHeader from '@/components/layout/header';
import layoutAside from '@/components/layout/aside';
import walletPanel from '@/components/blocks/walletPanel';
import transactionForm from '@/components/blocks/transactionForm';

export default {
  name: 'main-page',
  data() {
    return {
      showAside: true,
    };
  },
  components: {
    layoutHeader,
    layoutAside,
    walletPanel,
    transactionForm,
  },
  methods: {
    slide() {
      console.log(this.$refs.layoutContent);
      this.$refs.layoutContent.style.transform = 'translate(-100%)';
      this.$refs.layoutAside.$el.style.transform = 'translate(-100%)';
    },
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
@import "@/assets/styles/_settings.scss";

#main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: black;
}

/*.layout-aside {*/
  /*@include media-breakpoint-down(md) {*/
    /*width: 100%;*/
  /*}*/
/*}*/
/**/
/*.layout-content {*/
  /*@include media-breakpoint-down(md) {*/
    /*transform: translateX(100%);*/
  /*}*/
  /**/
  /*&.layout-content--active {*/
  /*}*/
/*}*/
</style>
