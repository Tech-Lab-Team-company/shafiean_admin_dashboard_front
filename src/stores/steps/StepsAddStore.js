import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useStepsAddStore = defineStore("StepsAdd", {
  state: () => ({
    Steps: [],
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

    async addStepsData(StepsData) {
      try {
        // Convert disability_ids to an array if it's a string
        if (typeof StepsData.disability_ids === "string") {
          StepsData.disability_ids = StepsData.disability_ids
            .split(",")
            .map((id) => id.trim());
        }

        // Transform the data to FormData
        const formData = new FormData();

        // Append each property to FormData
        Object.keys(StepsData).forEach((key) => {
          if (Array.isArray(StepsData[key])) {
            // If the property is an array, append each item with the same key
            StepsData[key].forEach((item) => {
              formData.append(`${key}[]`, item); // Use key[] for array values
            });
          } else {
            // Append non-array values normally
            formData.append(key, StepsData[key]);
          }
        });

        // Log FormData entries
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`, "FormData");
        }

        // Make the API request
        const response = await axios.post("add_stage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Log response data
        console.log("API Response:", response.data);

        if (response.data.status) {
          this.Steps.push(response.data.data);
          Swal.fire(
            "Success",
            "Steps have been saved successfully.",
            "success"
          );
        } else {
          Swal.fire(
            "Error",
            "There was a problem saving the steps: " + response.data.message,
            "error"
          );
        }
      } catch (error) {
        console.error("Error saving Steps:", error);
        // Swal.fire(
        //   "Error",
        //   "An error occurred while saving the steps.",
        //   "error"
        // );
      }
    },
  },
});
