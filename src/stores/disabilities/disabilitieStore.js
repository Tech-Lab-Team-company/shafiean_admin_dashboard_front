import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

export const useDisabilitieStore = defineStore("disabilities", {
  state: () => ({
    disabilitie: [],
  }),
  actions: {
    async fetchDisabilitie(page = 1) {
      try {
        const response = await axios.post(`fetch_disabilities?page=${page}`);
        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;

        if (response.data.status == true) {
          this.disabilitie = response.data.data.data;
          console.log(this.disabilitie);
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
        } else {
          console.log("Error fetching disabilities.");
        }
      } catch (error) {
        console.error("Error fetching disabilities:", error);
      }
    },
    async deleteDisabilitie(id) {
      try {
        const result = await Swal.fire({
          title: "هل انتا متاكد من عملية المسح?",
          text: "لن تتمكن من التراجع عن هذا!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم، احذفه!",
        });

        if (result.isConfirmed) {
          await axios.post("delete_disability", { id });

          const index = this.disabilitie.findIndex((emp) => emp.id === id);
          if (index !== -1) {
            this.disabilitie.splice(index, 1);
          }

          Swal.fire("Deleted!", "The disability has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the disability.",
          "error"
        );
      }
    },
  },
});
