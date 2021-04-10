import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index"
import axios from 'axios'
import '../src/assets/css/style.css'
import '../src/assets/css/tailwind.css'

axios.defaults.withCredentials = true

createApp(App)
  .use(router)
  .mount("#app");
