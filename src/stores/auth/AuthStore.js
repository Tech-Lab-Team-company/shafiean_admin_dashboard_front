import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    data: {},
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(
          "https://api.shafean.x-coders.net/api/admin/login",
          credentials
        );
        this.token = response.data.data.token;
        this.data = response.data.data;
        console.log(this.data);

        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        localStorage.setItem("token", this.token);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Successful",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      }
    },
    logout() {
      this.token = null;
      this.data = {};
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("token");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logout Successful",
      });
    },
  },
});
