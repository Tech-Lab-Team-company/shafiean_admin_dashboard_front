<template>
  <div class="layout">
    <NavBar />
    <SideBar />
    <div class="content">
      <router-view />
    </div>
    <FooterBar />
  </div>
</template>
<script>
import NavBar from "@/components/LayOutStractuer/NavBar.vue";
import SideBar from "@/components/LayOutStractuer/SideBar.vue";
import FooterBar from "@/components/LayOutStractuer/FooterBar.vue";
export default {
  name: "LayOut",
  components: {
    NavBar,
    SideBar,
    FooterBar,
  },
};
</script>
