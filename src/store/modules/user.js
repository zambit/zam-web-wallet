/* eslint-disable no-shadow, no-param-reassign */
import Cookies from 'js-cookie';
import api from '@/api';

const state = {
  jwt: null,
  phone: null,
};

const CLEAR_USER = 'CLEAR_USER';
const SET_USER_KEY = 'SET_USER_KEY';

const getters = {
  isUserLoggedIn: state => !!(state.phone && state.token),
};

const actions = {
  async authCheck({ commit }) {
    const response = await api.auth.check({});

    if (!response.data.result) {
      Cookies.remove('jwt');
      commit(CLEAR_USER);
    }

    return response;
  },
  async signOut({ commit }) {
    const response = await api.auth.signOut({});

    if (!response.data.result) {
      alert('failed to sign out'); // eslint-disable-line
    } else {
      Cookies.remove('jwt');
      commit(CLEAR_USER);
    }

    return response;
  },
  async signIn({ commit }, { phone, password }) {
    const response = await api.auth.signIn({ data: { phone, password } });

    if (!response.data.result) {
      alert('failed to sign in'); // eslint-disable-line
    } else {
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
