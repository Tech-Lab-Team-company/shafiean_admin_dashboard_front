import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
export const useTypeLessonsEditStore = defineStore("lessonsEdit", {
  state: () => ({
    type_lessons: [],

  }),
  actions: {

    async fetchLessons(id) {
      try {
        const response = await axios.post("fetch_session_type_details", { id });
        if (response.data.status == true) {
          this.type_lessons = response.data.data;
        } else {
          throw new Error("Failed to fetch lessons data");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateLessons(id, updatedData) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", updatedData.title);


      try {
        const response = await axios.post("edit_session_type", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status === true) {
          this.type_lessons = { ...updatedData };
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Lesson has been updated.",
          });
          router.push("/index-type-lesson");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message || "Failed to update the lesson.",
          });
        }
      } catch (error) {
        console.error("Error updating lesson:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An error occurred while updating the lesson.",
        });
      }
    },
  },
});
