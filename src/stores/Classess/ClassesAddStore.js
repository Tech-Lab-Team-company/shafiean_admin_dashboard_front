import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useClassesAddStore = defineStore("ClassesAdd", {
  state: () => ({
    Classes: [],
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
    async addClass(classData) {
      try {
        const formData = new FormData();
        Object.keys(classData).forEach((key) => {
          formData.append(key, classData[key]);
        });
        const response = await axios.post("add_season", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.Classes.push(response.data.data);
        Swal.fire("Success", "Classes has been saved.", "success");
      } catch (error) {
        console.error("Error saving Classes:", error);
        Swal.fire("Error", "There was a problem saving the Classes.", "error");
      }
    },
  },
});
