<template>
  <div class="admin-info">
    <div class="fri">
      <i class="fa-solid fa-user-tie"></i>
      <header-pages title="معلومات المسؤول" :showButton="false" />
    </div>
    <div class="all-information">
      <img :src="image" alt="صورة المسؤول" />
      <div class="text">
        <h4>
          اسم المسؤول : <span>{{ name || "غير متوفر" }}</span>
        </h4>
        <h4>
          البريد الإلكتروني : <span>{{ email || "غير متوفر" }}</span>
        </h4>
        <h4>
          تاريخ الإنشاء : <span>{{ created_at || "غير متوفر" }}</span>
        </h4>
        <h4>
          رقم الهاتف : <span>{{ phone || "غير متوفر" }}</span>
        </h4>
        <h4>
          نوع الوظيفة :
          <span>{{ is_master ? "مسؤول رئيسي" : "مسؤول عادي" }}</span>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";

export default {
  components: { HeaderPages },
  data() {
    return {
      name: "",
      image: "",
      is_master: "",
      phone: "",
      created_at: "",
      email: "",
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    },
    getUserData() {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          this.name = parsedUser.name || "";
          this.image = parsedUser.image || "@/assets/photos/Rectangle 8917.png";
          this.is_master = parsedUser.is_master || "";
          this.phone = parsedUser.phone || "";
          this.created_at = parsedUser.created_at
            ? this.formatDate(parsedUser.created_at)
            : "";
          this.email = parsedUser.email || "";
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>
