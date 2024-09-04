import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth/AuthStore";
import Login from "@/views/dashboard/Auth/LoginPage.vue";
import Forget from "@/views/dashboard/Auth/ForgetPassword.vue";
import CodeReset from "@/views/dashboard/Auth/CodeReset.vue";
import Dashboard from "@/views/dashboard/dashboard.vue";
import HomeView from "@/views/dashboard/HomeView.vue";
import EmployeesIndex from "@/views/dashboard/employees/EmployeesIndex.vue";
import DisabilitiesIndex from "@/views/dashboard/disabilities/DisabilitiesIndex.vue";
import EmployeesAdd from "@/views/dashboard/employees/EmployeesAdd.vue";
import EmployeesEdit from "@/views/dashboard/employees/EmployeesEdit.vue";
import DisabilitiesAdd from "@/views/dashboard/disabilities/DisabilitiesAdd.vue";
import DisabilitiesEdit from "@/views/dashboard/disabilities/DisabilitiesEdit.vue";

import CurriculaIndex from "@/views/dashboard/Curricula/CurriculaIndex.vue";
import CurriculaAdd from "@/views/dashboard/Curricula/CurriculaAdd.vue";
import CurriculaEdit from "@/views/dashboard/Curricula/CurriculaEdit.vue";
import StepsIndex from "@/views/dashboard/steps/StepsIndex.vue";
import stepsAdd from "@/views/dashboard/steps/stepsAdd.vue";
import stepsEdit from "@/views/dashboard/steps/stepsEdit.vue";
import countriesIndex from "@/views/dashboard/countries/countriesIndex.vue";
import countriesAdd from "@/views/dashboard/countries/countriesAdd.vue";
import countriesEdit from "@/views/dashboard/countries/countriesEdit.vue";
import associationsIndex from "@/views/dashboard/associations/associationsIndex.vue";
import associationsAdd from "@/views/dashboard/associations/associationsAdd.vue";
import associationsEdit from "@/views/dashboard/associations/associationsEdit.vue";
import adminInformationIndex from "@/views/dashboard/adminInformation/adminInformationIndex.vue";
import adminInformationAdd from "@/views/dashboard/adminInformation/adminInformationAdd.vue";
import adminInformationEdit from "@/views/dashboard/adminInformation/adminInformationEdit.vue";
import LessonsIndex from "@/views/dashboard/lessons/lessonsIndex.vue";
import lessonsAdd from "@/views/dashboard/lessons/lessonsAdd.vue";
import lessonsEdit from "@/views/dashboard/lessons/lessonsEdit.vue";
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
      {
        path: "/Curricula",
        name: "Curricula",
        component: CurriculaIndex,
      },
      {
        path: "/add-curricula",
        name: "CurriculaAdd",
        component: CurriculaAdd,
      },
      {
        path: "/edit-curricula/:id",
        name: "CurriculaEdit",
        component: CurriculaEdit,
      },
      {
        path: "/steps",
        name: "steps",
        component: StepsIndex,
      },
      {
        path: "/add-steps",
        name: "stepsAdd",
        component: stepsAdd,
      },
      {
        path: "/edit-steps/:id",
        name: "stepsEdit",
        component: stepsEdit,
      },
      {
        path: "/countries",
        name: "CountriesIndex",
        component: countriesIndex,
      },
      {
        path: "/add-countries",
        name: "CountriesAdd",
        component: countriesAdd,
      },
      {
        path: "/edit-countries/:id",
        name: "CountriesEdit",
        component: countriesEdit,
      },
      {
        path: "/associations",
        name: "associationsIndex",
        component: associationsIndex,
      },
      {
        path: "/add-associations",
        name: "associationsAdd",
        component: associationsAdd,
      },
      {
        path: "/edit-associations/:id",
        name: "associationsEdit",
        component: associationsEdit,
      },
      {
        path: "/adminInformation",
        name: "adminInformationIndex",
        component: adminInformationIndex,
      },
      {
        path: "/add-adminInformation",
        name: "adminInformationAdd",
        component: adminInformationAdd,
      },
      {
        path: "/edit-adminInformation/:id",
        name: "adminInformationEdit",
        component: adminInformationEdit,
      },
      {
        path: "/lessons",
        name: "lessonsIndex",
        component: LessonsIndex,
      },
      {
        path: "/add-lessons",
        name: "lessonsAdd",
        component: lessonsAdd,
      },
      {
        path: "/edit-lessons/:id",
        name: "lessonsEdit",
        component: lessonsEdit,
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
