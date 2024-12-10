import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
export const useLessonsEditStore = defineStore("lessonsEdit", {
  state: () => ({
    lessons: [],
    lesson: {}, 
    Stages_id: [],
    surahs: [],
    surahs_ids: [],
    ayahs: [],
    ayahs_ids: [],
  }),
  actions: {
    async fetchSteps() {
      try {
        const response = await axios.post("fetch_stages");
        console.log(response.data.data.data, "Stages");

        if (response.data.status === true) {
          this.lesson = response.data.data.data;

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
    async fetchSurahs() {
      try {
        const response = await axios.post("fetch_surahs");
        if (response.data.status == true) {
          this.surahs = response.data.data;
          this.surahs_ids = this.surahs.map((ste) => ste.id);
        }
      } catch (error) {
        Swal.fire("Error", "An error occurred while fetching surahs.", "error");
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
      console.log(updatedData, "updatedDataaaaaaaaaaaaaaa");
    
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", updatedData.title);
      formData.append("stage_id", updatedData.stage_id); 
      formData.append("start_ayah_id", updatedData.start_ayah_id);
      formData.append("end_ayah_id", updatedData.end_ayah_id);
      formData.append("surah_id", updatedData.surah_id);  
      const response = await axios.post("edit_session", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      if (response.data.status === true) {
        this.lessons = updatedData;  
        console.log("nasa");
    
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Lessons has been saved.",
        });
        router.push("/lessons");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "Lessons has been filed.",
        });
      }
    }
    ,
  },
});
