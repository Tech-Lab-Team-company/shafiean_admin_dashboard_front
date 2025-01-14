import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useLessonsAddStore = defineStore("LessonsAdd", {
  state: () => ({
    Lessons: [],
    lesson: [], // Stores stages data
    Stages_id: [], // Stores stage IDs
    surahs: [],
    ayahs: [],
    ayahs_ids: [],
    surahs_ids: [],

  }),

  actions: {
    async fetchSteps() {
      try {
        const response = await axios.post("/fetch_stages");
        console.log(response.data.data.data, "Stages");

        if (response.data.status === true) {
          this.lesson = response.data.data.data;
          this.Stages_id = this.lesson.map((stage) => stage.id); // Map IDs directly
        } else {
          console.error("Error fetching Stages.");
        }
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    },
    async fetchSurahs(id) {
      try {
        const response = await axios.post("fetch_stage_surahs", {
          stage_id: id,
        });
        if (response.data.status == true) {
          this.surahs = response.data.data;
          this.surahs_ids = this.surahs.map((ste) => ste.id);
        }
      } catch (error) {
        Swal.fire("Error", "An error occurred while fetching surahs.", "error");
      }
    },
    async fetchayah(id) {
      try {
        const response = await axios.post("fetch_surah_ayahs", {
          surah_id: id,
        });
        if (response.data.status == true) {
          this.ayahs = response.data.data;
          this.ayahs_ids = this.ayahs.map((ste) => ste.id);
        }
      } catch (error) {
        Swal.fire("Error", "An error occurred while fetching surahs.", "error");
      }
    },

    async addLessonsData(LessonsData) {
      try {
        const formData = new FormData();
        Object.keys(LessonsData).forEach((key) => {
          formData.append(key, LessonsData[key]);
        });

        const response = await axios.post("/add_session", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.status === true) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Lesson has been saved.",
          });
          this.Lessons.push(response.data); // Add new lesson to state
          router.push("/lessons");
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
