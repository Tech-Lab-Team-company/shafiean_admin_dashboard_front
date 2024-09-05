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
        if (response.data.status === true) {
          this.Curriculas = response.data.data;
          console.log(this.Curriculas, "Curriculas");
        } else {
          throw new Error("Failed to fetch employee data");
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
        formData.append("status", updatedData.status);
        const response = await axios.post("edit_curriculum", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.Curriculas = response.data.data;
          Swal.fire("Success", "Curriculum has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update curriculum.", "error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
