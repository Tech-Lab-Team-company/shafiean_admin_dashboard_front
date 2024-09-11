import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useStepsAddStore = defineStore("StepsAdd", {
  state: () => ({
    Steps: [],
    Stepss: [],
    Curriculums_id: [],
    disabilities: [],
    disabilities_id: [],
  }),
  actions: {
    async fetchCurriculums() {
      const response = await axios.post("fetch_curriculums");
      console.log(response.data.data.data, "Curriculums");

      if (response.data.status === true) {
        this.Stepss = response.data.data.data;

        this.Stepss.forEach((ste) => {
          this.Curriculums_id.push(ste.id);
        });
      } else {
        console.log("Error fetching cities.");
      }
    },

    async getDisabilities() {
      const response = await axios.post("fetch_disabilities");
      if (response.data.status === true) {
        this.disabilities = response.data.data.data;
        this.disabilities.forEach((disability) => {
          this.disabilities_id.push(disability.id);
        });
      } else {
        console.log("Error fetching disabilities.");
      }
    },
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
