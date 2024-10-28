<template>
  <div class="employees">
    <HeadersPages title="الموظفين" button="+ اضافة موظف" link="/add-employee" />
    <div class="alll">
      <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="بحث عن موظف..."
          v-model="word"
          @input="debouncedSearch"
        />
      </div>

      <TablesPageVue
        :headers="tableHeaders"
        :rows="tableRows"
        :pages="tablePages"
        :showSelect="false"
        :editLink="editLink"
        :viewLink="viewLink"
        @delete="handleDeleteEmployee"
        :ismaster="ismaster"
      />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <PaginationPage
        :currentPage="paginationCurrent"
        :totalPages="paginationLast"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useEmployeesStore } from "@/stores/employees/EmployeesStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import PaginationPage from "@/components/pagination/PaginationPage.vue";
import { mapState } from "pinia";
import { debounce } from "lodash"; // استيراد دالة debounce
export default {
  name: "EmployeesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
    PaginationPage,
  },
  data() {
    return {
      word: "", // الكلمة المدخلة في البحث
      debouncedSearch: null,
      errorMessage: "",
      tableHeaders: [
        "ID",
        "الصور",
        "اسم الموظف",
        "البريد الالكتروني",
        "رقم الهاتف",
        "الصلاحيات",
      ],
      editLink: "/edit-employee",
      viewLink: "/view-employee",
    };
  },
  computed: {
    ...mapState(useEmployeesStore, {
      employees: (state) => state.employees,
      ...mapState(usePaginationStore, {
        paginationCurrent: (state) => state.current_page,
        paginationFrom: (state) => state.from,
        paginationLast: (state) => state.last_page,
        paginationPer: (state) => state.per_page,
        paginationTo: (state) => state.to,
        paginationTotal: (state) => state.total,
      }),
      ismaster: (state) => state.ismaster,
    }),

    tableRows() {
      const dataToDisplay = this.employees || [];
      console.log(dataToDisplay); // Check the structure of employees
      return dataToDisplay.map((emp) => [
        emp.id,
        emp.image,
        emp.name,
        emp.email,
        emp.phone,
        emp.role ? emp.role : "N/A", // Add fallback if role is missing
      ]);
    },

    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    handleInputChange() {
      this.errorMessage = "";
      this.debouncedSearch();
    },
    async handleSearch() {
      const employeesStore = useEmployeesStore();

      // If the search word is empty, fetch all employees
      if (this.word.trim() === "") {
        this.errorMessage = "";
        await employeesStore.fetchEmployees(1);
        return;
      } else {
        this.errorMessage = "";
      }

      await employeesStore.fetchEmployees(1, this.word);

      if (employeesStore.employees.length === 0) {
        this.errorMessage = "لم يتم العثور على أي كلمة"; // No results found
      } else {
        this.errorMessage = ""; // Clear error message if results found
      }
    },

    handlePageChange(page) {
      const employeesStore = useEmployeesStore();
      employeesStore.fetchEmployees(page, this.word); // قم بتمرير الكلمة البحثية أيضًا عند تغيير الصفحات
    },

    async handleDeleteEmployee(id) {
      const employeesStore = useEmployeesStore();
      console.log(id);
      await employeesStore.deleteEmployee(id);
    },
  },

  async mounted() {
    const employeesStore = useEmployeesStore();
    await employeesStore.fetchEmployees();

    this.debouncedSearch = debounce(() => {
      this.handleSearch(); // استخدم الدالة handleSearch
    }, 700); // تأخير 1500 مللي ثانية
  },
};
</script>
<style scoped>
.error-message {
  color: white;
  background-color: #ef0000a3;
  margin-top: -39px;
  margin-right: 23px;
  width: 97.4%;
  margin-bottom: -25px;
  padding: 8px;
  text-align: center;
  border-radius: 3px;
}
</style>
