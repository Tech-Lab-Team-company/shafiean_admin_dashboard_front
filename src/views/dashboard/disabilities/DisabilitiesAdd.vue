<template>
  <div class="disabilities-add">
    <HeaderPages title="اضافة اعاقه" :showButton="false" />
    <form action="" @submit.prevent="submitForm">
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
            </div>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> اسم الاعاقه</label>
          <div class="input">
            <input
              type="text"
              placeholder="أدخل أسم الاعاقه"
              v-model="form.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> وصف الاعاقه</label>
          <div class="input">
            <input
              v-model="form.description"
              type="text"
              placeholder="وصف الاعاقه"
            />
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
import { useDisabilitieAddStore } from "@/stores/disabilities/disabilitieAddStore";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "DisabilitiesAdd",
  components: {
    HeaderPages,
  },
  data() {
    return {
      rolesOptions: ["Admin", "Manager", "Employee"],
      form: {
        title: "",
        description: "",
        image: null,
        imageSrc: "",
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
        const disabilitieStore = useDisabilitieAddStore();
        if (!disabilitieStore) {
          throw new Error("Failed to load disabilities store");
        }
        await disabilitieStore.addDisabilities(this.form);
        this.$router.push("/disabilities");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
      console.log(this.form);
    },
  },
};
</script>
<style scoped></style>
