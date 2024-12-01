import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    data: localStorage.getItem("user") || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post("admin/login", credentials);
    
        this.token = response.data.data.token;
        this.data = response.data.data.admin;
    
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(this.data));
    
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "login-success",
        });
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || "login-failed";
    
          if (errorMessage.includes("Invalid email or password")) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "The email or password is incorrect. Please try again.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: errorMessage,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    },
    
    async logout() {
      try {
        const res = axios.post("admin/logout");

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
