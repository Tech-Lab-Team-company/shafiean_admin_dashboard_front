import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCitiesAddStore = defineStore("CitiesAdd", {
  state: () => ({
    Cities: [],
  }),
  actions: {
    async addCitiesData(CitiesData) {
      console.log(CitiesData);
      try {
        const formData = new FormData();
        Object.keys(CitiesData).forEach((key) => {
          formData.append(key, CitiesData[key]);
        });

        const response = await axios.post("add_city", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response, "diaaaaaaaaaaaaa");

        this.Cities.push(response.data);

        Swal.fire("Success", "Cities has been saved.", "success");
      } catch (error) {
        console.error("Error saving Cities:", error);
        Swal.fire("Error", "There was a problem saving the Cities.", "error");
      }
    },
  },
});
