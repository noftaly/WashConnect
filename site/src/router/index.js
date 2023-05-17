import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },

    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../views/WelcomeView.vue"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/balance",
      name: "balance",
      component: () => import("../views/BalanceView.vue"),
    },
    {
      path: "/topup",
      name: "topup",
      component: () => import("../views/TopUp.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/HistoryView.vue"),
    },
    {
      path: "/machines/:id",
      name: "machine",
      component: () => import("../views/machine/MachineView.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchResultsView.vue"),
    },
    {
      path: "/reservations/:id",
      name: "reservation",
      component: () => import("../views/machine/AdReservation.vue"),
    },
    {
      path: "/new_ad",
      name: "new_ad",
      component: () => import("../views/machine/AdCreation.vue"),
    },
  ],
});

export default router;