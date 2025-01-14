/* eslint-disable no-shadow, no-param-reassign */
import api from '@/api';

const state = {
  activeWalletID: null,
  items: [],
};

const SET_ACTIVE_WALLET = 'SET_ACTIVE_WALLET';
const SET_WALLETS = 'SET_WALLETS';

const getters = {
  activeWallet: state => state.items.find(el => el.id === state.activeWalletID),
  coinsInUse: state => state.items.reduce((acc, el) => {
    if (!acc.includes(el.coin)) {
      acc.push(el.coin);
    }
    return acc;
  }, []),
};

const actions = {
  async fetchWallets({ commit, state }, { convert }) {
    const response = await api.wallet.get({ params: { convert } });

    if (!response.data.result) {
      console.error('Failed to fetch wallets info'); // eslint-disable-line
    } else {
      commit(SET_WALLETS, Object.values(response.data.data.wallets));
      if (!state.activeWalletID) {
        commit(SET_ACTIVE_WALLET, response.data.data.wallets[0].id);
      }
    }

    return response;
  },
  setActiveWallet({ commit }, id) {
    commit(SET_ACTIVE_WALLET, id);
  },
};

const mutations = {
  [SET_ACTIVE_WALLET](state, id) {
    state.activeWalletID = id;
  },
  [SET_WALLETS](state, wallets) {
    state.items = wallets;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
