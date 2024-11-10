import { defineStore } from "pinia";
import axios from "axios";

export const useHomeStore = defineStore("homeStore", {
  state: () => ({
    lastStudents: [],
    Counts: {
      organization_count: 0,
      teacher_count: 0,
      user_count: 0,
    },
    MostActive: [],
    ChartData: [],
    AllPlaces: [],
  }),

  actions: {
    // Fetch the latest students data
    async getLastStudents() {
      try {
        const response = await axios.post("fetch_latest_students_statistics");

        if (response.data.status === true) {
          this.lastStudents = response.data.data;
          console.log(this.lastStudents, "Fetched Latest Students Data");
        }
      } catch (error) {
        console.error("Error fetching latest students:", error);
      }
    },

    // Fetch counts statistics
    async getCounts() {
      try {
        const response = await axios.post("fetch_count_statistics");

        if (response.data.status === true) {
          this.Counts = response.data.data;
          console.log(this.Counts, "Fetched Counts Data");
        }
      } catch (error) {
        console.error("Error fetching counts statistics:", error);
      }
    },

    // Fetch the most active organizations
    async fetchMostActive() {
      try {
        const response = await axios.post(
          "fetch_most_active_organizations_statistics"
        );

        if (response.data.status === true) {
          this.MostActive = response.data.data;
          console.log(this.MostActive, "Fetched Most Active");
        }
      } catch (error) {
        console.error("Error fetching most active:", error);
      }
    },

    // Fetch data for the first chart
    async fetchFirstChart() {
      try {
        const response = await axios.post(
          "fetch_interacted_rate_with_organization_statistics"
        );

        if (response.data.status === true) {
          this.ChartData = response.data.data;
          console.log(this.ChartData, "Fetched Chart Data");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    },

    // Fetch all places interacted with organizations
    async fetchPlaces() {
      try {
        const response = await axios.post(
          "fetch_best_places_interacted_with_organization_statistics"
        );

        if (response.data.status === true) {
          this.AllPlaces = response.data.data;
          console.log(this.AllPlaces, "Fetched All Places");
        } else {
          console.log("Error fetching All Places");
        }
      } catch (error) {
        console.error("Error fetching All Places:", error);
      }
    },
  },
});
