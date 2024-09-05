import { defineStore } from "pinia";
import axios from "axios";

export const useCurriculaStore = defineStore("curricula", {
  state: () => ({
    Curriculas: [],
  }),
  actions: {
    async fetchCurricula() {
      try {
        const response = await axios.post("fetch_curriculums");
        this.Curriculas = response.data.data.data;
        console.log(this.Curriculas, "Diaa");

        if (response.data.status == true) {
          console.log(this.Curriculas, "Diaa");
        } else {
          console.log("Error fetching curricula.");
        }
      } catch (error) {
        console.error("Error fetching curricula:", error);
      }
    },
  },
});
