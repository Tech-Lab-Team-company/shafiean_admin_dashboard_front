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
          <a class="navbar-brand" href="#">
            <img src="@/assets/photos/logo.png" alt="Logo" />
          </a>
          <!-- زر تبديل الوضع الليلي -->
          <button class="btn-dark-mode" @click="toggleDarkMode">
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
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
      isDarkMode: false,
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
    logout() {
      this.authStore.logout();
      this.$router.push("/login");
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      const body = document.body;

      if (this.isDarkMode) {
        body.classList.add("dark-mode");
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    },
  },
  mounted() {
    this.getNameFromLocalStorage();

    const darkModeFromStorage = localStorage.getItem("darkMode");
    if (darkModeFromStorage === "true") {
      this.isDarkMode = true;
      document.body.classList.add("dark-mode");
    } else {
      this.isDarkMode = false;
      document.body.classList.remove("dark-mode");
    }
  },
};
</script>
