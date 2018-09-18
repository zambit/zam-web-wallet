import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';

import store from '@/store';

const Main = () => import(/* webpackChunkName: "pages-main" */ './views/Main');
// const Welcome = () => import(/* webpackChunkName: "pages-welcome" */ './views/Welcome');
const SignIn = () => import(/* webpackChunkName: "pages-sign-in" */ './views/SignIn');
const SignUp = () => import(/* webpackChunkName: "pages-sign-up" */ './views/SignUp');
const Settings = () => import(/* webpackChunkName: "pages-settings" */ './views/Settings');
const ForgotPassword = () => import(/* webpackChunkName: "pages-forgot-password" */ './views/ForgotPassword');
const History = () => import(/* webpackChunkName: "pages-history" */ './views/History');

Vue.use(Router);

function preventEnteringAuthRoute(to, from, next) {
  const jwt = Cookies.get('jwt');

  if (jwt) {
    next({
      path: '/',
    });
  }

  next();
}

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/welcome',
    //   name: 'welcome',
    //   component: Welcome,
    //   meta: {
    //     requiresAuth: false,
    //   },
    //   beforeEnter: (to, from, next) => {
    //     preventEnteringAuthRoute(to, from, next);
    //   },
    // },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        requiresAuth: false,
      },
      beforeEnter: (to, from, next) => {
        preventEnteringAuthRoute(to, from, next);
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        requiresAuth: false,
      },
      beforeEnter: (to, from, next) => {
        preventEnteringAuthRoute(to, from, next);
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        requiresAuth: false,
      },
      beforeEnter: (to, from, next) => {
        preventEnteringAuthRoute(to, from, next);
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      name: 'history',
      component: History,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:coin/:name/:state',
      name: 'main',
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    /**
     * Validate jwt
     */
    const r = await store.dispatch('authCheck');

    if (!r.data.result) {
      return next({
        path: '/sign-in',
        query: { redirect: to.fullPath },
      });
    }

    return next();
  }

  return next();
});

export default router;
