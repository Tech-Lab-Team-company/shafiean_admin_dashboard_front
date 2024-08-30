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
              <li><a class="dropdown-item" href="#">logout</a></li>
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
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
  },
};
</script>
