<template>
  <div class="Steps">
    <header-pages title="المراحل" button="+ اضافة مرحلة" link="/add-steps" />

    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      editLink="/edit-steps"
      viewLink="/view-steps"
    />
  </div>
</template>

<script>
import TablesPageVue from "@/components/tables/TablesPage.vue";
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
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
