import { defineStore } from "pinia";
import axios from "axios";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

import Swal from "sweetalert2";

export const useLessonsStore = defineStore("lessons", {
  state: () => ({
    lessons: [],
  }),

  actions: {
    async fetchLessons(page = 1, word = "") {
      try {
        const response = await axios.post(`fetch_sessions?page=${page}`, {
          word: word,
        });

        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;
        if (response.data.status == true) {
          this.lessons = response.data.data.data;
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
          console.log(this.lessons, "Diaaa");
        } else {
          console.log("Error fetching lessons.");
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    },
    async deletelessons(id) {
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
          await axios.post("delete_session", { id });

          const index = this.lessons.findIndex((les) => les.id === id);
          if (index !== -1) {
            this.lessons.splice(index, 1);
          }

          Swal.fire("Deleted!", "The lessons has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the lessons.",
          "error"
        );
      }
    },
    filterLessons(word) {
      if (word === "") {
        return this.lessons; // Return all Curriculas if no search word
      } else {
        return this.lessons.filter(
          (dis) =>
            dis.name.toLowerCase().includes(word.toLowerCase()) || // Search by name
            dis.email.toLowerCase().includes(word.toLowerCase()) || // Search by email
            dis.phone.includes(word) // Search by phone number
        );
      }
    },
  },
});
