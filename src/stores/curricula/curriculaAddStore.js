import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCurriculumAddStore = defineStore("curriculaAdd", {
  state: () => ({
    Curriculas: [],
  }),
  actions: {
    async addCurriculasData(CurriculasData) {
      console.log(CurriculasData);
      try {
        const formData = new FormData();
        Object.keys(CurriculasData).forEach((key) => {
          formData.append(key, CurriculasData[key]);
        });

        const response = await axios.post("add_curriculum", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response, "diaaaaaaaaaaaaa");

        this.Curriculas.push(response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Curriculas has been saved.",
        });
      } catch (error) {
        console.error("Error saving Curriculas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Curriculas has been filed.",
        });
      }
    },
  },
});
