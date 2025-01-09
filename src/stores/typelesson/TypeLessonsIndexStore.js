import { defineStore } from "pinia";
import axios from "axios";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

import Swal from "sweetalert2";

export const useTypeLessonsStore = defineStore("typelessons", {
  state: () => ({
    type_lessons: [],
  }),

  actions: {
    async fetchTypeLessons(page = 1, word = "") {
      try {
        const response = await axios.post(`fetch_session_types?page=${page}`, {
          word: word,
        });

        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;
        if (response.data.status == true) {
          this.type_lessons = response.data.data.data;
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
          console.log(this.type_lessons, "Diaaa");
        } else {
          console.log("Error fetching lessons.");
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    },
    async deleteTypeLessons(id) {
      try {
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
          await axios.post("delete_session_type", { id });

          const index = this.type_lessons.findIndex((les) => les.id === id);
          if (index !== -1) {
            this.type_lessons.splice(index, 1);
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
    filterTypeLessons(word) {
      if (word === "") {
        return this.type_lessons; // Return all Curriculas if no search word
      } else {
        return this.type_lessons.filter(
          (dis) =>
            dis.name.toLowerCase().includes(word.toLowerCase()) || // Search by name
            dis.email.toLowerCase().includes(word.toLowerCase()) || // Search by email
            dis.phone.includes(word) // Search by phone number
        );
      }
    },
  },
});
