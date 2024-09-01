<template>
  <div class="countries">
    <header-pages title="الدوله" button="+ اضافة دوله" link="/add-countries" />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      editLink="/edit-countries"
      viewLink="/view-countries"
    />
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
export default {
  components: {
    headerPages,
    TablesPageVue,
  },
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
