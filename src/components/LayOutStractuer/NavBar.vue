<template>
  <div class="main-nav">
    <nav class="navbars">
      <div class="allnav">
        <button
          class="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
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
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
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
  name: "NavBar",
};
</script>
