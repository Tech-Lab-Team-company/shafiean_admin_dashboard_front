<template>
  <div class="admininfo-add">
    <header-pages
      title="معلومات المسؤل"
      :showButton="false"
      link="/add-admins"
    />

    <form action="">
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
              v-if="!admin.imageSrc"
              class="upload-icon"
              @click="triggerFileInput"
            >
              <img :src="admin.imageSrc" alt="" />
              <i class="fa fa-camera delete-icon" @click="removeImage"></i>
              <span>اختيار صورة</span>
            </div>

            <div v-if="imageSrc" class="avatar-preview">
              <img :src="imageSrc" alt="Avatar Preview" />
            </div>

            <span class="error-feedback" v-if="v$.admin.imageSrc.$error">{{
              v$.admin.imageSrc.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">أسم المسؤل</label>
          <div class="input">
            <input type="text" placeholder="أسم المسؤل" v-model="admin.name" />
            <span class="error-feedback" v-if="v$.admin.name.$error">{{
              v$.admin.name.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">رقم الهاتف </label>
          <div class="input">
            <input
              type="text"
              placeholder="رقم الهاتف "
              v-model="admin.phone"
            />
            <span class="error-feedback" v-if="v$.admin.phone.$error">{{
              v$.admin.phone.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">البريد الالكتروني </label>
          <div class="input">
            <input
              type="text"
              placeholder=" البريد الالكتروني "
              v-model="admin.email"
            />
            <span class="error-feedback" v-if="v$.admin.email.$error">{{
              v$.admin.email.$errors[0].$message
            }}</span>
          </div>
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: { HeaderPages },
  data() {
    return {
      v$: useVuelidate(),
      admin: {
        name: "",
        phone: "",
        email: "",
        image: "",
        imageSrc: null,
      },
    };
  },
  validations() {
    return {
      admin: {
        imageSrc: { required },
        name: {
          required: {
            $validator: required,
            $message: "الاسم مطلوب",
          },
        },
        phone: { required },
        email: { required },
      },
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("errorrrrrr save");
      }
    },
  },
};
</script>
