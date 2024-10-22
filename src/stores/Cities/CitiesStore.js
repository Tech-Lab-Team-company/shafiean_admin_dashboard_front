import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
export const useCitiesStore = defineStore("cities", {
  state: () => ({
    cities: [],
  }),
  actions: {
    async fetchCities(page = 1, word = "") {
      try {
        const response = await axios.post(`fetch_cities?page=${page}`, {
          word: word,
        });

        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;
        this.cities = response.data.data.data;
        if (response.data.status == true) {
          console.log(this.cities, "Diaaa");
          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
        } else {
          console.log("Error fetching cities.");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    async deleteCities(id) {
      try {
        const result = await Swal.fire({
          title: "هل انتا متاكد من عملية المسح?",
          text: "لن تتمكن من التراجع عن هذا!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم، احذفه!",
        });

        if (result.isConfirmed) {
          await axios.post("delete_city", { id });

          const index = this.cities.findIndex((cit) => cit.id === id);
          if (index !== -1) {
            this.cities.splice(index, 1);
          }

          Swal.fire("Deleted!", "The cities has been deleted.", "success");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the cities.", "error");
      }
    },
    filterCities(word) {
      if (word === "") {
        return this.cities; // Return all Curriculas if no search word
      } else {
        return this.cities.filter(
          (dis) =>
            dis.name.toLowerCase().includes(word.toLowerCase()) || // Search by name
            dis.email.toLowerCase().includes(word.toLowerCase()) || // Search by email
            dis.phone.includes(word) // Search by phone number
        );
      }
    },
  },
});
