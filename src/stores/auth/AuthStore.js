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
        const response = await axios.post("admin/login", credentials);

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
    async logout() {
      try {
        const res = axios.post("admin/logout");

        console.log(res.status);
        if (res) {
          this.token = null;
          this.data = {};
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Logout Successful",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }
    },
  },
  async submitPasswordResetEmail(email) {
    try {
      await axios.post("/api/password-reset", { email });
    } catch (error) {
      console.error("Password reset email submission failed:", error);
    }
  },
  async validateCode(code) {
    try {
      const response = await axios.post("/api/validate-code", { code });
      if (response.data.valid) {
        this.$router.push("/reset-password");
      } else {
        alert("Invalid code.");
      }
    } catch (error) {
      console.error("Code validation failed:", error);
    }
  },
});
