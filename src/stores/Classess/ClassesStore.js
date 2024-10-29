import { defineStore } from "pinia";
import axios from "axios";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import Swal from "sweetalert2";

export const useClassesStore = defineStore("Classes", {
  state: () => ({
    Classes: [],
  }),

  actions: {
    async getClasses(page = 1, word = "") {
      try {
        const response = await axios.post(`fetch_seasons?page=${page}`, {
          word: word,
        });

        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;

        if (response.data.status) {
          this.Classes = response.data.data.data;
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
        } else {
          console.log("Error fetching Classes.");
        }
      } catch (error) {
        console.error("Error fetching Classes:", error);
      }
    },

    async deleteClasses(id) {
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
          await axios.post("delete_season", { id });

          const index = this.Classes.findIndex((cl) => cl.id === id);
          if (index !== -1) {
            this.Classes.splice(index, 1);
          }

          Swal.fire("Deleted!", "The Classes has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the Classes.",
          "error"
        );
      }
    },
    filterClasses(word) {
      if (word === "") {
        return this.Classes; // Return all Curriculas if no search word
      } else {
        return this.Classes.filter(
          (dis) =>
            dis.name.toLowerCase().includes(word.toLowerCase()) || // Search by name
            dis.email.toLowerCase().includes(word.toLowerCase()) || // Search by email
            dis.phone.includes(word) // Search by phone number
        );
      }
    },
  },
});
