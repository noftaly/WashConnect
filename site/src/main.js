import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from "@fortawesome/vue-fontawesome";
import {
  faWallet,
  faCalendarCheck,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faEuroSign,
  faClock,
  faWeightScale,
  faLocationDot,
  faPhone,
  faEnvelope,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Toast from "vue-toastification";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";
import "./assets/main.scss";

library.add(
  faWallet,
  faCalendarCheck,
  faCircleUser,
  faUser,
  faRightToBracket,
  faRightFromBracket,
  faEuroSign,
  faClock,
  faWeightScale,
  faLocationDot,
  faPhone,
  faEnvelope,
  faIdCard
);

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Toast, {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: "button",
  icon: true,
});
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("font-awesome-layers", FontAwesomeLayers);
app.component("font-awesome-layers-text", FontAwesomeLayersText);
app.mount("#app");
