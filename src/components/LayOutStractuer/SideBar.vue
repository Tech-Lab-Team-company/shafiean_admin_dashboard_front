<template>
  <div
    :class="['sidebar', isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded']"
  >
    <ul class="sidebar-menu">
      <li v-for="(item, index) in menuItems" :key="index" class="sidebar-item">
        <router-link :to="item.route" class="sidebar-link">
          <i :class="item.icon"></i>
          <span v-if="!isCollapsed">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
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
          route: "/",
          icon: "fa-brands fa-leanpub",
        },
        {
          name: "المراحل",
          route: "/",
          icon: "fa-solid fa-graduation-cap",
        },
        {
          name: "الدوله",
          route: "/",
          icon: "fa-solid fa-building",
        },
        {
          name: "الجمعيات",
          route: "/",
          icon: "fa-solid fa-sitemap",
        },
        {
          name: "معلومات المسؤل",
          route: "/",
          icon: "fa-solid fa-user-tie",
        },
        // Add more menu items here
      ],
    };
  },
};
</script>
