import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useDisabilitieAddStore = defineStore("DisabilitiesAdd", {
  state: () => ({
    Disabilities: [],
  }),
  actions: {
    async addDisabilities(disabilitieData) {
      try {
        const formData = new FormData();
        Object.keys(disabilitieData).forEach((key) => {
          if (key === "image" && disabilitieData[key]) {
            formData.append("image", disabilitieData[key]);
          } else {
            formData.append(key, disabilitieData[key]);
          }
        });

        const response = await axios.post("/add_disability", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);

        this.Disabilities.push(response.data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "disability has been saved.",
        });
      } catch (error) {
        console.error("Error saving disability:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "disability has been filed.",
        });
      }
    },
  },
});
