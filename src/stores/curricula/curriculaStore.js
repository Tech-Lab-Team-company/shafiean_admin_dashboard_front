import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

export const useCurriculaStore = defineStore("curricula", {
  state: () => ({
    Curriculas: [],
  }),
  actions: {
    async fetchCurricula(page = 1, word = "") {
      try {
        const response = await axios.post(`fetch_curriculums?page=${page}`, {
          word: word,
        });
        const paginationStore = usePaginationStore();

        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;

        console.log(response.data.data.meta, "meta Data");

        if (response.data.status == true) {
          this.Curriculas = response.data.data.data;
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
          title: "هل انتا متاكد من عملية المسح?",
          text: "لن تتمكن من التراجع عن هذا!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم، احذفه!",
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
    filterCurriculas(word) {
      if (word === "") {
        return this.Curriculas; // Return all Curriculas if no search word
      } else {
        return this.Curriculas.filter(
          (dis) =>
            dis.name.toLowerCase().includes(word.toLowerCase()) || // Search by name
            dis.email.toLowerCase().includes(word.toLowerCase()) || // Search by email
            dis.phone.includes(word) // Search by phone number
        );
      }
    },
  },
});
