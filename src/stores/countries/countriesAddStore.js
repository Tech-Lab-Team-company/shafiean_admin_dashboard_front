import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCountriesAddStore = defineStore("CountriesAdd", {
  state: () => ({
    Countries: [],
  }),
  actions: {
    async addCountriesData(CountriesData) {
      console.log(CountriesData);
      try {
        const formData = new FormData();
        Object.keys(CountriesData).forEach((key) => {
          formData.append(key, CountriesData[key]);
        });
        const response = await axios.post("add_country", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response, "diaaaaaaaaaaaaa");

        this.Countries.push(response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Country has been saved.",
        });
      } catch (error) {
        console.error("Error saving country:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Country has been filed.",
        });
      }
    },
  },
});
