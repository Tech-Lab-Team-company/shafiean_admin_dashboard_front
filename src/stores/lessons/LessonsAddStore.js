import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLessonsAddStore = defineStore("LessonsAdd", {
  state: () => ({
    Lessons: [],
  }),

  actions: {
    async addLessonsData(LessonsData) {
      try {
        const formData = new FormData();

        formData.append("title", LessonsData.title);
        formData.append("start_verse", LessonsData.start_verse);
        formData.append("end_verse", LessonsData.end_verse);
        formData.append("stage_id", LessonsData.stage.id);
        formData.append("quraan_id", LessonsData.quraan.id);

        const response = await axios.post("add_session", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(response.data, "Response data");
        this.Lessons.push(response.data);

        Swal.fire("Success", "Lesson has been saved.", "success");
      } catch (error) {
        console.error("Error saving Lesson:", error);
        Swal.fire("Error", "There was a problem saving the Lesson.", "error");
      }
    },
  },
});
