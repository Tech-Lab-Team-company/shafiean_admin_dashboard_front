<template>
  <div class="employees">
    <HeadersPages title="الموظفين" button="+ اضافة موظف" link="/add-employee" />
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
    <PaginationPage
      :currentPage="paginationCurrent"
      :totalPages="paginationLast"
      @page-changed="handlePageChange"
    />
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
      // استخدم filteredEmployees إذا كانت كلمة البحث موجودة، وإلا استخدم employees
      const dataToDisplay = this.employees;
      return dataToDisplay.map((emp) => [
        emp.id,
        emp.image,
        emp.name,
        emp.email,
        emp.phone,
        emp.role,
      ]);
    },

    tablePages() {
      return Array.from({ length: this.paginationLast }, (_, i) => i + 1);
    },
  },
  methods: {
    handleSearch() {
      const employeesStore = useEmployeesStore();
      employeesStore.fetchEmployees(1, this.word);
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
