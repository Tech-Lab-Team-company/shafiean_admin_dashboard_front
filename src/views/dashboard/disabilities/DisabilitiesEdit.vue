<template>
  <div class="editdisabilities">
    <HeaderPages title="تعديل اعاقه" :showButton="false" />

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
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <label for=""> وصف الاعاقه</label>
            <div class="input">
              <input
                type="text"
                placeholder="وصف الاعاقه"
                v-model="disabilitie.description"
              />
            </div>
          </div>
        </div>
        <div class="all-btn">
          <button type="submit" class="save">تعديل</button>
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

export default {
  name: "edit-disabilities",
  components: {
    HeaderPages,
  },
  data() {
    return {
      disabilitie: {
        title: "",
        description: "",
        image: null,
        imageSrc: "",
      },
    };
  },
  methods: {
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
      this.$router.go(-1);
    },
  },
  async mounted() {
    await this.fetchData(); // Fetch data when the component is mounted
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
</style>
