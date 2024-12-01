import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCitiesAddStore = defineStore("CitiesAdd", {
  state: () => ({
    Cities: [],
    countries: [],
    country_id: [],
  }),
  actions: {
    async getCountries() {
      const response = await axios.post("fetch_countries");
      if (response.data.status === true) {
        this.countries = response.data.data.data;
        this.countries.forEach((country) => {
          this.country_id.push(country.id);
        });
      } else {
        console.log("Error fetching countries.");
      }
    },
    async addCitiesData(CitiesData) {
      try {
        const formData = new FormData();
        Object.keys(CitiesData).forEach((key) => {
          formData.append(key, CitiesData[key]);
        });

        const response = await axios.post("add_city", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.Cities.push(response.data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Cities has been saved.",
        });
      } catch (error) {
        console.error("Error saving Cities:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Cities has been filed.",
        });
      }
    },
  },
});
