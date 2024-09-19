import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useOrganizationAddStore = defineStore("organizationAdd", {
  state: () => ({
    organizations: [],
    cities: [],
    countries: [],
    disabilities: [],
    disabilities_id: [],
    cities_id: [],
    country_id: [],
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
          // console.log(this.cities_id, "cities sssssssssssssssssssssssssid");
        });
      } else {
        console.log("Error fetching cities.");
      }
    },
    async getCountries() {
      const response = await axios.post("fetch_countries");
      if (response.data.status === true) {
        this.countries = response.data.data.data;
        this.countries.forEach((country) => {
          this.country_id.push(country.id);
        });
      } else {
        console.log("Error fetching countries.");
      }
    },

    async getDisabilities() {
      const response = await axios.post("fetch_disabilities");
      if (response.data.status === true) {
        this.disabilities = response.data.data.data;
        this.disabilities.forEach((disability) => {
          this.disabilities_id.push(disability.id);
        });
      } else {
        console.log("Error fetching disabilities.");
      }
    },

    async addOrganization(organizationData) {
      try {
        // Convert disability_ids to an array if it's a string
        if (typeof organizationData.disability_ids === "string") {
          organizationData.disability_ids = organizationData.disability_ids
            .split(",")
            .map((id) => id.trim());
        }

        // Transform the data to FormData
        const formData = new FormData();

        // Append each property to FormData
        Object.keys(organizationData).forEach((key) => {
          if (Array.isArray(organizationData[key])) {
            // If the property is an array, append each item with the same key
            organizationData[key].forEach((item) => {
              formData.append(`${key}[]`, item); // Use key[] for array values
            });
          } else {
            // Append non-array values normally
            formData.append(key, organizationData[key]);
          }
        });

        // Log FormData entries
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`, "FormData");
        }

        // Make the API request
        const response = await axios.post("add_organization", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Log response data
        console.log("API Response:", response.data);

        if (response.data.status) {
          this.organizations.push(response.data);
          Swal.fire(
            "Success",
            "organization have been saved successfully.",
            "success"
          );
        } else {
          Swal.fire(
            "Error",
            "There was a problem saving the organization:" +
              response.data.message,
            "error"
          );
        }
      } catch (error) {
        console.error("Error saving organization:", error);
        Swal.fire(
          "Error",
          "An error occurred while saving the organization.",
          "error"
        );
      }
    },
  },
});
