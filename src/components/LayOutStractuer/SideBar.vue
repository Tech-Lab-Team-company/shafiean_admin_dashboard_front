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
        <div class="navbar-toggle" @click="toggleSidebar">
          <i :class="isCollapsed ? 'fas fa-bars' : 'fas fa-times'"></i>
        </div>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="sidebar-item"
        >
          <!-- Menu Item Link -->
          <router-link
            v-if="!item.submenu"
            :to="item.route"
            class="sidebar-link"
            @click="closeSidebarOnItemClick"
          >
            <i :class="item.icon"></i>
            <span v-if="!localIsCollapsed">{{ item.name }}</span>
          </router-link>

          <!-- Submenu Item -->
          <div v-else>
            <div class="sidebar-link" @click="toggleSubmenu(index)">
              <i :class="item.icon"></i>
              <span v-if="!localIsCollapsed">{{ item.name }}</span>
              <i
                v-if="!localIsCollapsed"
                class="up-down-icon"
                :class="
                  item.expanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up'
                "
                style="margin-inline-start: auto"
              ></i>
            </div>
            <ul v-if="item.expanded && !localIsCollapsed" class="submenu">
              <li
                v-for="(subItem, subIndex) in item.submenu"
                :key="subIndex"
                class="sidebar-subitem"
              >
                <router-link
                  :to="subItem.route"
                  class="sidebar-link"
                  @click="closeSidebarOnItemClick"
                >
                  <i :class="subItem.icon"></i>
                  <span>{{ subItem.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
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
      menuItems: this.getMenuItems(),
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
        this.localIsCollapsed = true;
        this.$emit("update:isCollapsed", this.localIsCollapsed);
        this.updateToggleIcon();
      }
    },
    toggleSubmenu(index) {
      this.menuItems[index].expanded = !this.menuItems[index].expanded;
    },
    openSidebarOnHover() {
      if (this.localIsCollapsed && window.innerWidth > 1024) {
        this.localIsCollapsed = false;
        this.updateToggleIcon();
      }
    },
    closeSidebarOnLeave() {
      if (!this.localIsCollapsed && window.innerWidth > 1024) {
        this.localIsCollapsed = true;
        this.updateToggleIcon();
      }
    },
    handleResize() {
      if (window.innerWidth <= 100) {
        this.localIsCollapsed = true;
      } else if (window.innerWidth > 600 && window.innerWidth <= 1024) {
        this.localIsCollapsed = true;
      } else if (window.innerWidth > 1024 && !this.localIsCollapsed) {
        this.localIsCollapsed = false;
      }
      this.$emit("update:isCollapsed", this.localIsCollapsed);
      this.updateToggleIcon();
    },
    updateToggleIcon() {
      this.toggleIcon = this.localIsCollapsed ? "fas fa-bars" : "fas fa-times";
    },
    getMenuItems() {
      return [
        { name: "الرئيسيه", route: "/", icon: "fas fa-home" },
        {
          name: "الموظفين",
          route: "/employees",
          icon: "fa-solid fa-building-user",
        },
        {
          name: "الفئات التعليمية",
          route: "/disabilities",
          icon: "fa-solid fa-wheelchair",
        },
        {
          name: "التعليم",
          icon: "fa-brands fa-leanpub",
          submenu: [
            {
              name: "المناهج",
              route: "/curricula",
              icon: "fa-solid fa-person-chalkboard",
            },
            {
              name: "المراحل",
              route: "/steps",
              icon: "fa-regular fa-clipboard",
            },
            { name: "الحلقات", route: "/lessons", icon: "fa-regular fa-file" },
            {
              name: "السنين الدراسيه",
              route: "/years",
              icon: "fa-regular fa-file",
            },
            {
              name: "الفصول الدراسيه",
              route: "/classes",
              icon: "fa-solid fa-person-chalkboard",
            },
            {
              name: "نوع الحلقه",
              route: "/index-type-lesson",
              icon: "fa-solid fa-person-chalkboard",
            },
          ],
        },
        {
          name: "الدول",
          icon: "fa-solid fa-building",
          submenu: [
            { name: "الدوله", route: "/countries", icon: "fas fa-globe" },
            { name: "المدن", route: "/cities", icon: "fas fa-city" },
          ],
        },
        {
          name: "الجمعيات",
          route: "/associations",
          icon: "fa-solid fa-sitemap",
        },
        {
          name: "معلومات المسؤل",
          route: "/adminInformation",
          icon: "fa-solid fa-user-tie",
        },
        {
          name: "الصالحيات",
          route: "/index-permission",
          icon: "fa-solid fa-shield",
        },
      ];
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
<style scoped lang="scss">
.navbar-toggle {
  text-align: end;
  margin-top: 0.5rem;

  i {
    color: #ffffff !important;
    border: 1px solid #ffffff !important;
    padding: 0.4rem;
    border-radius: 4px;
  }
}
</style>
