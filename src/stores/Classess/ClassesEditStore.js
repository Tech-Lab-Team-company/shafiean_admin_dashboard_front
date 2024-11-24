import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useClassesEditStore = defineStore("ClassesEdit", {
  state: () => ({
    Classes: [],
    countries: [],
    country_id: [],
  }),
  actions: {
    async getCountries() {
      try {
        const response = await axios.post("fetch_countries");
        if (response.data.status) {
          this.countries = response.data.data.data;
        } else {
          console.error("Error fetching countries.");
        }
      } catch (error) {
        console.error("Error in getCountries:", error);
      }
    },

    async fetchClasses(id) {
      try {
        const response = await axios.post("fetch_season_details", { id });
        if (response.data.status) {
          this.Classes = response.data.data;
        } else {
          throw new Error("Failed to fetch Classes data");
        }
      } catch (error) {
        console.error("Error in fetchClasses:", error);
      }
    },

    async updateClass(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", updatedData.title);
        formData.append("country_id", updatedData.country_id);

        const response = await axios.post("edit_season", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status === true) {
          const index = this.Classes.findIndex((cl) => cl.id === id);
          if (index !== -1) {
            this.Classes.splice(index, 1, {
              ...this.Classes[index],
              ...updatedData,
            });
          }
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Classes has been saved.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Classes has been filed.",
          });
        }
      } catch (error) {
        console.error("Error in updateClasses:", error);
      }
    },
  },
});
