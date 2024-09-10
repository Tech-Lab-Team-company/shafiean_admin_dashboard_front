import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

export const useCurriculaStore = defineStore("curricula", {
  state: () => ({
    Curriculas: [],
  }),
  actions: {
    async fetchCurricula(page = 1) {
      try {
        const response = await axios.post(`fetch_curriculums/?page=${page}`);
        this.Curriculas = response.data.data.data;
        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;

        if (response.data.status == true) {
          console.log(this.Curriculas, "Diaa");
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
        } else {
          console.log("Error fetching curricula.");
        }
      } catch (error) {
        console.error("Error fetching curricula:", error);
      }
    },
    async deleteCurriculas(id) {
      console.log(id + "diaa");

      try {
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
          await axios.post("delete_curriculm", { id });

          const index = this.Curriculas.findIndex((cur) => cur.id === id);
          if (index !== -1) {
            this.Curriculas.splice(index, 1);
          }

          Swal.fire("Deleted!", "The Curriculas has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the Curriculas.",
          "error"
        );
      }
    },
  },
});
