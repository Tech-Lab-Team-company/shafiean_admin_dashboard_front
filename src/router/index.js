import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/dashboard/Auth/LoginPage.vue";
import Forget from "@/views/dashboard/Auth/ForgetPassword.vue";
import Dashboard from "@/views/dashboard/dashboard.vue";
import HomeView from "@/views/dashboard/HomeView.vue";
import EmployeesIndex from "@/views/dashboard/employees/EmployeesIndex.vue";
import EmployeesAdd from "@/views/dashboard/employees/EmployeesAdd.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/forget-password",
    name: "forget",
    component: Forget,
    meta: { guest: true },
  },

  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    name: "Dashboard",
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/employees",
        name: "Employees",
        component: EmployeesIndex,
      },
      {
        path: "/add-employee",
        name: "EmployeesAdd",
        component: EmployeesAdd,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
