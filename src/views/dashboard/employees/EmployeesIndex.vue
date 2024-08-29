<template>
  <div class="employees">
    <HeadersPages title="الموظفين" button="+ اضافة موظف" link="/add-employee" />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
    />
  </div>
</template>

<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";

export default {
  name: "EmployeesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
  },
  data() {
    return {
      tableHeaders: [
        "ID",
        "الصور",
        "اسم الموظف",
        "البريد الالكتروني",
        "رقم الهاتف",
        "الصلاحيات",
        "actions",
      ],
      tableRows: [
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "محمد أحمد",
          "6mXnW@example.com",
          123456789,
          "مدير",
          [
            { class: "fa-solid fa-pen-to-square", action: "/edit-employee" },
            { class: "fa-solid fa-trash", action: this.deleteEmployee },
            { class: "fa-solid fa-eye", action: "/view-employee" },
          ],
        ],
        [
          "2",
          require("@/assets/photos/Rectangle 8917.png"),
          "علي حسن",
          "ali@example.com",
          987654321,
          "مساعد",
          [
            { class: "fa-solid fa-pen-to-square", action: "/edit-employee" },
            { class: "fa-solid fa-trash", action: this.deleteEmployee },
            { class: "fa-solid fa-eye", action: "/view-employee" },
          ],
        ],
        [
          "3",
          require("@/assets/photos/Rectangle 8917.png"),
          "فاطمة يوسف",
          "fatima@example.com",
          1122334455,
          "محاسب",
          [
            { class: "fa-solid fa-pen-to-square", action: "/edit-employee" },
            { class: "fa-solid fa-trash", action: this.deleteEmployee },
            { class: "fa-solid fa-eye", action: "/view-employee" },
          ],
        ],
      ],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
};
</script>

<style scoped>
.employees {
  padding: 1rem;
}
</style>
