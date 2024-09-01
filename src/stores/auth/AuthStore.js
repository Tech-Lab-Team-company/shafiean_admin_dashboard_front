// import { defineStore } from "pinia";
// import axios from "axios";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     token: localStorage.getItem("token") || null,
//     user: null,
//   }),
//   actions: {
//     async login(credentials) {
//       try {
//         const response = await axios.post("/api/login", credentials);
//         this.token = response.data.token;
//         this.user = response.data.user;
//         axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
//         localStorage.setItem("token", this.token);
//       } catch (error) {
//         console.error("Login failed:", error);
//       }
//     },
//     logout() {
//       this.token = null;
//       this.user = null;
//       axios.defaults.headers.common["Authorization"] = null;
//       localStorage.removeItem("token");
//     },
//     async submitPasswordResetEmail(email) {
//       try {
//         await axios.post("/api/password-reset", { email });
//         // Handle success (e.g., navigate to the next step or show a success message)
//       } catch (error) {
//         console.error("Password reset email submission failed:", error);
//       }
//     },
//     async validateCode(code) {
//       try {
//         const response = await axios.post("/api/validate-code", { code });
//         if (response.data.valid) {
//           // Navigate to the reset password page
//           this.$router.push("/reset-password");
//         } else {
//           alert("Invalid code.");
//         }
//       } catch (error) {
//         console.error("Code validation failed:", error);
//       }
//     },
//   },
// });
