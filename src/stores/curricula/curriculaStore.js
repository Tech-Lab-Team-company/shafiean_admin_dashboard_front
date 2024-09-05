import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCurriculaStore = defineStore("curricula", {
  state: () => ({
    Curriculas: [],
  }),
  actions: {
    async fetchCurricula() {
      try {
        const response = await axios.post("fetch_curriculums");
        this.Curriculas = response.data.data.data;

        if (response.data.status == true) {
          console.log(this.Curriculas, "Diaa");
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
