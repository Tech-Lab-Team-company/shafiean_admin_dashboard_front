<template>
  <div class="associations-add">
    <header-pages title="اضافة جمعية" :showButton="false" />
    <form @submit.prevent="submitForm">
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
              <i class="fa fa-times delete-icon" @click="removeImage"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">أسم الجمعية</label>
          <div class="input">
            <input type="text" placeholder="أسم الجمعية" v-model="form.name" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="license">رقم الترخيص</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم الترخيص"
              v-model="form.license"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="phone">رقم التليفون</label>
          <div class="input">
            <input type="tel" placeholder="رقم التليفون" v-model="form.phone" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="email">البريد الالكتروني</label>
          <div class="input">
            <input
              type="email"
              placeholder="البريد الالكتروني"
              v-model="form.email"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="address">العنوان</label>
          <div class="input">
            <input type="text" placeholder="العنوان" v-model="form.address" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager_name">اسم المدير</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المدير"
              v-model="form.manager_name"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager_phone">رقم المدير</label>
          <div class="input">
            <input
              type="tel"
              placeholder="رقم المدير"
              v-model="form.manager_phone"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager_email">بريد الالكتروني المدير</label>
          <div class="input">
            <input
              type="email"
              placeholder="بريد الالكتروني المدير"
              v-model="form.manager_email"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="country">دوله</label>
          <multiselect
            id="country"
            v-model="Country_values"
            :options="CountryOptions"
            track-by="id"
            label="title"
            :close-on-select="true"
            @update:model-value="updateCountryValue"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="city">مدينه</label>
          <multiselect
            id="city"
            v-model="city_values"
            :options="cityOptions"
            track-by="id"
            label="title"
            :close-on-select="true"
            @update:model-value="updateCityValue"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="disabilities">الاعاقات</label>
          <multiselect
            id="disabilities"
            v-model="disabilities_values"
            :options="disabilitiesOptions"
            track-by="id"
            label="title"
            :multiple="true"
            :close-on-select="false"
            @update:model-value="updateDisabilitiesValue"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="link">Link</label>
          <div class="input">
            <input type="url" placeholder="Link" v-model="form.link" />
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
import "vue-multiselect/dist/vue-multiselect.css";
import { useOrganizationAddStore } from "@/stores/organizations/organizationAddStore";
import { mapState } from "pinia";

export default {
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      CountryOptions: [],
      cityOptions: [],
      disabilitiesOptions: [],
      form: {
        imageSrc: null,
        image: null,
        name: "",
        license: "",
        phone: "",
        email: "",
        address: "",
        manager_name: "",
        manager_phone: "",
        manager_email: "",
        country_id: "",
        city_id: "",
        disability_ids: [],
        link: "",
      },
      city_values: {},
      Country_values: {},
      disabilities_values: {},
    };
  },
  computed: {
    ...mapState(useOrganizationAddStore, {
      cities: (state) => state.cities,
      countries: (state) => state.countries,
      disabilities: (state) => state.disabilities,
    }),
  },
  methods: {
    removeImage() {
      this.form.image = null;
      this.form.imageSrc = "";
    },
    updateCityValue() {
      this.form.city_id = this.city_values ? this.city_values.id : null;
    },
    updateCountryValue() {
      this.form.country_id = this.Country_values
        ? this.Country_values.id
        : null;
    },
    updateDisabilitiesValue() {
      this.form.disability_ids = this.disabilities_values.map(
        (dis) => dis.id && dis.id
      );
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
        const organizationsStore = useOrganizationAddStore();
        if (!organizationsStore) {
          throw new Error("Failed to load organizations store");
        }
        await organizationsStore.addOrganization(this.form);
        this.$router.push("/associations");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
    async fetchData() {
      try {
        const organizationsStore = useOrganizationAddStore();
        if (!organizationsStore) {
          throw new Error("Failed to load organizations store");
        }
        await organizationsStore.getcities();
        this.cityOptions = this.cities;
        await organizationsStore.getCountries();
        this.CountryOptions = this.countries;
        await organizationsStore.getDisabilities();
        this.disabilitiesOptions = this.disabilities;
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
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
