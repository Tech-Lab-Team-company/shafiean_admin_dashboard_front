<template>
  <div class="associations-edit">
    <header-pages title="تعديل جمعية" :showButton="false" />
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
              v-if="!organizations.imageSrc"
              class="upload-icon"
              @click="triggerFileInput"
            >
              <i class="fa fa-camera"></i>
              <span>اختيار صورة</span>
            </div>

            <div v-if="organizations.imageSrc" class="avatar-preview">
              <img :src="organizations.imageSrc" alt="Avatar Preview" />
              <i class="fa fa-times delete-icon" @click="removeImage"></i>
            </div>
            <span
              class="error-feedback"
              v-if="v$.organizations.imageSrc.$error"
              >{{ getErrorMessage(v$.organizations.imageSrc) }}</span
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">أسم الجمعية</label>
          <div class="input">
            <input
              type="text"
              placeholder="أسم الجمعية"
              v-model="organizations.name"
            />
            <span class="error-feedback" v-if="v$.organizations.name.$error">{{
              getErrorMessage(v$.organizations.name)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="license">رقم الترخيص</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم الترخيص"
              v-model="organizations.licence_number"
            />
            <span
              class="error-feedback"
              v-if="v$.organizations.licence_number.$error"
              >{{ getErrorMessage(v$.organizations.licence_number) }}</span
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="phone">رقم التليفون</label>
          <div class="input">
            <input
              type="tel"
              placeholder="رقم التليفون"
              v-model="organizations.phone"
            />
            <span class="error-feedback" v-if="v$.organizations.phone.$error">{{
              getErrorMessage(v$.organizations.phone)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="email">البريد الالكتروني</label>
          <div class="input">
            <input
              type="email"
              placeholder="البريد الالكتروني"
              v-model="organizations.email"
            />
            <span class="error-feedback" v-if="v$.organizations.email.$error">{{
              getErrorMessage(v$.organizations.email)
            }}</span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="address">العنوان</label>
          <div class="input">
            <input
              type="text"
              placeholder="العنوان"
              v-model="organizations.address"
            />
            <span
              class="error-feedback"
              v-if="v$.organizations.address.$error"
              >{{ getErrorMessage(v$.organizations.address) }}</span
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager_name">اسم المدير</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المدير"
              v-model="organizations.manager_name"
            />
            <span
              class="error-feedback"
              v-if="v$.organizations.manager_name.$error"
              >{{ getErrorMessage(v$.organizations.manager_name) }}</span
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager_phone">رقم المدير</label>
          <div class="input">
            <input
              type="tel"
              placeholder="رقم المدير"
              v-model="organizations.manager_phone"
            />
            <span
              class="error-feedback"
              v-if="v$.organizations.manager_phone.$error"
              >{{ getErrorMessage(v$.organizations.manager_phone) }}</span
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager_email">بريد الالكتروني المدير</label>
          <div class="input">
            <input
              type="email"
              placeholder="بريد الالكتروني المدير"
              v-model="organizations.manager_email"
            />
            <span
              class="error-feedback"
              v-if="v$.organizations.manager_email.$error"
              >{{ getErrorMessage(v$.organizations.manager_email) }}</span
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Country">دوله</label>
          <multiselect
            id="Country"
            v-model="Country_values"
            :options="CountryOptions"
            track-by="id"
            label="title"
            :close-on-select="true"
            @update:model-value="updatecountryValue"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="city">مدينه</label>
          <multiselect
            id="city"
            v-model="city_values"
            track-by="id"
            label="title"
            :options="cityOptions"
            :close-on-select="true"
            @update:model-value="updateModelValue"
          ></multiselect>
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
            @update:model-value="updatedisabilitiesValue"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="link">link</label>
          <div class="input">
            <input
              type="link"
              placeholder="link "
              v-model="organizations.website_link"
            />
          </div>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save" @click="Edit()">تعديل</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useOrganizationEditStore } from "@/stores/organizations/oreganizationEdit";
import { mapState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      v$: useVuelidate(),
      organizations: {
        name: "",
        licence_number: "",
        phone: "",
        email: "",
        address: "",
        manager_name: "",
        manager_phone: "",
        manager_email: "",
        image: null,
        imageSrc: "",
        country_id: null,
        city_id: null,
        disability_ids: null,
        website_link: "",
      },
      CountryOptions: [],
      cityOptions: [],
      disabilitiesOptions: [],
      city_values: {},
      Country_values: {},
      disabilities_values: [],
    };
  },
  validations() {
    return {
      organizations: {
        imageSrc: { required },
        name: { required },
        licence_number: { required },
        phone: { required },
        email: { required },
        address: { required },
        manager_name: { required },
        manager_phone: { required },
        manager_email: { required, email },
      },
    };
  },
  computed: {
    ...mapState(useOrganizationEditStore, {
      organizations: (state) => state.organizations,
      ...mapState(useOrganizationEditStore, {
        cities: (state) => state.cities,
        ...mapState(useOrganizationEditStore, {
          countries: (state) => state.countries,
          ...mapState(useOrganizationEditStore, {
            disabilities: (state) => state.disabilities,
          }),
        }),
      }),
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
      this.organizations.image = null;
      this.organizations.imageSrc = "";
    },
    updateModelValue() {
      this.organizations.city_id = this.city_values
        ? this.city_values.id
        : null;
    },
    updatecountryValue() {
      this.organizations.country_id = this.Country_values
        ? this.Country_values.id
        : null;
    },
    updatedisabilitiesValue() {
      console.log("disabilities_values", this.disabilities_values);
      console.log("organizations", this.organizations);

      if (Array.isArray(this.disabilities_values)) {
        this.organizations.disability_ids = this.disabilities_values.map(
          (dis) => dis.id
        );
      } else {
        this.organizations.disability_ids = "";
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.organizations.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.organizations.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async fetchData() {
      const store = useOrganizationEditStore();
      const id = this.$route.params.id;
      await store.fetchOrganizations(id);

      this.organizations = store.organizations;

      await store.getCountries();
      await store.getcities();
      await store.getDisabilities();

      this.CountryOptions = store.countries;
      this.cityOptions = store.cities;
      this.disabilitiesOptions = store.disabilities;
      console.log(this.disabilities, "org");

      this.Country_values = this.CountryOptions.find(
        (country) => country.id === this.organizations.country_id
      );
      this.city_values = this.cityOptions.find(
        (city) => city.id === this.organizations.city_id
      );

      this.disabilities_values = this.organizations.disabilities.map((dis) => ({
        id: dis.id,
        title: dis.title,
      }));
    },
    async submitForm() {
      const store = useOrganizationEditStore();
      const id = this.$route.params.id;
      if (!store) {
        throw new Error("Failed to load organizations store");
      }
      if (
        !this.organizations.name ||
        !this.organizations.licence_number ||
        !this.organizations.phone ||
        !this.organizations.email ||
        !this.organizations.address ||
        !this.organizations.manager_name ||
        !this.organizations.manager_phone ||
        !this.organizations.manager_email
      ) {
        return;
      }

      this.organizations.country_id = this.Country_values.id;
      this.organizations.city_id = this.city_values.id;
      this.organizations.disability_ids = this.disabilities_values.map(
        (dis) => dis.id
      );
      this.disabilities.map((dis) => {
        dis.title;
      });

      await store.updateOrganization(id, this.organizations);
      this.$router.go(-1);
    },
    Edit() {
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
</style>
