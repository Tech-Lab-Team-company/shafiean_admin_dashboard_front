import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "@fortawesome/fontawesome-free/css/all.css";

// Initialize Pinia
const pinia = createPinia();

// Create the app instance and use Pinia and the router
const app = createApp(App);

app.use(router);
app.use(pinia);

// Mount the app
app.mount("#app");
