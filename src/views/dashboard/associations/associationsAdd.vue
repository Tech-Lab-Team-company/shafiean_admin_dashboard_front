<template>
  <div class="associations-add">
    <header-pages title="اضافة جمعية" :showButton="false" />
    <form action="">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="avatar-uploader">
            <label for="avatar">صوره</label>
            <!-- Hidden File Input -->
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
          <label for="name">أسم الجمعية</label>
          <div class="input">
            <input type="text" placeholder="أسم الجمعية" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">رقم الترخيص</label>
          <div class="input">
            <input type="text" placeholder="رقم الترخيص " />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">رقم التليفون</label>
          <div class="input">
            <input type="text" placeholder="رقم التليفون " />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name"> البريد الالكتروني</label>
          <div class="input">
            <input type="text" placeholder=" البريد الالكتروني " />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">العنوان</label>
          <div class="input">
            <input type="text" placeholder="العنوان " />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="roles">دوله</label>
          <multiselect
            id="roles"
            v-model="form.role"
            :options="rolesOptions"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="roles">مدينه</label>
          <multiselect
            id="roles"
            v-model="form.role"
            :options="rolesOptions"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="roles">الاعاقات</label>
          <multiselect
            id="roles"
            v-model="form.role"
            :options="rolesOptions"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">link</label>
          <div class="input">
            <input type="link" placeholder="link " />
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
import Multiselect from "vue-multiselect";
export default {
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      rolesOptions: ["Egypt", "Kewit", "Employee"],
      imageSrc: null,
      form: {
        role: [],
      },
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.imageSrc = URL.createObjectURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>
