import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useTypeLessonsAddStore = defineStore("TypeLessonsAddStore", {
  state: () => ({
    type_Lessons: [],


  }),

  actions: {


    async addLessonsData(LessonsData) {
      try {
        const formData = new FormData();
        Object.keys(LessonsData).forEach((key) => {
          formData.append(key, LessonsData[key]);
        });

        const response = await axios.post("/add_session_type", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.status === true) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Lesson has been saved.",
          });
          this.type_Lessons.push(response.data); // Add new lesson to state
          router.push("/index-type-lesson");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Failed to save the lesson.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "An error occurred while saving the lesson.",
        });
      }
    },
  },
});
