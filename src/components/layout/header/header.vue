<template>
  <div class="container-fluid p-0">
    <nav class="nav">
      <div class="row no-gutters h-100 position-relative" style="z-index: 2;">
        <div class="col-12 col-lg-auto">
          <div class="nav__aside">
            <div class="d-flex align-items-center">
              <div class="d-lg-none">
                <button type="button" class="btn btn-link">
                  <img
                    src="./navbar__icon__burger.svg" alt="burger button"
                    @click="toggleNavBar"
                  >
                </button>
              </div>
              <div class="d-none d-lg-block">
                <img src="./navbar__icon__user.svg" alt="current user icon">
              </div>
              <span class="nav__username mx-1 mx-lg-4">{{ phone }}</span>
            </div>
            <router-link to="/settings" style="visibility: hidden">
              <img src="./navbar__icon__settings.svg" alt="">
            </router-link>
          </div>
        </div>
        <div class="d-none d-lg-block col-lg-auto flex-grow-1">
          <div class="nav__menu">
            <img class="nav__logo" src="./zamzam-logo.svg">
            <ul class="nav__list mb-0">
              <!--<li class="nav__list-item px-4">-->
              <!--<router-link to="">Home</router-link>-->
              <!--</li>-->
              <!--<li class="nav__list-item px-4">-->
              <!--<router-link to="">History</router-link>-->
              <!--</li>-->
              <!--<li class="nav__list-item px-4">-->
              <!--<router-link to="">More</router-link>-->
              <!--</li>-->
            </ul>
            <div class="nav__sign-out" @click="handleSignOut"></div>
          </div>
        </div>
      </div>
      <transition appear name="nav-mobile">
        <div v-if="showMobileNav" class="nav-mobile">
          <div class="d-flex flex-column align-items-center pt-5">
            <img class="nav__logo" src="./zamzam-logo.svg">
            <ul class="nav__list flex-column list-unstyled text-center mb-0 mt-5 px-0">
              <li class="nav__list-item px-4">
                <router-link to="">Home</router-link>
              </li>
              <li class="nav__list-item px-4 mt-3">
                <router-link to="">History</router-link>
              </li>
              <li class="nav__list-item px-4 mt-3">
                <router-link to="">More</router-link>
              </li>
            </ul>
            <div class="nav-mobile__sign-out-btn mt-5 pointer" @click="handleSignOut">
              <img src="./navbar__icon__log-out.svg" alt="">
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
  },
  computed: {
    ...mapState({
      phone: state => state.user.phone,
    }),
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
  height: 100%;
  padding: 0 45px;
  border-right: 2px solid #efefef;

  @include media-breakpoint-down(md) {
    padding: 18px 24px;
    border-right: 0;
  }
}

.nav__username {
  font-size: 18px;
  font-weight: 500;
  width: 232px;
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
  width: 90px;
  height: 100%; // equals width

  margin-left: auto;
  border-left: 2px solid #efefef;
  background-color: transparent;
  background-image: url("./navbar__icon__log-out.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
  cursor: pointer;
}

.nav-mobile {
  height: calc(100vh - 60px);
  background: white;
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
  transform: translate(0, -100%);
}
</style>
