<template>
  <div class="Associations">
    <header-pages
      title="الجمعيات"
      button="اضافة جمعية"
      link="/add-associations"
    />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      editLink="/edit-associations"
      viewLink="/view-associations"
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
      tableHeaders: ["ID", "الصور", "اسم الأعاقه", "وصف الأعاقه"],
      tableRows: [
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",
        ],
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",
        ],
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",
        ],
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",
        ],
      ],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
};
</script>
