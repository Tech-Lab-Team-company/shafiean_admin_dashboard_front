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
        const response = await axios.get("admins");
        console.log(response.data.data);
        this.employees = response.data.data;
        this.pages = response.data.pages;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
  },
});
