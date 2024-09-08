<template>
  <div id="app">
    <LoaderPage :visible="isLoading" />
    <router-view />
  </div>
</template>

<script>
import LoaderPage from "@/components/LoaderPage/LoaderPage.vue";

export default {
  name: "App",
  components: {
    LoaderPage,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    // Access the router instance
    this.$router.beforeEach((to, from, next) => {
      this.isLoading = true;
      next();
    });

    this.$router.afterEach(() => {
      // Hide loader after a delay
      setTimeout(() => {
        this.isLoading = false;
      }, 1000); // 2000 milliseconds = 2 seconds
    });
  },
};
</script>

<style lang="scss">
@import url("./assets/scss/_main.scss");
</style>
