import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useOrganizationEditStore = defineStore("organizationEdit", {
  state: () => ({
    organizations: [],
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
      try {
        const response = await axios.post("fetch_disabilities");

        if (response.data.status === true) {
          // Store disabilities with both id and title
          this.disabilities = response.data.data.data;

          // Optionally store an array of objects with id and title for easy access
          this.disabilities_id = this.disabilities.map((disability) => ({
            id: disability.id,
            title: disability.title, // Ensure `title` is part of the disability object
          }));

          // Log disabilities for debugging
          console.log(this.disabilities_id);

          // You can also do other things with disabilities here if needed
        } else {
          console.log("Error fetching disabilities.");
        }
      } catch (error) {
        console.error("Error fetching disabilities:", error);
      }
    },

    async fetchOrganizations(id) {
      try {
        const response = await axios.post("fetch_organization_details", { id });
        if (response.data.status == true) {
          this.organizations = response.data.data;
        } else {
          throw new Error("Failed to fetch Cities data");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async updateOrganization(id, updatedData) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", updatedData.image);
        formData.append("name", updatedData.name);
        formData.append("licence_number", updatedData.licence_number);
        formData.append("phone", updatedData.phone);
        formData.append("email", updatedData.email);
        formData.append("address", updatedData.address);
        formData.append("website_link", updatedData.website_link);
        formData.append("country_id", updatedData.country_id);
        formData.append("city_id", updatedData.city_id);

        // Append each item in the disability_ids array as a separate field
        updatedData.disability_ids.forEach((id, index) => {
          formData.append(`disability_ids[${index}]`, id);
        });

        const response = await axios.post("edit_organization", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.status === true) {
          this.organizations = response.data.data;
          console.log(this.organizations);
          Swal.fire("Success", "Organization has been updated.", "success");
        } else {
          console.log("error");
          Swal.fire("Error", "Failed to update Organization.", "error");
        }
      } catch (error) {
        console.error("Error updating Organization:", error);
      }
    },
  },
});
