import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useStepsAddStore = defineStore("StepsAdd", {
  state: () => ({
    Steps: [],
  }),
  actions: {
    async addStepsData(StepsData) {
      console.log(StepsData);
      try {
        const formData = new FormData();
        Object.keys(StepsData).forEach((key) => {
          formData.append(key, StepsData[key]);
        });

        const response = await axios.post("add_stage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response, "diaaaaaaaaaaaaa");

        this.Steps.push(response.data);

        Swal.fire("Success", "Steps has been saved.", "success");
      } catch (error) {
        console.error("Error saving Steps:", error);
        Swal.fire("Error", "There was a problem saving the Steps.", "error");
      }
    },
  },
});
