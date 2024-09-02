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
            <div class="upload-icon" @click="triggerFileInput">
              <i class="fa fa-camera"></i>
              <span>اختيار صورة</span>
            </div>
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
        permissions: [],
        image: null, // Store file object
        imageSrc: "",
      },
      permissionOptions: ["list", "of", "options"], // Adjust this as needed
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.employee.image = file; // Store the file object
        const reader = new FileReader();
        reader.onload = (e) => {
          this.employee.imageSrc = e.target.result; // For preview
        };
        reader.readAsDataURL(file);
      }
    },
    async fetchData() {
      const store = useEmployeesEditStore();
      const id = this.$route.params.id;

      await store.fetchEmployee(id);
      this.employee = store.employee;
    },
    async updateEmployee() {
      console.log(this.employee.image);

      const store = useEmployeesEditStore();
      const id = this.$route.params.id;
      await store.updateEmployees(id, {
        name: this.employee.name,
        phone: this.employee.phone,
        email: this.employee.email,
        sssions: this.employee.permissions,
        image: this.employee.image, // Pass the file object
      });
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
