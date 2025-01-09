import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth/AuthStore";
import Login from "@/views/dashboard/Auth/LoginPage.vue";
import Forget from "@/views/dashboard/Auth/ForgetPassword.vue";
import CodeReset from "@/views/dashboard/Auth/CodeReset.vue";
import Dashboard from "@/views/dashboard/dashboard.vue";
import HomeView from "@/views/dashboard/HomePage/HomeView.vue";
import EmployeesIndex from "@/views/dashboard/employees/EmployeesIndex.vue";
import DisabilitiesIndex from "@/views/dashboard/disabilities/DisabilitiesIndex.vue";
import EmployeesAdd from "@/views/dashboard/employees/EmployeesAdd.vue";
import EmployeesEdit from "@/views/dashboard/employees/EmployeesEdit.vue";
import EmployeesView from "@/views/dashboard/employees/EmployeesView.vue";
import DisabilitiesAdd from "@/views/dashboard/disabilities/DisabilitiesAdd.vue";
import DisabilitiesEdit from "@/views/dashboard/disabilities/DisabilitiesEdit.vue";
import DisabilitiesView from "@/views/dashboard/disabilities/DisabilitiesView.vue";
import CurriculaIndex from "@/views/dashboard/Curricula/CurriculaIndex.vue";
import CurriculaView from "@/views/dashboard/Curricula/CurriculaView.vue";
import CurriculaAdd from "@/views/dashboard/Curricula/CurriculaAdd.vue";
import CurriculaEdit from "@/views/dashboard/Curricula/CurriculaEdit.vue";
import StepsIndex from "@/views/dashboard/steps/StepsIndex.vue";
import stepsAdd from "@/views/dashboard/steps/stepsAdd.vue";
import stepsEdit from "@/views/dashboard/steps/stepsEdit.vue";
import stepsView from "@/views/dashboard/steps/stepsView.vue";
import countriesIndex from "@/views/dashboard/countries/countriesIndex.vue";
import countriesAdd from "@/views/dashboard/countries/countriesAdd.vue";
import countriesEdit from "@/views/dashboard/countries/countriesEdit.vue";
import countriesView from "@/views/dashboard/countries/countriesView.vue";
import associationsIndex from "@/views/dashboard/associations/associationsIndex.vue";
import associationsAdd from "@/views/dashboard/associations/associationsAdd.vue";
import associationsEdit from "@/views/dashboard/associations/associationsEdit.vue";
import associationsView from "@/views/dashboard/associations/associationsView.vue";
import adminInformationIndex from "@/views/dashboard/adminInformation/adminInformationIndex.vue";
import LessonsIndex from "@/views/dashboard/lessons/lessonsIndex.vue";
import lessonsAdd from "@/views/dashboard/lessons/lessonsAdd.vue";
import lessonsEdit from "@/views/dashboard/lessons/lessonsEdit.vue";
import LessonsView from "@/views/dashboard/lessons/LessonsView.vue";
import CitiesIndex from "@/views/dashboard/cities/CitiesIndex.vue";
import CitiesAdd from "@/views/dashboard/cities/CitiesAdd.vue";
import CitiesEdit from "@/views/dashboard/cities/CitiesEdit.vue";
import CitiesView from "@/views/dashboard/cities/CitiesView.vue";
import ErrorPage from "@/views/ErrorPage/ErrorPage.vue";
import HeaderView from "@/components/Home/HeaderView.vue";
import BodyView from "@/components/Home/BodyView.vue";
import YearsIndex from "@/views/dashboard/yearsSections/YearsIndex.vue";
import YearsAdd from "@/views/dashboard/yearsSections/YearsAdd.vue";
import YearsEdit from "@/views/dashboard/yearsSections/YearsEdit.vue";
import YearsView from "@/views/dashboard/yearsSections/YearsView.vue";
import ClassesIndex from "@/views/dashboard/classesSection/ClassesIndex.vue";
import ClassesAdd from "@/views/dashboard/classesSection/ClassesAdd.vue";
import ClassesEdit from "@/views/dashboard/classesSection/ClassesEdit.vue";
import ClassesView from "@/views/dashboard/classesSection/ClassesView.vue";
import IndexPermission from "@/views/dashboard/permissions/IndexPermissions.vue";
import AddPermission from "@/views/dashboard/permissions/AddPermissions.vue";
import AddTypeLesson from "@/views/dashboard/typelesson/AddTypeLesson.vue";
import EditTypeLesson from "@/views/dashboard/typelesson/EditTypeLesson.vue";
import IndexTypeLesson from "@/views/dashboard/typelesson/IndexTypeLesson.vue";
import ViewTypeLesson from "@/views/dashboard/typelesson/ViewTypeLesson.vue";
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
        path: "/view-employee/:id",
        name: "EmployeesView",
        component: EmployeesView,
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
        path: "/view-disabilities/:id",
        name: "DisabilitiesView",
        component: DisabilitiesView,
      },
      {
        path: "/Curricula",
        name: "Curricula",
        component: CurriculaIndex,
      },
      {
        path: "/view-Curricula/:id",
        name: "CurriculaView",
        component: CurriculaView,
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
        path: "/view-steps/:id",
        name: "stepsView",
        component: stepsView,
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
        path: "/view-countries/:id",
        name: "CountriesView",
        component: countriesView,
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
        path: "/view-associations/:id",
        name: "associationsView",
        component: associationsView,
      },
      {
        path: "/adminInformation",
        name: "adminInformationIndex",
        component: adminInformationIndex,
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
      {
        path: "/view-lessons/:id",
        name: "lessonsView",
        component: LessonsView,
      },
      {
        path: "/cities",
        name: "CitiesIndex",
        component: CitiesIndex,
      },
      {
        path: "/add-cities",
        name: "CitiesAdd",
        component: CitiesAdd,
      },
      {
        path: "/edit-cities/:id",
        name: "CitiesEdit",
        component: CitiesEdit,
      },
      {
        path: "/view-cities/:id",
        name: "CitiesView",
        component: CitiesView,
      },
      {
        path: "/header",
        name: "Header-view",
        component: HeaderView,
      },
      {
        path: "/body",
        name: "Body-view",
        component: BodyView,
      },
      {
        path: "/years",
        name: "YearsIndex",
        component: YearsIndex,
      },
      {
        path: "/add-years",
        name: "YearsAdd",
        component: YearsAdd,
      },
      {
        path: "/edit-years/:id",
        name: "YearsEdit",
        component: YearsEdit,
      },
      {
        path: '/view-years/:id',
        name: 'YearsView',
        component: YearsView
      },
      {
        path: "/classes",
        name: "ClassesIndex",
        component: ClassesIndex,
      },
      {
        path: "/add-classes",
        name: "ClassesAdd",
        component: ClassesAdd,
      },
      {
        path: "/edit-classes/:id",
        name: "ClassesEdit",
        component: ClassesEdit,
      },
      {
        path: "/view-classes/:id",
        name: "ClassesView",
        component: ClassesView,
      },
      {
        path: "/index-permission",
        name: "index-permission",
        component: IndexPermission,
      },
      {
        path: "/add-permission",
        name: "add-permission",
        component: AddPermission,
      },
      {
        path: "/add-type-lesson",
        name: "add-type-lesson",
        component: AddTypeLesson,
      },
      {
        path: "/edit-type-lesson",
        name: "edit-type-lesson",
        component: EditTypeLesson,
      },
      {
        path: "/index-type-lesson",
        name: "index-type-lesson",
        component: IndexTypeLesson,
      },
      {
        path: "/view-type-lesson",
        name: "view-type-lesson",
        component: ViewTypeLesson,
      },
    ],
  },
  {
    path: "/",
    redirect: "/login", // Redirect to login if not authenticated
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
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
