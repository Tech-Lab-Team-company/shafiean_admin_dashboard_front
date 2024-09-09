import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useOrganizationAddStore = defineStore("organizationAdd", {
  state: () => ({
    organizations: [],
    cities: [],
    cities_id: [],
  }),
  actions: {
    async getcities() {
      const response = await axios.post("fetch_cities");
      if (response.data.status === true) {
        this.cities = response.data.data.data;

        // Loop through the cities and extract the id
        this.cities.forEach((city) => {
          // console.log(city.id, "City ID");

          this.cities_id.push(city.id);
          console.log(this.cities_id, "cities sssssssssssssssssssssssssid");
        });
      } else {
        console.log("Error fetching cities.");
      }
    },

    async addOrganization(organizationData) {
      try {
        const fromData = new FormData();
        Object.keys(organizationData).forEach((key) => {
          if (key === "image" && organizationData[key]) {
            fromData.append("image", organizationData[key]);
          } else {
            fromData.append(key, organizationData[key]);
          }
        });
        // fromData.append("city", organizationData[key]);
        const response = await axios.post("add_organization", fromData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.organizations.push(response.data);
        console.log(this.organizations, "organizations");

        Swal.fire("Success", "Organization has been saved.", "success");
      } catch (error) {
        console.error("Error saving organization:", error);
        Swal.fire(
          "Error",
          "There was a problem saving the organization.",
          "error"
        );
      }
    },
  },
});
