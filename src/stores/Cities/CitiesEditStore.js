import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCitiesEditStore = defineStore("citiesEdit", {
  state: () => ({
    cities: [],
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
    async fetchCities(id) {
      try {
        const response = await axios.post("fetch_city_details", { id });
        if (response.status === 200) {
          this.cities = response.data.data;
        } else {
          throw new Error("Failed to fetch Cities data");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async updateCities(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);

        formData.append("title", updatedData.title);
        formData.append("country_id", updatedData.country_id);

        const response = await axios.post("edit_city", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.cities = response.data.data;
          Swal.fire("Success", "cities has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update cities.", "error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
