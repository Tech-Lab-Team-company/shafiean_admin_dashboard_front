import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth/AuthStore";
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
    path: "/Code",
    name: "Code",
    component: CodeReset,
    meta: { guest: true },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
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
        path: "/edit-employee/:id",
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
        path: "/edit-disabilities/:id",
        name: "DisabilitiesEdit",
        component: DisabilitiesEdit,
      },
    ],
  },
  {
    path: "/",
    redirect: "/login", // Redirect to login if not authenticated
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Authentication Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    // If trying to access a protected route without being authenticated, redirect to login
    next({ name: "login" });
  } else if (to.meta.guest && authStore.token) {
    // If already authenticated and trying to access a guest route, redirect to dashboard
    next({ name: "home" });
  } else {
    next(); // Proceed to the route
  }
});

export default router;
