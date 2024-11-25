import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import PrimeVue from "primevue/config";

// Initialize Pinia
const pinia = createPinia();

// Create the app instance and use Pinia and the router
const app = createApp(App);
axios.defaults.baseURL = "https://api.shafean.x-coders.net/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
axios.defaults.headers.common["accept"] = "application/json";
app.use(router);
app.use(pinia);
app.use(PrimeVue);

// Mount the app
app.mount("#app");
