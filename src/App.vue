<template>
  <div id="app">
    <LoaderPage :visible="isLoading" />
    <router-view />
  </div>
</template>

<script>
import { useLoadingStore } from "@/stores/loaderpage/LoadingStore"; // Adjust path as needed
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
    const loadingStore = useLoadingStore();

    // Set up router navigation guards
    this.$router.beforeEach((to, from, next) => {
      loadingStore.startLoading();
      this.isLoading = true;
      next();
    });

    this.$router.afterEach(() => {
      // Hide loader after a delay
      setTimeout(() => {
        loadingStore.stopLoading();
        this.isLoading = false;
      }, 1000); // Adjust delay as needed
    });
  },
};
</script>

<style lang="scss">
@import url("./assets/scss/_main.scss");
</style>
