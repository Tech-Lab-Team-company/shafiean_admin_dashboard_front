import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useEmployeesEditStore = defineStore("employeesEdit", {
  state: () => ({
    employees: {},
    employee: {},
  }),
  actions: {
    async fetchEmployee(id) {
      try {
        const response = await axios.post("admins/show", { id });
        if (response.status === 200) {
          this.employee = response.data.data;
        } else {
          throw new Error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show a notification)
      }
    },

    async updateEmployees(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);

        // Append other data
        formData.append("name", updatedData.name);
        formData.append("phone", updatedData.phone);
        formData.append("email", updatedData.email);
        formData.append("permissions", updatedData.job_title);

        // Append the image file if available
        if (updatedData.image) {
          console.log(formData.image + "nnnn");
          formData.append("image", updatedData.image);
        }

        const response = await axios.post("admins/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status == true) {
          await router.push("/employees");
          this.employee = updatedData;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Employee has been saved.",
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Employee has been filed.",
          });
        }
      } catch (error) {
        console.error("Error", "Failed to update employee.", "error");
        const errorMessage = error.response?.data?.message || "حدث خطأ غير متوقع";
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: errorMessage,
        });
        console.error("Error saving employee:", error);
      }
    },
  },
});
