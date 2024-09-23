import { defineStore } from "pinia";
import axios from "axios";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import Swal from "sweetalert2";

export const useYearsStore = defineStore("years", {
  state: () => ({
    years: [],
  }),

  actions: {
    async getYears() {
      try {
        const response = await axios.post("fetch_years");
        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;

        if (response.data.status) {
          this.years = response.data.data.data;
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
        } else {
          console.log("Error fetching years.");
        }
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    },

    async deleteYear(id) {
      try {
        const result = await Swal.fire({
          title: "هل انتا متاكد من عملية المسح?",
          text: "لا يمكن التراجع عن عملية المسح!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم، احذفه!",
        });

        if (result.isConfirmed) {
          await axios.post("delete_year", { id });

          const index = this.years.findIndex((year) => year.id === id);
          if (index !== -1) {
            this.years.splice(index, 1);
          }

          Swal.fire("Deleted!", "The year has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the year.", "error");
      }
    },
  },
});
