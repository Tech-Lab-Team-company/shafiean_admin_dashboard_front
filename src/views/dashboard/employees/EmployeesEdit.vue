<template>
  <div class="employees-edit">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <HeaderPages title="تعديل موظف" :showButton="false" />
    </div>
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
              <i class="fa fa-times delete-icon" @click="removeImage"></i>
            </div>
            <!-- <span class="error-feedback" v-if="v$.employee.imageSrc.$error"
              >{{ v$.employee.imageSrc.$errors[0].$message }}
            </span> -->
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for=""> أسم الموظف</label>
          <div class="input">
            <input
              v-model="employee.name"
              type="text"
              placeholder="أدخل أسم الموظف"
              @keypress="onlyAllowLetters"
            />
            <span class="error-feedback" v-if="v$.employee.name.$error">{{
              getErrorMessage(v$.employee.name)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for=""> رقم الهاتف</label>
          <div class="input">
            <input
              v-model="employee.phone"
              type="tel"
              placeholder="أدخل رقم الهاتف"
              class="no-spinner"
              @keypress="onlyAllowNumbers"
            />
            <span class="error-feedback" v-if="v$.employee.phone.$error">{{
              getErrorMessage(v$.employee.phone)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for=""> البريد الالكتروني</label>
          <div class="input">
            <input
              v-model="employee.email"
              type="email"
              placeholder="أدخل البريد الالكتروني"
              @keypress="validateEmail"
            />
            <span class="error-feedback" v-if="v$.employee.email.$error">{{
              getErrorMessage(v$.employee.email)
            }}</span>
          </div>
        </div>

        <!--        <div class="col-lg-6 col-md-6 col-sm-12">-->
        <!--          <label for="">الصلاحيات</label>-->
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
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Swal from "sweetalert2";

export default {
  name: "EmployeesEdit",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      v$: useVuelidate(),
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
  validations() {
    return {
      employee: {
        name: { required },
        phone: { required },
        email: { required, email },
        permissions: { required },
        // imageSrc: { required },
      },
    };
  },
  methods: {
    onlyAllowLetters(event) {
      const char = String.fromCharCode(event.keyCode);
      const regex = /^[\u0621-\u064A\u0660-\u0669a-zA-Z\s]+$/; // يسمح بالحروف العربية والإنجليزية والمسافات
      if (!regex.test(char)) {
        event.preventDefault();
        Swal.fire("خطأ", "لا يُسمح بإدخال الأرقام في هذا الحقل", "error");
      }
    },
    onlyAllowNumbers(event) {
      const char = String.fromCharCode(event.keyCode);
      const regex = /^[0-9]+$/; // يسمح فقط بالأرقام
      if (!regex.test(char)) {
        event.preventDefault();
        Swal.fire("خطأ", "لا يُسمح إلا بإدخال الأرقام في هذا الحقل", "error");
      }
    },
    validateForm() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // التحقق من صحة البريد الإلكتروني
      if (!this.form.email || !emailPattern.test(this.form.email)) {
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "البريد الالكتروني غير صالح",
        });
        return false;
      }

      return true; // إذا كان البريد الإلكتروني صحيحًا
    },

    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    removeImage() {
      this.employee.image = null;
      this.employee.imageSrc = "";
    },
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
.upload-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed rgba(0, 0, 0, 0.123);
  padding: 0.5rem;
  border-radius: 33px;
  margin-top: unset !important;
}
.avatar-preview {
  position: relative;
}
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
