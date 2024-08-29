<template>
  <div class="main-sidebar">
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">
          شفيعا
          <p>&#128151;</p>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="all-links">
          <li>
            <router-link to="/" @click="closeOffcanvas"
              ><i class="fa-solid fa-house"></i>الرئيسية
            </router-link>
          </li>
          <li>
            <router-link to="/employees" @click="closeOffcanvas"
              ><i class="fa-solid fa-building-user"></i>الموظفين</router-link
            >
          </li>
          <li>
            <router-link to="/disabilities" @click="closeOffcanvas">
              <i class="fa-solid fa-wheelchair"></i>الأعاقات</router-link
            >
          </li>
          <li>
            <router-link to="/" @click="closeOffcanvas"
              ><i class="fa-brands fa-leanpub"></i>المناهج</router-link
            >
          </li>
          <li>
            <router-link to="/" @click="closeOffcanvas"
              ><i class="fa-solid fa-graduation-cap"></i>المراحل</router-link
            >
          </li>
          <li>
            <router-link to="/" @click="closeOffcanvas"
              ><i class="fa-solid fa-building"></i>الدوله</router-link
            >
          </li>
          <li>
            <router-link to="/" @click="closeOffcanvas"
              ><i class="fa-solid fa-flag"></i>المدينه</router-link
            >
          </li>
          <li>
            <router-link to="/" @click="closeOffcanvas"
              ><i class="fa-solid fa-sitemap"></i>الجمعيات</router-link
            >
          </li>
          <li>
            <router-link to="/" @click="closeOffcanvas"
              ><i class="fa-solid fa-user-tie"></i>معلومات المسؤل</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import * as bootstrap from "bootstrap";
export default {
  name: "SideBar",
  methods: {
    closeOffcanvas() {
      const offcanvasElement = document.getElementById("offcanvasRight");
      if (offcanvasElement) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        } else {
          new bootstrap.Offcanvas(offcanvasElement).hide();
        }
      }
    },
  },
};
</script>
