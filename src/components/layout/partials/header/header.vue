<template>
  <div class="container-fluid p-0">
    <nav class="nav">
      <div class="row no-gutters h-100 position-relative" style="z-index: 2;">
        <div class="col-12 col-lg-auto">
          <div class="nav__aside">
            <div class="d-flex align-items-center">
              <button
                type="button"
                :class="['nav__btn d-lg-none', { 'nav__btn--close' : showMobileNav } ]"
                @click="toggleNavBar"
              >
                <svg :class="showMobileNav ? 'nav__icon-close' : 'nav__icon-burger'">
                  <use
                    :xlink:href="showMobileNav ? '#navbar__icon__close' : '#navbar__icon__burger'"
                  ></use>
                </svg>
              </button>
              <svg class="d-none d-lg-block nav__icon-user">
                <use xlink:href="#navbar__icon__user"></use>
              </svg>
              <span class="nav__username mx-1 mx-lg-4">{{ phone }}</span>
            </div>
            <router-link to="/settings">
              <svg class="nav__icon-settings">
                <use xlink:href="#navbar__icon__settings"></use>
              </svg>
            </router-link>
          </div>
        </div>
        <div class="d-none d-lg-block col-lg-auto flex-grow-1">
          <div class="nav__menu">
            <svg class="nav__logo">
              <use xlink:href="#zamzam-logo"></use>
            </svg>
            <ul class="nav__list list-unstyled mb-0">
              <li class="nav__list-item px-4">
                <router-link to="/">Home</router-link>
              </li>
            </ul>
            <div class="nav__sign-out" @click="handleSignOut">
              <svg class="nav__icon-sign-out">
                <use xlink:href="#navbar__icon__log-out"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div :class="['nav-mobile', { 'nav-mobile--show' : showMobileNav } ]">
        <div class="d-flex flex-column align-items-center pt-5">
          <svg class="nav__logo">
            <use xlink:href="#zamzam-logo"></use>
          </svg>
          <ul class="nav__list flex-column list-unstyled text-center mb-0 mt-5 px-0">
            <li class="nav__list-item px-4">
              <router-link to="/">Home</router-link>
            </li>
          </ul>
          <div class="nav-mobile__sign-out-btn mt-5 pointer" @click="handleSignOut">
            <svg class="nav__icon-sign-out">
              <use xlink:href="#navbar__icon__log-out"></use>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import '@/assets/images/svg/zamzam-logo.svg';
import './navbar__icon__user.svg';
import './navbar__icon__settings.svg';
import './navbar__icon__log-out.svg';
import './navbar__icon__burger.svg';
import './navbar__icon__close.svg';

export default {
  name: 'layout-header',
  data() {
    return {
      showMobileNav: false,
    };
  },
  methods: {
    ...mapActions({
      signOut: 'signOut',
    }),
    async handleSignOut() {
      const r = await this.signOut();

      if (r.data.result) {
        this.$router.push('/sign-in');
      }
    },
    toggleNavBar() {
      this.showMobileNav = !this.showMobileNav;
    },
    closeNavBar() {
      this.showMobileNav = false;
    },
  },
  computed: {
    ...mapState({
      phone: state => state.user.phone,
    }),
  },
  mounted() {
    window.addEventListener('resize', this.closeNavBar);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.closeNavBar);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_settings.scss";

.nav {
  position: relative;
  height: 90px;
  border-bottom: 2px solid #efefef;
  z-index: 5;

  @include media-breakpoint-down(md) {
    height: 60px;
  }
}

.nav__aside {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  width: 420px;
  padding: 0 45px;
  border-right: 2px solid #efefef;

  @include media-breakpoint-down(md) {
    width: 100%;
    padding: 18px 24px;
    border-right: 0;
  }
}

.nav__username {
  font-size: 18px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666666;
}

.nav__menu {
  display: flex;
  align-items: center;
  padding-left: 45px;
  width: 100%;
  height: 100%;
}

.nav__logo {
  width: 45px;
  height: 45px;
}

.nav__list {
  display: flex;
  flex-wrap: wrap;
  padding-right: 45px;
  padding-left: 15px;
}

.nav__list-item {
}

.nav__sign-out {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90px;
  height: 100%; // equals width

  margin-left: auto;
  border-left: 2px solid #efefef;
  background-color: transparent;

  cursor: pointer;
}

.nav-mobile {
  height: calc(100vh - 60px);
  background: white;
  transform: translate(-100%, 0);
  transition: transform .2s ease;

  &.nav-mobile--show {
    transform: translate(0, 0);
  }
}

.nav-mobile__sign-out-btn {
  width: 24px;
  height: 24px;
}

.nav-mobile-enter-active, .nav-mobile-leave-active {
  transition: opacity .5s ease, transform .5s ease;
}

.nav-mobile-enter, .nav-mobile-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
}

.nav__btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  padding: 0;
  margin-right: 24px;

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.nav__icon-burger {
  width: 24px;
  height: 24px;
}

.nav__icon-close {
  width: 16px;
  height: 16px;
}

.nav__icon-user {
  width: 30px;
  height: 30px;
  fill: #c5c5c5;
}

.nav__icon-settings {
  width: 24px;
  height: 24px;
}

.nav__icon-sign-out {
  width: 24px;
  height: 24px;
  fill: #c5c5c5;
}
</style>
