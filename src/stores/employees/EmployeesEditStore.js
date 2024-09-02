import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

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
        formData.append("permissions", JSON.stringify(updatedData.permissions));

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

        if (response.status === 200) {
          this.employee = response.data.data;
          Swal.fire("Success", "Employee has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update employee.", "error");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show a notification)
      }
    },
  },
});
