<template>
  <div>
    <layout-header/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

// import layoutHeader from '@/components/layout/header';

export default {
  name: 'main-page',
  components: {
    // layoutHeader,
  },
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
