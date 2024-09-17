import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLessonsEditStore = defineStore("lessonsEdit", {
  state: () => ({
    lessons: [],
    lesson: {}, // Stores stages data
    Stages_id: [],
  }),
  actions: {
    async fetchSteps() {
      try {
        const response = await axios.post("fetch_stages");
        console.log(response.data.data.data, "Stages");

        if (response.data.status === true) {
          this.lesson = response.data.data.data; // Assign the fetched stages to lesson

          this.lesson.forEach((ste) => {
            this.Stages_id.push(ste.id);
          });
        } else {
          console.log("Error fetching Stages.");
        }
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    },
    async fetchLessons(id) {
      try {
        const response = await axios.post("fetch_session_details", { id });
        if (response.data.status == true) {
          this.lessons = response.data.data;
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
        // formData.append("start_verse", updatedData.start_verse);
        // formData.append("end_verse", updatedData.end_verse);
        formData.append("stage_id", updatedData.stage_id);
        formData.append("quraan", updatedData.quraan_id);

        const response = await axios.post("edit_session", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status == true) {
          this.lessons = this.updatedData;
          console.log("nasa");

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
