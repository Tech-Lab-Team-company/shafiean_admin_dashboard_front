import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCitiesStore = defineStore("cities", {
  state: () => ({
    cities: [],
  }),
  actions: {
    async fetchCities() {
      try {
        const response = await axios.post("fetch_cities");
        this.cities = response.data.data.data;
        if (response.data.status == true) {
          console.log(this.cities, "Diaaa");
        } else {
          console.log("Error fetching cities.");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    async deleteCities(id) {
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
          await axios.post("delete_city", { id });

          // العثور على البلد وحذفه
          const index = this.cities.findIndex((cit) => cit.id === id);
          if (index !== -1) {
            this.cities.splice(index, 1);
          }

          Swal.fire("Deleted!", "The cities has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the cities.", "error");
      }
    },
  },
});
