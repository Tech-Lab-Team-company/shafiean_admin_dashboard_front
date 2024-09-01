<template>
  <div class="main-nav">
    <nav class="navbars">
      <div class="allnav">
        <div class="navbar-toggle" @click="toggleSidebar">
          <i :class="isCollapsed ? 'fas fa-bars' : 'fas fa-times'"></i>
        </div>
        <div class="all-info">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="@/assets/photos/Rectangle 8917.png" alt="" />
              <h4>محمد أحمد محمد نصره</h4>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" @click="logout">logout</a></li>
            </ul>
          </div>
          <a class="navbar-brand" href="#"
            ><img src="@/assets/photos/logo.png" alt=""
          /></a>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
    </nav>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth/AuthStore";
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    showName() {
      this.authStore.login;
    },
    logout() {
      this.authStore.logout();
      this.$router.push("/login");
    },
  },
};
</script>
