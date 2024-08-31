import { defineStore } from "pinia";
import axios from "axios";
export const useEmployeesStore = defineStore("employees", {
  state: () => ({
    employees: [],
    pages: [],
  }),
  actions: {
    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        this.employees = response.data.employees;
        this.pages = response.data.pages;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
  },
});
