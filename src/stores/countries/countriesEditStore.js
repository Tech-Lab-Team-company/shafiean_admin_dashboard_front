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
        if (response.data.status === true) {
          this.countries = response.data.data;
        } else {
          throw new Error(
            response.data.message || "Failed to fetch countries data"
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Something went wrong while fetching data.",
        });
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
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.status === true) {
          this.countries = { ...this.countries, ...updatedData };

          Swal.fire({
            icon: "success",
            title: "Success",
            text:
              response.data.message || "Country has been updated successfully.",
          });
        } else {
          throw new Error(
            response.data.message || "Failed to update the country."
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.message || "Something went wrong while updating the country.",
        });
        console.error(error);
      }
    },
  },
});
