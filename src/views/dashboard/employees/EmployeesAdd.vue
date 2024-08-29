<template>
  <div class="employees-add">
    <HeaderPages title="اضافة موظف" :showButton="false" />
    <form action="" @submit.prevent>
      <div class="row">
        <div class="col-lg-6">
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
            <!-- Clickable Icon - Hidden after photo is chosen -->
            <div v-if="!imageSrc" class="upload-icon" @click="triggerFileInput">
              <i class="fa fa-camera"></i>
              <!-- FontAwesome icon -->
              <span>اختيار صورة</span>
            </div>
            <!-- Preview Image -->
            <div v-if="imageSrc" class="avatar-preview">
              <img :src="imageSrc" alt="Avatar Preview" />
            </div>
          </div>
        </div>
        <!-- Other input fields -->
        <div class="col-lg-6">
          <label for=""> أسم الموظف</label>
          <div class="input">
            <input type="text" placeholder="أدخل أسم الموظف" />
          </div>
        </div>
        <div class="col-lg-6">
          <label for=""> رقم الهاتف</label>
          <div class="input">
            <input type="phone" placeholder="أدخل رقم الهاتف" />
          </div>
        </div>
        <div class="col-lg-6">
          <label for=""> البريد الالكتروني</label>
          <div class="input">
            <input type="email" placeholder="أدخل البريد الالكتروني" />
          </div>
        </div>
        <div class="col-lg-6">
          <label for=""> الرقم السري</label>
          <div class="input">
            <input type="password" placeholder="أدخل الرقم السري" />
          </div>
        </div>
        <div class="col-lg-6">
          <label for="">الصلاحيات</label>
          <multiselect
            v-model="value"
            :options="options"
            :multiple="true"
            :close-on-select="false"
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
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "EmployeesAdd",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: ["list", "of", "options"],
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
  },
};
</script>

<style scoped></style>
