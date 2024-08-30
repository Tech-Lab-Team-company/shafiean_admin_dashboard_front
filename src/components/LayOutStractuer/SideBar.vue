<template>
  <div>
    <!-- Sidebar -->
    <div
      :class="[
        'sidebar',
        localIsCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded',
      ]"
      @mouseover="openSidebarOnHover"
      @mouseleave="closeSidebarOnLeave"
    >
      <ul class="sidebar-menu">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="sidebar-item"
        >
          <!-- Menu Item Link -->
          <router-link
            :to="item.route"
            class="sidebar-link"
            @click="closeSidebarOnItemClick"
          >
            <i :class="item.icon"></i>
            <span v-if="!localIsCollapsed">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localIsCollapsed: this.isCollapsed,
      toggleIcon: "fas fa-bars",
      menuItems: [
        { name: "الرئيسيه", route: "/", icon: "fas fa-home" },
        {
          name: "الموظفين",
          route: "/employees",
          icon: "fa-solid fa-building-user",
        },
        {
          name: "الأعاقات",
          route: "/disabilities",
          icon: "fa-solid fa-wheelchair",
        },
        { name: "المناهج", route: "/", icon: "fa-brands fa-leanpub" },
        { name: "المراحل", route: "/", icon: "fa-solid fa-graduation-cap" },
        { name: "الدوله", route: "/", icon: "fa-solid fa-building" },
        { name: "الجمعيات", route: "/", icon: "fa-solid fa-sitemap" },
        { name: "معلومات المسؤل", route: "/", icon: "fa-solid fa-user-tie" },
      ],
    };
  },
  watch: {
    isCollapsed(newValue) {
      this.localIsCollapsed = newValue;
      this.updateToggleIcon();
    },
  },
  methods: {
    toggleSidebar() {
      this.localIsCollapsed = !this.localIsCollapsed;
      this.$emit("update:isCollapsed", this.localIsCollapsed);
      this.updateToggleIcon();
    },
    closeSidebarOnItemClick() {
      if (window.innerWidth <= 1024) {
        // Adjust to 1024px for tablets and small laptops
        this.localIsCollapsed = true;
        this.$emit("update:isCollapsed", this.localIsCollapsed);
        this.updateToggleIcon();
      }
    },
    openSidebarOnHover() {
      if (this.localIsCollapsed && window.innerWidth > 1024) {
        // Adjust to 1024px for tablets and small laptops
        this.localIsCollapsed = false;
        this.updateToggleIcon();
      }
    },
    closeSidebarOnLeave() {
      if (!this.localIsCollapsed && window.innerWidth > 1024) {
        // Adjust to 1024px for tablets and small laptops
        this.localIsCollapsed = true;
        this.updateToggleIcon();
      }
    },
    handleResize() {
      if (window.innerWidth <= 600) {
        this.localIsCollapsed = true;
      } else if (window.innerWidth > 600 && window.innerWidth <= 1024) {
        // Adjust for tablets and small laptops
        this.localIsCollapsed = true; // Keep collapsed or adjust as needed
      } else if (window.innerWidth > 1024 && !this.localIsCollapsed) {
        // Larger screens like desktops
        this.localIsCollapsed = false;
      }
      this.$emit("update:isCollapsed", this.localIsCollapsed);
      this.updateToggleIcon();
    },
    updateToggleIcon() {
      this.toggleIcon = this.localIsCollapsed ? "fas fa-bars" : "fas fa-times";
    },
  },
  created() {
    this.localIsCollapsed = this.isCollapsed;
    this.updateToggleIcon();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
