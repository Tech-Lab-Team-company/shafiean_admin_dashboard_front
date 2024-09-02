<template>
  <div class="lessons">
    <header-pages title="الدروس" button="+ اضافة درس" link="/add-lessons" />
    <tables-page-vue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      editLink="/edit-lessons"
      viewLink="/view-lessons"
    />
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
export default {
  name: "lessonsIndex",
  components: {
    HeaderPages,
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
      ],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
};
</script>
