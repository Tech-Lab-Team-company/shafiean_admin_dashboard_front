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
        const response = await axios.post("edit_country/show", { id });
        if (response.status === 200) {
          this.countries = response.data.data;
        } else {
          throw new Error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show a notification)
      }
    },

    async updateCountries(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);

        // Append other data
        formData.append("name", updatedData.title);
        formData.append("phone", updatedData.code);
        formData.append("email", updatedData.phone_code);

        // Append the image file if available

        const response = await axios.post("edit_country/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.countries = response.data.data;
          Swal.fire("Success", "Employee has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update employee.", "error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
