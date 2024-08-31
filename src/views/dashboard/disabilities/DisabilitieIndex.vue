<template>
  <div class="disabilities">
    <HeadersPages
      title="الأعاقات"
      button="+ اضافة اقاعة"
      link="/add-disabilities"
    />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      editLink="/edit-disabilities"
      viewLink="/view-disabilities"
    />
  </div>
</template>
<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
export default {
  name: "DisabilitiesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
  },
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
