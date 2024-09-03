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
          <label for=""> اسم الاعاقه</label>
          <div class="input">
            <input type="text" placeholder="أدخل أسم الاعاقه" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> وصف الاعاقه</label>
          <div class="input">
            <input
              v-model="form.discraption"
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
import { useDisabilitieStore } from "@/stores/disabilities/disabilitieStore";
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
        tittle: "",
        discraption: "",
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
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async submitForm() {
      try {
        const disabilitieStore = useDisabilitieStore();
        if (!disabilitieStore) {
          throw new Error("Failed to load disabilities store");
        }
        await disabilitieStore.addDisability(this.form);
        this.$router.push("/disabilities");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
  },
};
</script>
<style scoped></style>
