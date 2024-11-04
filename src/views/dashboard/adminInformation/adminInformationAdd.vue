<template>
  <div class="add-countries">
    <header-pages
      :showButton="false"
      link="/add-admins"
      title="معلومات المسؤل"
    />

    <form @submit.prevent="save()">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="avatar-uploader">
            <label for="avatar">صوره</label>
            <input
              id="avatar"
              ref="fileInput"
              accept="image/*"
              style="display: none"
              type="file"
              @change="handleFileChange"
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

            <div v-if="admin.imageSrc" class="avatar-preview">
              <img :src="admin.imageSrc" alt="Avatar Preview" />
            </div>

            <span v-if="v$.admin.imageSrc.$error" class="error-feedback">{{
              v$.admin.imageSrc.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">أسم المسؤل</label>
          <div class="input">
            <input v-model="admin.name" placeholder="أسم المسؤل" type="text" />
            <span v-if="v$.admin.name.$error" class="error-feedback">{{
              v$.admin.name.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">رقم الهاتف </label>
          <div class="input">
            <input
              v-model="admin.phone"
              placeholder="رقم الهاتف "
              type="text"
            />
            <span v-if="v$.admin.phone.$error" class="error-feedback">{{
              v$.admin.phone.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">البريد الالكتروني </label>
          <div class="input">
            <input
              v-model="admin.email"
              placeholder=" البريد الالكتروني "
              type="text"
            />
            <span v-if="v$.admin.email.$error" class="error-feedback">{{
              v$.admin.email.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="all-btn">
        <button class="save" type="submit">حفظ</button>
        <button class="bake" type="button" @click="$router.go(-1)">رجوع</button>
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
        name: { required },
        phone: { required },
        email: { required },
      },
    };
  },
  methods: {
    async handleFileChange(event) {
      const file = await event.target.files[0];
      if (file) {
        this.admin.image = file;
      }
      const reader = new FileReader();

      reader.onload = () => {
        this.admin.imageSrc = reader.result;
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
