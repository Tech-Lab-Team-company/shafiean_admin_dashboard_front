import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useYearsEditStore = defineStore("yearsEdit", {
  state: () => ({
    years: [],
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

    async fetchYears(id) {
      try {
        const response = await axios.post("fetch_year_details", { id });
        if (response.data.status) {
          this.years = response.data.data;
        } else {
          throw new Error("Failed to fetch years data");
        }
      } catch (error) {
        console.error("Error in fetchYears:", error);
      }
    },

    async updateYears(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", updatedData.title);
        formData.append("country_id", updatedData.country_id);

        const response = await axios.post("edit_year", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status === true) {
          router.push("/years");
          Swal.fire({
            icon: "success",
            title: "Success",
            text:
              response.data.message || "Year has been updated successfully.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Year has been filed.",
          });
        }
      } catch (error) {
        console.error("Error in updateYears:", error);
      }
    },
  },
});
