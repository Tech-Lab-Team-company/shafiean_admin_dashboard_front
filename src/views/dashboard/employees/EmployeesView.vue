<template>
  <div class="employees-edit">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <HeaderPages title="تفاصيل موظف" :showButton="false" />
    </div>
    <div class="container employees-view">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="avatar-uploader">
            <div
              v-if="employee.image || employee.imageSrc"
              class="avatar-preview"
            >
              <img
                :src="employee.imageSrc ? employee.imageSrc : employee.image"
                alt="Avatar Preview"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <p>أسم الموظف</p>
          <span class="data"> {{ employee.name }} </span>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
          <p>رقم الهاتف</p>

          <span class="data">{{ employee.phone }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 mt-3">
          <p>البريد الالكتروني</p>

          <span class="data">{{ employee.email }}</span>
        </div>

        <!--        <div class="col-lg-6 col-md-6 col-sm-12">-->
        <!--          <label >الصلاحيات</label>-->
        <!--          <multiselect-->
        <!--            v-model="employee.permissions"-->
        <!--            :options="permissionOptions"-->
        <!--            :multiple="true"-->
        <!--            :close-on-select="false"-->
        <!--          ></multiselect>-->

        <!--          <span class="error-feedback" v-if="v$.employee.permissions.$error">{{-->
        <!--            getErrorMessage(v$.employee.permissions)-->
        <!--          }}</span>-->
        <!--        </div>-->
        <button type="button" class="bake mt-3" @click="$router.go(-1)">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";

import { useEmployeesEditStore } from "@/stores/employees/EmployeesEditStore";

export default {
  name: "EmployeesView",
  components: {
    HeaderPages,
  },
  data() {
    return {
      employee: {
        name: "",
        phone: "",
        email: "",
        permissions: [],
        image: null, // Store file object
        imageSrc: "",
      },
    };
  },

  methods: {
    async fetchData() {
      const store = useEmployeesEditStore();
      const id = this.$route.params.id;

      await store.fetchEmployee(id);
      this.employee = store.employee;
    },
    async updateEmployee() {
      const store = useEmployeesEditStore();
      const id = this.$route.params.id;
      await store.updateEmployees(id, {
        name: this.employee.name,
        phone: this.employee.phone,
        email: this.employee.email,
        sssions: this.employee.permissions,
        image: this.employee.image,
      });
      if (
        !this.employee.name ||
        !this.employee.phone ||
        !this.employee.email ||
        // !this.employee.imageSrc ||
        !this.employee.permissions
      ) {
        return;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.employees-view {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
}
p {
  color: #000;
  font-weight: bold;
}

.data {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
}
</style>
