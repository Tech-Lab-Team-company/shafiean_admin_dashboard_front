import { defineStore } from "pinia";
import axios from "axios";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

import Swal from "sweetalert2";

export const useStepsStore = defineStore("steps", {
  state: () => ({
    steps: [],
  }),

  actions: {
    async getSteps(page = 1, word = "") {
      try {
        const response = await axios.post(`fetch_stages?page=${page}`, {
          word: word,
        });
        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;

        if (response.data.status == true) {
          // console.log(this.steps, "Diaaa");
          this.steps = response.data.data.data;
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
        } else {
          console.log("Error fetching steps.");
        }
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    },
    async deleteSteps(id) {
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
          await axios.post("delete_stage", { id });

          const index = this.steps.findIndex((ste) => ste.id === id);
          if (index !== -1) {
            this.steps.splice(index, 1);
          }

          Swal.fire("Deleted!", "The steps has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the steps.", "error");
      }
    },
    filterSteps(word) {
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
