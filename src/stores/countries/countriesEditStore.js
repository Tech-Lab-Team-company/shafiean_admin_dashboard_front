import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCountriesEditStore = defineStore("countriesEdit", {
  state: () => ({
    countries: {},
  }),
  actions: {
    async fetchCountries(id) {
      try {
        const response = await axios.post("fetch_country_details", { id });
        if (response.status === 200) {
          this.countries = response.data.data;
        } else {
          throw new Error("Failed to fetch countries data");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async updateCountries(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);

        formData.append("title", updatedData.title);
        formData.append("code", updatedData.code);
        formData.append("phone_code", updatedData.phone_code);

        const response = await axios.post("edit_country", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.countries = response.data.data;
          Swal.fire("Success", "country has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update country.", "error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
