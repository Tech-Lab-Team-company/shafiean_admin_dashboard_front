import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLessonsEditStore = defineStore("lessonsEdit", {
  state: () => ({
    lessons: {
      id: "",
      title: "",
      start_verse: "",
      end_verse: "",
      stage: { id: null },
      quraan: { id: null },
    },
  }),
  actions: {
    async fetchLessons(id) {
      try {
        const response = await axios.post("fetch_session_details", { id });
        if (response.status === 200) {
          this.lessons = response.data.data.data;
        } else {
          throw new Error("Failed to fetch lessons data");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async updateLessons(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", updatedData.title);
        formData.append("start_verse", updatedData.start_verse);
        formData.append("end_verse", updatedData.end_verse);
        formData.append("stage", updatedData.stage_id);
        formData.append("quraan", updatedData.quraan_id);

        const response = await axios.post("edit_session", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.lessons = response.data.data;
          Swal.fire("Success", "lessons has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update lessons.", "error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
