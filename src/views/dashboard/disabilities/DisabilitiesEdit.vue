<template>
  <div class="editdisabilities">
    <HeaderPages title="تعديل اعاقه" :showButton="false" />

    <div class="editinputs">
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
        <div class="row mt-5">
          <div class="col-lg-6">
            <label for=""> اسم الاعاقه</label>
            <div>
              <input type="text" placeholder="أدخل اسم الاعاقه" />
            </div>
          </div>
          <div class="col-lg-6">
            <label for=""> وصف الاعاقه</label>
            <div>
              <input type="text" placeholder="وصف الاعاقه" />
            </div>
          </div>
        </div>
      </div>
      <button>حفظ</button>
      <button @click="$router.go(-1)">رجوع</button>
    </div>
  </div>
</template>
<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
export default {
  name: "edit-disabilities",

  components: {
    HeaderPages,
  },

  data() {
    return {
      imageSrc: null,
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
