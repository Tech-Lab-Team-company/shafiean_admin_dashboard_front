<template>
  <div class="associations-add">
    <div class="plus">
      <i class="fa-solid fa-plus"></i>
      <header-pages title="اضافة جمعية" :showButton="false" />
    </div>
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
            <!-- <span class="error-feedback" v-if="v$.form.imageSrc.$error">{{
              getErrorMessage(v$.form.imageSrc)
            }}</span> -->
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">أسم الجمعية</label>
          <div class="input">
            <input type="text" placeholder="أسم الجمعية" v-model="form.name" />
            <span class="error-feedback" v-if="v$.form.name.$error">{{
              getErrorMessage(v$.form.name)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="license">رقم الترخيص</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم الترخيص"
              v-model="form.licence_number"
              class="no-spinner"
            />
            <span class="error-feedback" v-if="v$.form.licence_number.$error">{{
              getErrorMessage(v$.form.licence_number)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="phone">رقم التليفون</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم التليفون"
              v-model="form.phone"
            />
            <span class="error-feedback" v-if="v$.form.phone.$error">{{
              getErrorMessage(v$.form.phone)
            }}</span>
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
            <span class="error-feedback" v-if="v$.form.email.$error">{{
              getErrorMessage(v$.form.email)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="address">العنوان</label>
          <div class="input">
            <input type="text" placeholder="العنوان" v-model="form.address" />
            <span class="error-feedback" v-if="v$.form.address.$error">{{
              getErrorMessage(v$.form.address)
            }}</span>
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
            <span class="error-feedback" v-if="v$.form.manager_name.$error">{{
              getErrorMessage(v$.form.manager_name)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager_phone">رقم هاتف المدير</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم المدير"
              v-model="form.manager_phone"
            />
            <span class="error-feedback" v-if="v$.form.manager_phone.$error">{{
              getErrorMessage(v$.form.manager_phone)
            }}</span>
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
            <span class="error-feedback" v-if="v$.form.manager_email.$error">{{
              getErrorMessage(v$.form.manager_email)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="country">دوله</label>
          <multiselect
            :select-by="false"
            id="country"
            v-model="Country_values"
            :options="CountryOptions"
            track-by="id"
            label="title"
            select-label=""
            deselect-label=""
            :clear-on-select="true"
            placeholder="أختر الدوله"
            :close-on-select="true"
            @update:model-value="updateCountryValue"
          />
          <span class="error-feedback" v-if="v$.form.country_id.$error">{{
            getErrorMessage(v$.form.country_id)
          }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="city">مدينه</label>
          <multiselect
            :select-by="false"
            id="city"
            v-model="city_values"
            :options="cityOptions"
            deselect-label=""
            track-by="id"
            label="title"
            placeholder="أختر مدينه"
            select-label=""
            :close-on-select="true"
            @update:model-value="updateCityValue"
          />
          <span class="error-feedback" v-if="v$.form.city_id.$error">{{
            getErrorMessage(v$.form.city_id)
          }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="disabilities">الاعاقات</label>
          <multiselect
            id="disabilities"
            v-model="disabilities_values"
            :options="disabilitiesOptions"
            track-by="id"
            deselect-label=""
            label="title"
            placeholder="أختر الاعاقات"
            :multiple="true"
            :clear-on-select="true"
            select-label=""
            :close-on-select="false"
            @update:model-value="updateDisabilitiesValue"
          />
          <span class="error-feedback" v-if="v$.form.disability_ids.$error">{{
            getErrorMessage(v$.form.disability_ids)
          }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="link">Link</label>
          <div class="input">
            <input type="url" placeholder="Link" v-model="form.website_link" />
            <span class="error-feedback" v-if="v$.form.website_link.$error">{{
              getErrorMessage(v$.form.website_link)
            }}</span>
          </div>
        </div>
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useOrganizationAddStore } from "@/stores/organizations/organizationAddStore";
import { mapState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
// import Swal from "sweetalert2";

export default {
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      v$: useVuelidate(),
      CountryOptions: [],
      cityOptions: [],
      disabilitiesOptions: [],
      form: {
        // imageSrc: null,
        // image: null,
        name: "",
        licence_number: "",
        phone: "",
        email: "",
        address: "",
        manager_name: "",
        manager_phone: "",
        manager_email: "",
        country_id: "",
        city_id: "",
        disability_ids: [],
        website_link: "",
      },
      city_values: {},
      Country_values: {},
      disabilities_values: {},
    };
  },
  validations() {
    return {
      form: {
        // imageSrc: { required },
        name: { required },
        licence_number: { required },
        phone: { required },
        email: { required },
        address: { required },
        manager_name: { required },
        manager_phone: { required },
        manager_email: { required, email },
        country_id: { required },
        city_id: { required },
        disability_ids: { required },
        website_link: { required },
      },
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
    updateCityValue() {
      this.form.city_id = this.city_values ? this.city_values.id : null;
    },
    async updateCountryValue() {
      this.form.country_id = this.Country_values
        ? this.Country_values.id
        : null;

      if (this.form.country_id) {
        const organizationsStore = useOrganizationAddStore();
        await organizationsStore.getcities(this.form.country_id);
        this.cityOptions = organizationsStore.cities.map((city) => ({
          id: city.id,
          title: city.title,
        }));
        this.city_values = null;
      } else {
        this.cityOptions = [];
        this.city_values = null;
      }
    },
    updateDisabilitiesValue() {
      if (Array.isArray(this.disabilities_values)) {
        this.form.disability_ids = this.disabilities_values
          .map((dis) => dis.id)
          .filter((id) => id !== undefined && id !== null);
      } else {
        this.form.disability_ids = [];
      }
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
        if (
      
          !this.form.name ||
          !this.form.licence_number ||
          !this.form.phone ||
          !this.form.email ||
          !this.form.address ||
          !this.form.manager_name ||
          !this.form.manager_phone ||
          !this.form.manager_email ||
          !this.form.country_id ||
          !this.form.city_id ||
          !this.form.website_link
        ) {
        }

        // Ensure disability_ids is always an array and filter out undefined values
        if (!Array.isArray(this.form.disability_ids)) {
          this.form.disability_ids = [];
        } else {
          this.form.disability_ids = this.form.disability_ids.filter(
            (id) => id !== undefined && id !== null
          );
        }

        await organizationsStore.addOrganization(this.form);
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

        // جلب الدول
        await organizationsStore.getCountries();
        this.CountryOptions = organizationsStore.countries.map((country) => ({
          id: country.id,
          title: country.title, // اسم الدولة
        }));

        // جلب المدن
        await organizationsStore.getcities();
        this.cityOptions = organizationsStore.cities.map((city) => ({
          id: city.id,
          title: city.title, // اسم المدينة
        }));

        // جلب الإعاقات
        await organizationsStore.getDisabilities();
        this.disabilitiesOptions = organizationsStore.disabilities.map(
          (disability) => ({
            id: disability.id,
            title: disability.title, // اسم الإعاقة
          })
        );
        this.disabilities_values = []; // إعادة التعيين
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    },
    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("no error");
      }
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
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
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
