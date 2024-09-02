// stores/employees/EmployeesEditStore.js
import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useEmployeesEditStore = defineStore("employeesEdit", {
  state: () => ({
    employees: [],
  }),
  actions: {
    async fetchEmployee(id) {
      try {
        const response = await axios.post("admins/show", { id });
        const employee = response.data;
        const index = this.employees.findIndex((emp) => emp.id === id);
        if (index === -1) {
          this.employees.push(employee);
        } else {
          this.employees[index] = employee;
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        Swal.fire(
          "Error!",
          "There was an error fetching the employee.",
          "error"
        );
      }
    },
  },
});
