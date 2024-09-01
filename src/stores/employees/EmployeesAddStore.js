import { defineStore } from "pinia";
import axios from "axios";

export const useEmployeesAddStore = defineStore("employeesAdd", {
  state: () => ({
    employees: [],
  }),
  actions: {
    async fetchEmployees(employeeData) {
      try {
        const formData = new FormData();
        Object.keys(employeeData).forEach((key) => {
          if (key === "image" && employeeData[key]) {
            formData.append(key, employeeData[key]);
          } else {
            formData.append(key, employeeData[key]);
          }
        });

        const response = await axios.post("admins", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.employees.push(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
  },
});
