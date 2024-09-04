import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useDisabilitieStore = defineStore("disabilities", {
  state: () => ({
    disabilitie: [],
  }),
  actions: {
    async fetchDisabilitie() {
      try {
        const response = await axios.post("fetch_disabilities");
        this.disabilitie = response.data.data.data;

        if (response.data.status == true) {
          console.log(this.disabilitie);
        } else {
          console.log("Error fetching disabilities.");
        }
      } catch (error) {
        console.error("Error fetching disabilities:", error);
      }
    },
    async deleteDisabilitie(id) {
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
          await axios.post("delete_disability", { id });

          const index = this.disabilitie.findIndex((emp) => emp.id === id);
          if (index !== -1) {
            this.disabilitie.splice(index, 1);
          }

          Swal.fire("Deleted!", "The disability has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the disability.",
          "error"
        );
      }
    },
  },
});
