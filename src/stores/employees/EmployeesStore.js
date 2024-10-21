import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { useLoadingStore } from "@/stores/loaderpage/LoadingStore";

export const useEmployeesStore = defineStore("employees", {
  state: () => ({
    employees: [],
    ismaster: [],
  }),
  actions: {
    async fetchEmployees(page = 1, word = "") {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();

      try {
        const response = await axios.post(`admins?page=${page}`, {
          word: word,
        });
        const paginationStore = usePaginationStore();
        const { current_page, from, last_page, per_page, to, total } =
          response.data.data.meta;

        if (response.data.status) {
          this.employees = response.data.data.data;
          console.log(this.employees, "Employees List");

          paginationStore.setPage(current_page);
          paginationStore.setfrom(from);
          paginationStore.setlastpage(last_page);
          paginationStore.setperpage(per_page);
          paginationStore.setto(to);
          paginationStore.settotal(total);
        }

        this.ismaster = this.employees.map((emp) => emp.is_master);
        console.log(this.ismaster, "is master");
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        loadingStore.stopLoading();
      }
    },

    async deleteEmployee(id) {
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
          await axios.post("admins/destroy", { id });
          this.employees = this.employees.filter((emp) => emp.id !== id);
          Swal.fire("Deleted!", "The employee has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        Swal.fire(
          "Error!",
          "There was an error deleting the employee.",
          "error"
        );
      }
    },
    filterEmployees(word) {
      if (word === "") {
        this.employees; // إعادة كل الموظفين إذا لم تكن هناك كلمة بحث
      } else {
        this.employees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(word.toLowerCase()) || // البحث في الاسم
            emp.email.toLowerCase().includes(word.toLowerCase()) || // البحث في البريد الإلكتروني
            emp.phone.includes(word) // البحث في رقم الهاتف
        );
      }
    },
  },
});
