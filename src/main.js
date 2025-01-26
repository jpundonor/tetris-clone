import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import "./api/firebaseConfig"

const app = createApp(App);

app.use(store);

app.mount("#app");
