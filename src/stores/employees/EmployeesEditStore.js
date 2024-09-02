// stores/employees/EmployeesEditStore.js
import { defineStore } from "pinia";
import axios from "axios";

// import Swal from "sweetalert2";

export const useEmployeesEditStore = defineStore("employeesEdit", {
  state: () => ({
    employees: [],
  }),
  actions: {
    async fetchEmployee(id) {

      const response = await axios.post("admins/show", { id });
      this.employees = response.data.data;
      if (!response.status == true) {
        throw new Error("Failed to fetch employee data");

      }
    },
  },
});
