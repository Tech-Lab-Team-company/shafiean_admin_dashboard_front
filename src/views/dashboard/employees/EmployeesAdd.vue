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
            <div
              v-if="!form.imageSrc"
              class="upload-icon"
              @click="triggerFileInput"
            >
              <i class="fa fa-camera"></i>
              <span>اختيار صورة</span>
            </div>
            <div v-if="form.imageSrc" class="avatar-preview">
              <img :src="form.imageSrc" alt="Avatar Preview" />
              <i class="fa fa-times delete-icon" @click="removeImage"></i>
            </div>
            <!-- <span class="error-feedback" v-if="v$.form.imageSrc.$error"
              >{{ v$.form.imageSrc.$errors[0].$message }}
            </span> -->
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
            <span class="error-feedback" v-if="v$.form.name.$error">{{
              getErrorMessage(v$.form.name)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="phone">رقم الهاتف</label>
          <div class="input">
            <input
              type="number"
              id="phone"
              placeholder="أدخل رقم الهاتف"
              v-model="form.phone"
              class="no-spinner"
            />
            <span class="error-feedback" v-if="v$.form.phone.$error">{{
              getErrorMessage(v$.form.phone)
            }}</span>
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
            <span class="error-feedback" v-if="v$.form.email.$error">{{
              getErrorMessage(v$.form.email)
            }}</span>
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
            <span class="error-feedback" v-if="v$.form.password.$error">{{
              getErrorMessage(v$.form.password)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="roles">الصلاحيات</label>
          <multiselect
            id="roles"
            v-model="form.role"
            :options="permissionOptions"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>

          <span class="error-feedback" v-if="v$.form.role.$error">{{
            getErrorMessage(v$.form.role)
          }}</span>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save" @click="save()">حفظ</button>
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
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import Swal from "sweetalert2";

export default {
  name: "EmployeesAdd",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      rolesOptions: ["Admin", "Manager", "Employee"],

      v$: useVuelidate(),
      form: {
        name: "",
        phone: "",
        email: "",
        password: "",
        role: [],
        image: null, // Ensure `image` is initialized as null
        imageSrc: "",
      },
      permissionOptions: ["list", "of", "options"],
    };
  },

  validations() {
    return {
      form: {
        // imageSrc: { required },
        name: { required },
        phone: { required },
        email: { required, email },
        password: { required },
        role: { required },
      },
    };
  },
  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    removeImage() {
      this.form.image = null;
      this.form.imageSrc = "";
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.imageSrc = e.target.result;
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
        if (
          !this.form.name ||
          !this.form.phone ||
          !this.form.email ||
          !this.form.password ||
          !this.form.role
        ) {
          Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }
        await employeesStore.addEmployee(this.form); // Call addEmployee instead of fetchEmployees
        this.$router.push("/employees");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },

    save() {
      console.log("errorrrrrr");
      this.v$.$validate();
      if (!this.v$.$error) {
        // this.submitForm();
      }
    },
  },
};
</script>
<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.avatar-preview {
  position: relative;
}

.delete-icon {
  position: absolute;
  top: 0;
  right: 0;
  background: rgb(232 240 254);
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  color: red;
  font-size: 20px;
}

.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
