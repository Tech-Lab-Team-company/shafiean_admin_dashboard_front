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

        this.employees = response.data.data;
        if (response.data.status === true) {
          await router.push("/employees");
          Swal.fire({
            icon: "success",
            title: "تم الحفظ بنجاح",
            text: response.data.message || "تم إضافة الموظف بنجاح",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "خطأ",
            text: response.data.message,
          });
        }
      } catch (error) {
        console.error("Error saving employee:", error);
      }
    },
  },
});
