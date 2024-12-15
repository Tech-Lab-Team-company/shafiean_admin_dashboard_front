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
    surahs: [],
    surahs_ids: [],
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

    async fetchSurah() {
      try {
        const response = await axios.post("fetch_surahs");
        if (response.data.status == true) {
          this.surahs = response.data.data;
          this.surahs_ids = this.surahs.map((ste) => ste.id);
        } else {
          console.error("Error fetching Surah:", response.data.message);
          Swal.fire(
            "Error",
            "Failed to fetch Surah: " + response.data.message,
            "error"
          );
        }
      } catch (error) {
        console.error("Error fetching Surah:", error);
        Swal.fire("Error", "An error occurred while fetching Surah.", "error");
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
        const filteredData = {};
        for (const key in updatedData) {
          if (updatedData.hasOwnProperty(key)) {
            const value = updatedData[key];
            if (Array.isArray(value)) {
              filteredData[key] = value.filter((item) => typeof item === "number");
            } else if (typeof value !== "object") {
              filteredData[key] = value;
            }
          }
        }
    
        console.log("Filtered Data after filtering:", JSON.stringify(filteredData, null, 2));
    
        const formData = new FormData();
    
        for (const key in filteredData) {
          if (filteredData.hasOwnProperty(key)) {
            if (Array.isArray(filteredData[key])) {
              filteredData[key].forEach((item) => {
                formData.append(`${key}[]`, item);
              });
            } else {
              formData.append(key, filteredData[key]);
            }
          }
        }
    
        if (updatedData.surah_ids && updatedData.surah_ids.length > 0) {
          updatedData.surah_ids.forEach(id => {
            formData.append('surah_ids[]', id);  
          });
        } else {
          console.error("No selected surah ID found");
        }
    
        formData.append("is_full", 1);

    
        console.log("FormData before sending:", formData);
    
        const response = await axios.post("edit_stage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        console.log("Server Response:", response.data);
    
        if (response.data.status === true) {
          this.Steps = { ...updatedData };
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Steps have been updated.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Steps update failed.",
          });
        }
      } catch (error) {
        console.error("Error updating steps:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating steps.",
        });
      }
    }
    







  },
});
