import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useStepsEditStore = defineStore("stepsEdit", {
  state: () => ({
    Steps: {},
  }),
  actions: {
    async fetchSteps(id) {
      try {
        const response = await axios.post("fetch_stage_details", { id });
        if (response.status === 200) {
          this.Steps = response.data.data;
        } else {
          throw new Error("Failed to fetch Steps data");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async updateSteps(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);

        formData.append("title", updatedData.title);
        formData.append("description", updatedData.description);

        const response = await axios.post("edit_session", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.Steps = response.data.data;
          Swal.fire("Success", "Steps has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update Steps.", "error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
