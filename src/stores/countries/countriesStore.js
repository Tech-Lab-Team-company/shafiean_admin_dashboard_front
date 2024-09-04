import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCountriesStore = defineStore("countries", {
  state: () => ({
    countries: [],
  }),

  actions: {
    async fetchCountries() {
      try {
        const response = await axios.post("fetch_countries");
        this.countries = response.data.data.data;
        if (response.data.status == true) {
          console.log(this.countries, "gggggg");
        } else {
          console.log("Error fetching countries.");
        }

        console.log(response + "diaaaaaaa");
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
    async deleteCountry(id) {
      console.log(id + "nasra");

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
          await axios.post("delete_country", { id });

          const index = this.countries.findIndex((emp) => emp.id === id);
          if (index !== -1) {
            this.countries.splice(index, 1);
          }

          Swal.fire("Deleted!", "The countries has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the countries.",
          "error"
        );
      }
    },
  },
});
