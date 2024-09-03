import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useDisabilitieStore = defineStore("DisabilitiesAdd", {
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

        const response = await axios.post("fetch_disabilities", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.Disabilities.push(response.data);

        Swal.fire("Success", "Employee has been saved.", "success");
      } catch (error) {
        console.error("Error saving employee:", error);
        Swal.fire("Error", "There was a problem saving the employee.", "error");
      }
    },
  },
});
