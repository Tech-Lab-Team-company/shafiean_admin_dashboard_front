<template>
  <div class="admininfo-add">
    <header-pages
      title="معلومات المسؤل"
      :showButton="false"
      link="/Edit-admins"
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
          <label for="name">أسم المسؤل</label>
          <div class="input">
            <input type="text" placeholder="أسم المسؤل" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">رقم الهاتف </label>
          <div class="input">
            <input type="text" placeholder="رقم الهاتف " />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">البريد الالكتروني </label>
          <div class="input">
            <input type="text" placeholder=" البريد الالكتروني " />
          </div>
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
export default {
  components: { HeaderPages },
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
  },
};
</script>
