<template>
  <div class="admin-info">
    <header-pages
      title="معلومات المسؤل"
      button="+ اضافة مسؤل"
      link="/add-adminInformation"
    />
    <div class="search">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="بحث عن موظف..."
        v-model="word"
        @input="debouncedSearch"
      />
    </div>
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
import { debounce } from "lodash"; // استيراد دالة debounce

export default {
  components: { HeaderPages, TablesPageVue },
  data() {
    return {
      word: "",
      debouncedSearch: null,
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
  methods: {
    handleSearch() {
      // const organizationsStore = useOrganizationsStore();
      // organizationsStore.fetchOrganizations(1, this.word);
    },
  },
  mounted() {
    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
