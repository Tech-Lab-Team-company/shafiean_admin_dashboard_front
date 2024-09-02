import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useEmployeesAddStore = defineStore("employeesAdd", {
  state: () => ({
    employees: [],
  }),
  actions: {
    async fetchEmployees(employeeData) {
      try {
        const formData = new FormData();
        Object.keys(employeeData).forEach((key) => {
          formData.append(key, employeeData[key]);
        });

        const response = await axios.post("admins", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.employees.push(response.data);

        // Show success alert
        Swal.fire("Success", "Employee has been saved.", "success");
      } catch (error) {
        console.error("Error saving employee:", error);
        // Show error alert
        Swal.fire("Error", "There was a problem saving the employee.", "error");
      }
    },
  },
});
