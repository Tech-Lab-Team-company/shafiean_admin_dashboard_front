import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useStepsEditStore = defineStore("stepsEdit", {
  state: () => ({
    Steps: {},
    Curriculums: [],
    Curriculums_id: [],
    disabilities: [],
    disability_ids: [],
  }),
  actions: {
    async fetchCurriculums() {
      try {
        const response = await axios.post("fetch_curriculums");
        if (response.data.status) {
          this.Curriculums = response.data.data.data;
          this.Curriculums_id = this.Curriculums.map((ste) => ste.id);
        } else {
          console.error("Error fetching curriculums:", response.data.message);
          Swal.fire(
            "Error",
            "Failed to fetch curriculums: " + response.data.message,
            "error"
          );
        }
      } catch (error) {
        console.error("Error fetching curriculums:", error);
        Swal.fire(
          "Error",
          "An error occurred while fetching curriculums.",
          "error"
        );
      }
    },

    async getDisabilities() {
      try {
        const response = await axios.post("fetch_disabilities");
        if (response.data.status) {
          this.disabilities = response.data.data.data;
          this.disability_ids = this.disabilities.map(
            (disability) => disability.id
          );
        } else {
          console.error("Error fetching disabilities:", response.data.message);
          Swal.fire(
            "Error",
            "Failed to fetch disabilities: " + response.data.message,
            "error"
          );
        }
      } catch (error) {
        console.error("Error fetching disabilities:", error);
        Swal.fire(
          "Error",
          "An error occurred while fetching disabilities.",
          "error"
        );
      }
    },

    async fetchSteps(id) {
      try {
        const response = await axios.post("fetch_stage_details", { id });
        if (response.data.status == true) {
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
        if (typeof updatedData.disability_ids === "string") {
          updatedData.disability_ids = updatedData.disability_ids
            .split(",")
            .map((id) => id.trim());
        }
        console.log("updatedData", updatedData.disability_ids);
        const formData = new FormData();
        // Append each property to FormData
        Object.keys(updatedData).forEach((key) => {
          if (Array.isArray(updatedData[key])) {
            // If the property is an array, append each item with the same key
            updatedData[key].forEach((item) => {
              formData.append(`${key}[]`, item); // Use key[] for array values
            });
          } else {
            // Append non-array values normally
            formData.append(key, updatedData[key]);
          }
        });
        formData.append("id", id);

        const response = await axios.post("edit_stage", formData, {
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
