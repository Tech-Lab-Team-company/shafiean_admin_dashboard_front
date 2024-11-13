import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useEmployeesAddStore = defineStore("employeesAdd", {
  state: () => ({
    employees: [],
  }),
  actions: {
    async addEmployee(employeeData) {
      try {
        const formData = new FormData();
        Object.keys(employeeData).forEach((key) => {
          if (key === "image" && employeeData[key]) {
            formData.append("image", employeeData[key]);
          } else {
            formData.append(key, employeeData[key]);
          }
        });

        const response = await axios.post("/admins/store", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.employees.push(response.data);
        await router.push("/employees");

        Swal.fire("Success", "Employee has been saved.", "success");
      } catch (error) {
        console.error("Error saving employee:", error);
        Swal.fire("Error", "There was a problem saving the employee.", "error");
      }
    },
  },
});
