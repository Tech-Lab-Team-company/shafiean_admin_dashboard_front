<template>
  <div class="curricula">
    <header-pages title="المناهج" button="+ اضافة منهج" link="/add-curricula" />
    <tables-page-vue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      editLink="/edit-curricula"
      viewLink="/view-curricula"
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
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "المنهج",
          "المنهج ",
        ],
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "المنهج",
          "المنهج ",
        ],
      ],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
};
</script>
