import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useLessonsAddStore = defineStore("LessonsAdd", {
  state: () => ({
    Lessons: [],
    curriculums: [],
    Curriculum_id: [],
  }),
  actions: {
    async getcurriculum() {
      const response = await axios.post("fetch_curriculums");
      if (response.data.status == true) {
        this.curriculums = response.data.data.data;
        this.curriculums.forEach((curriculum) => {
          this.Curriculum_id = curriculum.id;
          console.log(this.Curriculum_id, "nasra");
        });
      } else {
        console.log("Error fetching curriculums.");
      }
    },
    async addLessonsData(LessonsData) {
      console.log(LessonsData);
      try {
        const formData = new FormData();
        Object.keys(LessonsData).forEach((key) => {
          formData.append(key, LessonsData[key]);
        });

        const response = await axios.post("add_stage", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response, "diaaaaaaaaaaaaa");

        this.Lessons.push(response.data);

        Swal.fire("Success", "Lessons has been saved.", "success");
      } catch (error) {
        console.error("Error saving Lessons:", error);
        Swal.fire("Error", "There was a problem saving the Lessons.", "error");
      }
    },
  },
});
