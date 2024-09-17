<template>
  <div class="home">
    <!-- Start Header View -->

    <header-view />
    <body-view />
  </div>
</template>

<script>
import HeaderView from "./HeaderView.vue";
import BodyView from "./BodyView.vue";
export default {
  name: "HomeView",
  components: { HeaderView, BodyView },
};
</script>
