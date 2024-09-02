<template>
  <div class="employees-edit">
    <HeaderPages title="تعديل موظف" :showButton="false" />
    <form @submit.prevent="updateEmployee">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="avatar-uploader">
            <label for="avatar">صوره</label>
            <input
              type="file"
              id="avatar"
              @change="handleFileChange"
              accept="image/*"
              ref="fileInput"
              style="display: none"
            />
            <div v-if="!imageSrc" class="upload-icon" @click="triggerFileInput">
              <i class="fa fa-camera"></i>
              <span>اختيار صورة</span>
            </div>
            <div v-if="imageSrc" class="avatar-preview">
              <img :src="imageSrc" alt="Avatar Preview" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for=""> أسم الموظف</label>
          <div class="input">
            <input
              v-model="employee.name"
              type="text"
              placeholder="أدخل أسم الموظف"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for=""> رقم الهاتف</label>
          <div class="input">
            <input
              v-model="employee.phone"
              type="tel"
              placeholder="أدخل رقم الهاتف"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for=""> البريد الالكتروني</label>
          <div class="input">
            <input
              v-model="employee.email"
              type="email"
              placeholder="أدخل البريد الالكتروني"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for=""> الرقم السري</label>
          <div class="input">
            <input
              v-model="employee.password"
              type="password"
              placeholder="أدخل الرقم السري"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="">الصلاحيات</label>
          <multiselect
            v-model="employee.permissions"
            :options="permissionOptions"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save">تعديل</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useEmployeesEditStore } from "@/stores/employees/EmployeesEditStore";

export default {
  name: "EmployeesEdit",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      employee: {
        name: "",
        phone: "",
        email: "",
        password: "",
        permissions: [],
      },
      permissionOptions: ["list", "of", "options"], // Adjust this as needed
      imageSrc: null,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async fetchData() {
      const store = useEmployeesEditStore();
      const id = this.$route.params.id;
      await store.fetchEmployee(id);
      this.employee = store.employees;
    },
    async updateEmployee() {
      const store = useEmployeesEditStore();
      await store.updateEmployee(this.$route.params.id, this.employee); // Update employee data
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
