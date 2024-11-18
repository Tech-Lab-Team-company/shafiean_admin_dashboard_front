<template>
  <div class="editdisabilities">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <HeaderPages title="تعديل اعاقه" :showButton="false" />
    </div>

    <div class="disabilities-edit">
      <form action="" @submit.prevent="updateDisabilitie">
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
                v-if="disabilitie.image || disabilitie.imageSrc"
                class="avatar-preview"
              >
                <img
                  :src="
                    disabilitie.imageSrc
                      ? disabilitie.imageSrc
                      : disabilitie.image
                  "
                  alt="Avatar Preview"
                />
                <i class="fa fa-times delete-icon" @click="removeImage"></i>
              </div>
              <span class="error-feedback" v-if="v$.disabilitie.imageSrc.$error"
                >{{ getErrorMessage(v$.disabilitie.imageSrc) }}
              </span>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <label for=""> اسم الاعاقه</label>
            <div class="input">
              <input
                type="text"
                placeholder="أدخل اسم الاعاقه"
                v-model="disabilitie.title"
              />
              <span class="error-feedback" v-if="v$.disabilitie.title.$error">{{
                getErrorMessage(v$.disabilitie.title)
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
                v-model="disabilitie.description"
                required
              >
              </textarea>
              <span
                class="error-feedback"
                v-if="v$.disabilitie.description.$error"
                >{{ getErrorMessage(v$.disabilitie.description) }}</span
              >
            </div>
          </div>
        </div>
        <div class="all-btn">
          <button type="submit" class="save" @click="edit()">تعديل</button>
          <button type="button" class="bake" @click="$router.go(-1)">
            رجوع
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useDisabilitieEditStore } from "@/stores/disabilities/disabilitieEditStore";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Swal from "sweetalert2";
export default {
  name: "edit-disabilities",
  components: {
    HeaderPages,
  },
  data() {
    return {
      v$: useVuelidate(),
      disabilitie: {
        title: "",
        description: "",
        image: null,
        imageSrc: "",
      },
    };
  },
  validations() {
    return {
      disabilitie: {
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
      this.disabilitie.image = null;
      this.disabilitie.imageSrc = "";
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.disabilitie.image = file; // Store the file object
        const reader = new FileReader();
        reader.onload = (e) => {
          this.disabilitie.imageSrc = e.target.result; // For preview
        };
        reader.readAsDataURL(file);
      }
    },
    async fetchData() {
      const store = useDisabilitieEditStore();
      const id = this.$route.params.id;
      await store.fetchDisabilitie(id);
      this.disabilitie = store.disabilitie;
    },

    async updateDisabilitie() {
      const store = useDisabilitieEditStore();
      const id = this.$route.params.id;
      await store.updateDisabilitie(id, {
        title: this.disabilitie.title,
        description: this.disabilitie.description,
        image: this.disabilitie.image, // Pass the file object
      });
      if (
        !this.disabilitie.title ||
        !this.disabilitie.description ||
        !this.disabilitie.imageSrc
      ) {
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      }
      this.$router.go(-1);
    },
    edit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("errorrrrrr edit");
      }
    },
  },
  async mounted() {
    await this.fetchData();
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
</style>
