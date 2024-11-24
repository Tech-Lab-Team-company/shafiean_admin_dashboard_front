import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLessonsAddStore = defineStore("LessonsAdd", {
  state: () => ({
    Lessons: [],
    lesson: [], // Stores stages data
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

    async addLessonsData(LessonsData) {
      console.log(LessonsData);
      try {
        const formData = new FormData();
        Object.keys(LessonsData).forEach((key) => {
          formData.append(key, LessonsData[key]);
        });

        const response = await axios.post("/add_session", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response, "Lesson saved");

        this.Lessons.push(response.data); // Ensure this adds the lesson to the state

        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Lesson has been saved.",
        });

        return response.data; // Return the saved lesson
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Lesson has been filed.",
        });
      }
    },
  },
});
