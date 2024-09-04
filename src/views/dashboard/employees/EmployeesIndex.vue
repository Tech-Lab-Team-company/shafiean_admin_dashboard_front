<template>
  <div class="employees">
    <HeadersPages title="الموظفين" button="+ اضافة موظف" link="/add-employee" />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
      :showSelect="true"
      :editLink="editLink"
      :viewLink="viewLink"
      @delete="handleDeleteEmployee"
      :ismaster="ismaster"
    />
  </div>

  <div class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="linkPage in tablePages" :key="linkPage">
          <a class="page-link" href="#" @click="paginationPage(linkPage)">{{
            linkPage
          }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useEmployeesStore } from "@/stores/employees/EmployeesStore";
import { mapState } from "pinia";

export default {
  name: "EmployeesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
  },
  data() {
    return {
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
      pages: (state) => state.pages,
      page: (state) => state.page,
      ismaster: (state) => state.ismaster,
    }),
    tableRows() {
      console.log(this.employees, "ssss");
      return this.employees.map((emp) => [
        emp.id,
        emp.image,
        emp.name,
        emp.email,
        emp.phone,
        emp.role,
      ]);
    },
    tablePages() {
      return this.pages;
    },
  },
  methods: {
    async handleDeleteEmployee(id) {
      const employeesStore = useEmployeesStore();
      console.log(id);

      await employeesStore.deleteEmployee(id);
    },
    paginationPage(page) {
      this.page = page;
      console.log("paginationPage", this.page);
    },
  },

  async mounted() {
    const employeesStore = useEmployeesStore();
    await employeesStore.fetchEmployees();
    console.log("mounted", this.page);
  },
};
</script>
