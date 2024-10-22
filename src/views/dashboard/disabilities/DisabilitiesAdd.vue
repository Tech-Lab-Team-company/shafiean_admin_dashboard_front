<template>
  <div class="disabilities-add">
    <HeaderPages title="اضافة اعاقه" :showButton="false" />
    <form action="" @submit.prevent="submitForm">
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
            <div v-if="form.image || form.imageSrc" class="avatar-preview">
              <img
                :src="form.imageSrc ? form.imageSrc : form.image"
                alt="Avatar Preview"
              />
              <i class="fa fa-times delete-icon" @click="removeImage"></i>
            </div>
            <span class="error-feedback" v-if="v$.form.imageSrc.$error"
              >{{ getErrorMessage(v$.form.imageSrc) }}
            </span>
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
            <span class="error-feedback" v-if="v$.form.title.$error">{{
              getErrorMessage(v$.form.title)
            }}</span>
          </div>
        </div>

        <div class="col-lg-12 col-md-6 col-12 mt-3">
          <label for="description">وصف المرحلة</label>
          <div class="input">
            <textarea
              id="description"
              name="w3review"
              rows="4"
              placeholder="وصف الاعاقه"
              v-model="form.description"
              required
            >
            </textarea>
            <span class="error-feedback" v-if="v$.form.description.$error">{{
              getErrorMessage(v$.form.description)
            }}</span>
          </div>
        </div>

        <!-- <div class="col-lg-6 col-md-6 col-12">
          <label for=""> وصف الاعاقه</label>
          <div class="input">
            <input
              v-model="form.description"
              type="text"
              placeholder="وصف الاعاقه"
            />
            <span class="error-feedback" v-if="v$.form.description.$error">{{
              getErrorMessage(v$.form.description)
            }}</span>
          </div>
        </div> -->
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
import { useDisabilitieAddStore } from "@/stores/disabilities/disabilitieAddStore";
import "vue-multiselect/dist/vue-multiselect.css";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Swal from "sweetalert2";

export default {
  name: "DisabilitiesAdd",
  components: {
    HeaderPages,
  },
  data() {
    return {
      v$: useVuelidate(),
      rolesOptions: ["Admin", "Manager", "Employee"],
      form: {
        title: "",
        description: "",
        image: null,
        imageSrc: "",
      },
    };
  },
  validations() {
    return {
      form: {
        imageSrc: { required },
        title: { required },
        description: { required },
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
        const disabilitieStore = useDisabilitieAddStore();
        if (!disabilitieStore) {
          throw new Error("Failed to load disabilities store");
        }
        if (!this.form.imageSrc || !this.form.title || !this.form.description) {
          Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await disabilitieStore.addDisabilities(this.form);
        this.$router.push("/disabilities");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
      console.log(this.form);
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
textarea {
  border: 1px solid #06797e;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
