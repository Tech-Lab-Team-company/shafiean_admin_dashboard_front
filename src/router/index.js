import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/dashboard/Auth/LoginPage.vue";
import Forget from "@/views/dashboard/Auth/ForgetPassword.vue";
import CodeReset from "@/views/dashboard/Auth/CodeReset.vue";
import Dashboard from "@/views/dashboard/dashboard.vue";
import HomeView from "@/views/dashboard/HomeView.vue";
import EmployeesIndex from "@/views/dashboard/employees/EmployeesIndex.vue";
import DisabilitiesIndex from "@/views/dashboard/disabilities/DisabilitieIndex.vue";
import EmployeesAdd from "@/views/dashboard/employees/EmployeesAdd.vue";
import EmployeesEdit from "@/views/dashboard/employees/EmployeesEdit.vue";
import DisabilitiesAdd from "@/views/dashboard/disabilities/DisabilitiesAdd.vue";
import DisabilitiesEdit from "@/views/dashboard/disabilities/DisabilitiesEdit.vue";
const routes = [
  {
    path: "/Code",
    name: "Code",
    component: CodeReset,
    meta: { guest: true },
  },
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
      {
        path: "/edit-employee",
        name: "EmployeesEdit",
        component: EmployeesEdit,
      },
      {
        path: "/Disabilities",
        name: "Disabilities",
        component: DisabilitiesIndex,
      },
      {
        path: "/add-disabilities",
        name: "DisabilitiesAdd",
        component: DisabilitiesAdd,
      },
      {
        path: "/edit-disabilities",
        name: "DisabilitiesEdit",
        component: DisabilitiesEdit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
