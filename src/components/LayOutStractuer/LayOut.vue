<template>
  <div class="layout">
    <SideBar :is-collapsed="isCollapsed" />
    <div class="main" :class="{ 'sidebar-collapsed': isCollapsed }">
      <NavBar :is-collapsed="isCollapsed" @toggle-sidebar="toggleSidebar" />
      <div class="content">
        <router-view />
      </div>
      <FooterBar />
    </div>
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
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>
