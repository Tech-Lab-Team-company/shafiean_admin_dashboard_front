import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
export const useOrganizationsStore = defineStore("associations", {
  state: () => ({
    organizations: [],
  }),
  actions: {
    async fetchOrganizations(page = 1, word = "") {
      const response = await axios.post(`fetch_organizations?page=${page}`, {
        word: word,
      });

      const paginationStore = usePaginationStore();
      const { current_page, from, last_page, per_page, to, total } =
        response.data.data.meta;

      console.log(this.organizations, "Dioioioi");
      if (response.data.status == true) {
        this.organizations = response.data.data.data;
        paginationStore.setPage(current_page);
        paginationStore.setfrom(from);
        paginationStore.setlastpage(last_page);
        paginationStore.setperpage(per_page);
        paginationStore.setto(to);
        paginationStore.settotal(total);
        console.log(this.organizations);
      } else {
        console.log("Error fetching organizations.");
      }
    },

    async deleteOrganization(id) {
      try {
        // Show SweetAlert confirmation dialog
        const result = await Swal.fire({
          title: "هل انتا متاكد من عملية المسح؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم، احذفه!",
          customClass: {
            popup: "custom-popup",
            title: "custom-title",
            content: "custom-content",
            confirmButton: "custom-confirm-button",
            cancelButton: "custom-cancel-button",
          },
        });

        if (result.isConfirmed) {
          await axios.post("delete_organization", { id });
          const index = this.organizations.findIndex((emp) => emp.id === id);
          if (index !== -1) {
            this.organizations.splice(index, 1);
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
    filterOrganizations(word) {
      if (word === "") {
        return this.organizations; // Return all Curriculas if no search word
      } else {
        return this.organizations.filter(
          (dis) =>
            dis.name.toLowerCase().includes(word.toLowerCase()) || // Search by name
            dis.email.toLowerCase().includes(word.toLowerCase()) || // Search by email
            dis.phone.includes(word) // Search by phone number
        );
      }
    },
  },
});
