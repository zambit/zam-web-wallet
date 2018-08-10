<template>
  <div class="container-fluid p-0">
    <nav class="nav">
      <div class="row no-gutters h-100">
        <div class="col-auto">
          <div class="nav__aside">
            <div class="d-flex align-items-center">
              <img src="./navbar__icon__user.svg" alt="current user icon">
              <span class="nav__username mx-4">{{ phone }}</span>
            </div>
            <router-link to="/settings" style="visibility: hidden">
              <img src="./navbar__icon__settings.svg" alt="">
            </router-link>
          </div>
        </div>
        <div class="col-auto flex-grow-1">
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
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'layout-header',
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
  },
  computed: {
    ...mapState({
      phone: state => state.user.phone,
    }),
  },
};
</script>

<style lang="scss" scoped>
.nav {
  height: 90px;

  border-bottom: 2px solid #efefef;
}

.nav__aside {
  display: flex;
  align-items: center;

  height: 100%;
  padding: 0 45px;

  border-right: 2px solid #efefef;
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
</style>
