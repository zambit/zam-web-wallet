/* eslint-disable no-shadow, no-param-reassign */
import Cookies from 'js-cookie';
import api from '@/api';

const state = {
  jwt: null,
  phone: null,
  totalBalanceBtc: 0,
  totalBalanceFiat: 0,
  walletsCount: 0,
};

const CLEAR_USER = 'CLEAR_USER';
const SET_USER_KEY = 'SET_USER_KEY';

const getters = {
  isUserLoggedIn: state => !!state.phone,
};

const actions = {
  async fetchCurrentUser({ commit }, { convert }) {
    const response = await api.wallet.getCurrentUser({ params: { convert } });

    if (response.data.result) {
      commit(SET_USER_KEY, {
        key: 'totalBalanceBtc',
        value: Number(response.data.data.wallets.total_balance.btc).toString(),
      });
      commit(SET_USER_KEY, {
        key: 'totalBalanceFiat',
        value: Number(response.data.data.wallets.total_balance.usd).toFixed(2),
      });
      commit(SET_USER_KEY, {
        key: 'walletsCount',
        value: response.data.data.wallets.count,
      });
    }

    return response;
  },
  async authCheck({ commit }) {
    const response = await api.auth.check({});

    if (!response.data.result) {
      Cookies.remove('jwt');
      api.instance.defaults.headers.common.Authorization = '';
      commit(CLEAR_USER);
    } else {
      commit(SET_USER_KEY, { key: 'phone', value: response.data.data.phone });
    }

    return response;
  },
  async signOut({ commit }) {
    const response = await api.auth.signOut({});

    if (response.data.result) {
      Cookies.remove('jwt');
      api.instance.defaults.headers.common.Authorization = '';
      commit(CLEAR_USER);
    }

    return response;
  },
  async signIn({ commit }, { phone, password }) {
    const response = await api.auth.signIn({ data: { phone, password } });

    if (response.data.result) {
      Cookies.set('jwt', response.data.data.token);
      api.instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
      commit(SET_USER_KEY, { key: 'jwt', value: response.data.data.token });
      commit(SET_USER_KEY, { key: 'phone', value: phone });
    }

    return response;
  },
};

const mutations = {
  [CLEAR_USER](state) {
    state.phone = null;
    state.jwt = null;
  },
  [SET_USER_KEY](state, { key, value }) {
    state[key] = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
