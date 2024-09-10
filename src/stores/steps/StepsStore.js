import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useStepsStore = defineStore("steps", {
  state: () => ({
    steps: [],
  }),

  actions: {
    async getSteps() {
      try {
        const response = await axios.post("fetch_stages");
        this.steps = response.data.data.data;
        if (response.data.status == true) {
          console.log(this.steps, "Diaaa");
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
  },
});
