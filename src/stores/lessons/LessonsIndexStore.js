import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLessonsStore = defineStore("lessons", {
  state: () => ({
    lessons: [],
  }),

  actions: {
    async fetchLessons() {
      try {
        const response = await axios.post("fetch_stages");
        if (response.data.status === true) {
          this.lessons = response.data.data.data;
          console.log(this.lessons);
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
  },
});
