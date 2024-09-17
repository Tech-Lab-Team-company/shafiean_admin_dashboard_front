<template>
  <div class="home">
    <!-- Start Header View -->

    <header-view />
    <body-view />
  </div>
</template>

<script>
import HeaderView from "../../components/Home/HeaderView.vue";
import BodyView from "../../components/Home/BodyView.vue";
export default {
  name: "HomeView",
  components: { HeaderView, BodyView },
};
</script>
