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
            v-if="!item.submenu"
            :to="item.route"
            class="sidebar-link"
            @click="closeSidebarOnItemClick"
          >
            <i :class="item.icon"></i>
            <span v-if="!localIsCollapsed">{{ item.name }}</span>
          </router-link>

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
                style="margin-inline-start: 75px"
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
        {
          name: "المناهج",
          icon: "fa-brands fa-leanpub",
          expanded: false,
          submenu: [
            {
              name: "المناهج",
              route: "/curricula",
              icon: "fas fa-book",
            },
            { name: "الحصص", route: "/lessons", icon: "fas fa-book" },
          ],
        },
        {
          name: "المراحل",
          route: "/steps",
          icon: "fa-solid fa-graduation-cap",
          submenu: [
            {
              name: "المناهج",
              route: "/curricula",
              icon: "fas fa-book",
            },
            { name: "الحصص", route: "/lessons", icon: "fas fa-book" },
          ],
        },
        {
          name: "الدوله",
          route: "/countries",
          icon: "fa-solid fa-building",
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
      if (window.innerWidth <= 600) {
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
