// import { defineStore } from "pinia";
// import axios from "axios";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     token: null,
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
//     async register(credentials) {
//       try {
//         const response = await axios.post("/api/register", credentials);
//         this.token = response.data.token;
//         this.user = response.data.user;
//         axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
//         localStorage.setItem("token", this.token);
//       } catch (error) {
//         console.error("Registration failed:", error);
//       }
//     },
//     logout() {
//       this.token = null;
//       this.user = null;
//       axios.defaults.headers.common["Authorization"] = null;
//       localStorage.removeItem("token");
//     },
//     loadToken() {
//       const token = localStorage.getItem("token");
//       if (token) {
//         this.token = token;
//         axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
//       }
//     },
//   },
// });
