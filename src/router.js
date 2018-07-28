import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';

import store from '@/store';

const Main = () => import(/* webpackChunkName: "pages-main" */ './views/Main');
const Welcome = () => import(/* webpackChunkName: "pages-welcome" */ './views/Welcome');
const SignIn = () => import(/* webpackChunkName: "pages-sign-in" */ './views/SignIn');
const SignUp = () => import(/* webpackChunkName: "pages-sign-up" */ './views/SignUp');
const ForgotPassword = () => import(/* webpackChunkName: "pages-forgot-password" */ './views/ForgotPassword');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const jwt = Cookies.get('jwt') || null;

    if (!jwt) {
      next({
        path: '/sign-in',
        query: { redirect: to.fullPath },
      });
    }

    const r = await store.dispatch('authCheck');

    if (!r.data.result) {
      next({
        path: '/sign-in',
        query: { redirect: to.fullPath },
      });
    }

    return next();
  }
  return next();
});

export default router;
