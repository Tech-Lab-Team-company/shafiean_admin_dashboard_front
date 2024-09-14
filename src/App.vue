<template>
  <div id="app">
    <LoaderPage :visible="isLoading" />
    <router-view />
  </div>
</template>

<script>
import { useLoadingStore } from "@/stores/loaderpage/LoadingStore";
import LoaderPage from "@/components/LoaderPage/LoaderPage.vue";
import axios from "axios";

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

    // Set up Axios request interceptors
    axios.interceptors.request.use(
      (config) => {
        loadingStore.startLoading();
        this.isLoading = true;
        return config;
      },
      (error) => {
        loadingStore.stopLoading();
        this.isLoading = false;
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        loadingStore.stopLoading();
        this.isLoading = false;
        return response;
      },
      (error) => {
        loadingStore.stopLoading();
        this.isLoading = false;
        return Promise.reject(error);
      }
    );
  },
};
</script>

<style lang="scss">
@import url("./assets/scss/_main.scss");
</style>
