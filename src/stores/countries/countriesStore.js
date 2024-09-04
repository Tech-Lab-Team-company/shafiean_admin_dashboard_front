import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";

export const useCountriesStore = defineStore("countries", {
  state: () => ({
    countries: [],
  }),

  actions: {
    async fetchCountries(page = 1) {
      try {
        const response = await axios.post("fetch_countries", { page });
        const paginationStore = usePaginationStore();

        this.countries = response.data.data.data;
        if (response.data.status == true) {
          paginationStore.setPage(response.data.data.current_page);
          paginationStore.setfrom(response.data.data.from);
          paginationStore.setlastpage(response.data.data.last_page);
          paginationStore.setperpage(response.data.data.per_page);
          paginationStore.setto(response.data.data.to);
          paginationStore.settotal(response.data.data.total);
        } else {
          console.log("Error fetching countries.");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
    async deleteCountry(id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          await axios.post("delete_country", { id });

          const index = this.countries.findIndex((emp) => emp.id === id);
          if (index !== -1) {
            this.countries.splice(index, 1);
          }

          Swal.fire("Deleted!", "The country has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the country.", "error");
      }
    },
  },
});
