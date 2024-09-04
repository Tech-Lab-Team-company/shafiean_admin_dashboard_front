import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
export const useEmployeesStore = defineStore("employees", {
  state: () => ({
    employees: [],
    ismaster: [],
    pages: [],
  }),
  actions: {
    async fetchEmployees() {
      try {
        const response = await axios.get(`admins`);
        this.employees = response.data.data;

        this.pages = response.data.pages;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
      this.ismaster = this.employees.map((emp) => emp.is_master);
      console.log(this.ismaster, "is master");
    },
    async deleteEmployee(id) {
      // console.log(id + "nasra");

      try {
        // Show SweetAlert confirmation dialog
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          await axios.post("admins/destroy", { id });
          const index = this.employees.findIndex((emp) => emp.id === id);
          if (index !== -1) {
            this.employees.splice(index, 1);
          }

          // Show success message
          Swal.fire("Deleted!", "The employee has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        Swal.fire(
          "Error!",
          "There was an error deleting the employee.",
          "error"
        );
      }
    },
  },
});
