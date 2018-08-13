import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import wallets from './modules/wallets';
import common from './modules/common';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    wallets,
    common,
  },
});
