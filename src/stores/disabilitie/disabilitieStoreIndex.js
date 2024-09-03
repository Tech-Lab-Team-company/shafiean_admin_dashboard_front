import { defineStore } from "pinia";
import axios from "axios";
// import Swal from "sweetalert2";

export const useDisabilitieStore = defineStore("disabilities", {
  state: () => ({
    disabilitie: [],
  }),
  actions: {
    async fetchDisabilitie() {
      try {
        const response = await axios.post("fetch_disabilities");
        this.disabilitie = response.data.data.data;
        console.log(this.disabilitie, "dis");

        if (response.data.status == true) {
          console.log(this.disabilitie);
        } else {
          console.log("erorr");
        }
      } catch (error) {
        console.error("Error fetching disabilitie:", error);
      }
    },
  },
});
