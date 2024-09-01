<template>
  <div class="admin-info">
    <header-pages
      title="معلومات المسؤل"
      button="+ اضافة مسؤل"
      link="/add-adminInformation"
    />
    <tables-page-vue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      editLink="/edit-adminInformation"
      viewLink="/view-admins"
    />
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
export default {
  components: { HeaderPages, TablesPageVue },
  data() {
    return {
      tableHeaders: ["ID", "الصور", "اسم المنهج", "وصف المنهج"],
      tableRows: [
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "المنهج",
          " المنهج",
        ],
      ],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
};
</script>
