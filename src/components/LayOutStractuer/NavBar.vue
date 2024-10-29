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
              <img :src="image" alt="User Image" />
              <h4>{{ name }}</h4>
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
import { mapState } from "pinia";
export default {
  data() {
    return {
      name: "",
      image: "",
    };
  },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(useAuthStore, ["data"]),

    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    getNameFromLocalStorage() {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          this.name = parsedUser.name || "";
          this.image = parsedUser.image || "";
        } catch (error) {
          console.error("Error parsing user from local storage:", error);
        }
      } else {
        console.log("No user found in local storage.");
      }
    },
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
  mounted() {
    this.getNameFromLocalStorage();
  },
};
</script>
