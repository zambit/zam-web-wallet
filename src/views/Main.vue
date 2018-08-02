<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="d-flex flex-column">
          <h1>Hello from main page, buddy!</h1>
          <p>Logged in as {{ phone }}</p>
          <button type="button" class="btn btn-lg btn-danger" @click="handleSignOut">Say
            goodbye</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'main-page',
  methods: {
    ...mapActions({
      signOut: 'signOut',
    }),
    async handleSignOut() {
      const r = await this.signOut();

      if (!r.data.result) {
        return false;
      }

      return this.$router.push('/sign-in');
    },
  },
  computed: {
    ...mapState({
      phone: state => state.user.phone,
    }),
  },
};
</script>

<style lang="scss">

</style>
