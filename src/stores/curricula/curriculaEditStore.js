import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCurriculumEditStore = defineStore("curriculaEdit", {
  state: () => ({
    Curriculas: [],
  }),
  actions: {
    async fetchCurricula(id) {
      try {
        const response = await axios.post("fetch_curriculum_details", { id });
        if (response.data.status == true) {
          this.Curriculas = response.data.data;
          // console.log(this.Curriculas, "Curriculas");
        } else {
          throw new Error("Failed to fetch Curriculas data");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateCurriculum(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", updatedData.title);
        formData.append("type", updatedData.type);
        // formData.append("status", updatedData.status);
        const response = await axios.post("edit_curriculum", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status == true) {
          this.Curriculas = updatedData;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Curriculum has been saved.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Curriculum has been filed.",
          });
        }
      } catch (error) {
        console.error("error in updating curriculum:", error);
        Swal.fire(
          "Error",
          "There was a problem saving the curriculum.",
          "error"
        );
      }
    },
  },
});
