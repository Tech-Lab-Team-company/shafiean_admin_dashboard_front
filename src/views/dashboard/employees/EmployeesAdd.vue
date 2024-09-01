<template>
  <div class="employees-add">
    <HeaderPages title="اضافة موظف" :showButton="false" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
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
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">أسم الموظف</label>
          <div class="input">
            <input
              type="text"
              id="name"
              placeholder="أدخل أسم الموظف"
              v-model="form.name"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="phone">رقم الهاتف</label>
          <div class="input">
            <input
              type="text"
              id="phone"
              placeholder="أدخل رقم الهاتف"
              v-model="form.phone"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="email">البريد الالكتروني</label>
          <div class="input">
            <input
              type="email"
              id="email"
              placeholder="أدخل البريد الالكتروني"
              v-model="form.email"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="password">الرقم السري</label>
          <div class="input">
            <input
              type="password"
              id="password"
              placeholder="أدخل الرقم السري"
              v-model="form.password"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="roles">الصلاحيات</label>
          <multiselect
            id="roles"
            v-model="form.role"
            :options="rolesOptions"
            :multiple="true"
            :close-on-select="false"
            track-by="name"
            label="name"
          ></multiselect>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import { useEmployeesAddStore } from "@/stores/employees/EmployeesAddStore";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "EmployeesAdd",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      rolesOptions: ["Admin", "Manager", "Employee"],
      imageSrc: "",
      form: {
        name: "",
        phone: "",
        email: "",
        password: "",
        role: [],
      },
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file; // Store the file in the form data
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async submitForm() {
      try {
        const employeesStore = useEmployeesAddStore();

        if (!employeesStore) {
          throw new Error("Failed to load employees store");
        }

        await employeesStore.fetchEmployees(this.form); // Directly pass the form data
        this.$router.push("/employees");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
  },
};
</script>
