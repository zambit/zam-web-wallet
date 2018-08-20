import api from '@zamzamtech/wallet-axios';
import Cookies from 'js-cookie';

const jwt = Cookies.get('jwt') || null;

const instance = api().create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 10000,
  maxRedirects: 3,
  responseType: 'json',
  headers: {
    common: jwt ? { Authorization: `Bearer ${jwt}` } : {},
  },
});

export default instance;
