import { defineStore } from "pinia";
import axios from "axios";
export const useOrganizationsStore = defineStore("associations", {
  state: () => ({
    organizations: [],
  }),
  actions: {
    async fetchOrganizations() {
      const response = await axios.post("fetch_organizations");
      this.organizations = response.data.data.data;
      console.log(this.organizations, "Dioioioi");
      if (response.data.status == true) {
        console.log(this.organizations);
      } else {
        console.log("Error fetching organizations.");
      }
    },
  },
});
