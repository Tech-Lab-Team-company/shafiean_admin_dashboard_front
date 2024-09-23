import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useYearsAddStore = defineStore("YearsAdd", {
  state: () => ({
    Years: [],
    countries: [],
  }),
  actions: {
    async fetchCountries() {
      try {
        const response = await axios.post("fetch_countries");
        if (response.data.status) {
          this.countries = response.data.data.data;
        } else {
          throw new Error("Error fetching countries.");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Could not fetch countries.", "error");
      }
    },
    async addYear(yearData) {
      try {
        const formData = new FormData();
        Object.keys(yearData).forEach((key) => {
          formData.append(key, yearData[key]);
        });
        const response = await axios.post("add_year", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.Years.push(response.data.data);
        Swal.fire("Success", "Year has been saved.", "success");
      } catch (error) {
        console.error("Error saving Year:", error);
        Swal.fire("Error", "There was a problem saving the Year.", "error");
      }
    },
  },
});
