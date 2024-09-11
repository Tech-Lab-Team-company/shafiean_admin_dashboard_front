import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useDisabilitieEditStore = defineStore("disabilitiesEdit", {
  state: () => ({
    disabilitie: [],
  }),
  actions: {
    async fetchDisabilitie(id) {
      try {
        const response = await axios.post("fetch_disability_details", {
          id,
        });
        this.disabilitie = response.data.data;
        console.log(this.disabilitie, "disssss");

        if (response.data.status == true) {
          console.log(this.disabilitie);
        } else {
          console.log("erorr");
        }
      } catch (error) {
        console.error("Error fetching disabilitie:", error);
      }
    },
    async updateDisabilitie(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", updatedData.title);
        formData.append("description", updatedData.description);
        formData.append("image", updatedData.image);

        const response = await axios.post("edit_disability", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status == true) {
          this.disabilitie = updatedData;
          Swal.fire("Success", "Disabilitie has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update disabilitie.", "error");
        }
      } catch (error) {
        console.error("Error updating disabilitie:", error);
      }
    },
  },
});
