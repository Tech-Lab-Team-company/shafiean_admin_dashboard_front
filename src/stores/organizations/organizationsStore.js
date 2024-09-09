import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
export const useOrganizationsStore = defineStore("associations", {
  state: () => ({
    organizations: [],
  }),
  actions: {
    async fetchOrganizations(page = 1) {
      const response = await axios.post(`fetch_organizations?page=${page}`);

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
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
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
  },
});
