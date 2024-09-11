<template>
  <div class="associations-edit">
    <header-pages title="تعديل جمعية" :showButton="false" />
    <form @submit.prevent="submitForm">
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
              v-if="organizations.image || organizations.imageSrc"
              class="avatar-preview"
            >
              <img
                :src="
                  organizations.imageSrc
                    ? organizations.imageSrc
                    : organizations.image
                "
                alt="Avatar Preview"
              />
            </div>
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
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="license">رقم الترخيص</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم الترخيص "
              v-model="organizations.licence_number"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="phone">رقم التليفون</label>
          <div class="input">
            <input
              type="tel"
              placeholder="رقم التليفون "
              v-model="organizations.phone"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="email"> البريد الالكتروني</label>
          <div class="input">
            <input
              type="email"
              placeholder=" البريد الالكتروني "
              v-model="organizations.email"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="address">العنوان</label>
          <div class="input">
            <input
              type="text"
              placeholder="العنوان "
              v-model="organizations.address"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="address">أسم المدير</label>
          <div class="input">
            <input
              type="text"
              placeholder="أسم المدير "
              v-model="organizations.manager_name"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="address">رقم المدير</label>
          <div class="input">
            <input
              type="tel"
              placeholder="رقم المدير "
              v-model="organizations.manager_phone"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="address">البريد الألكتروني المدير</label>
          <div class="input">
            <input
              type="email"
              placeholder="البريد الألكتروني المدير "
              v-model="organizations.manager_email"
            />
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
        <button type="submit" class="save">تعديل</button>
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

export default {
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
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
        disabilitey_id: null,
        website_link: "",
      },
      CountryOptions: [],
      cityOptions: [],
      disabilitiesOptions: [],
      city_values: {},
      Country_values: {},
      disabilities_values: {},
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
      this.organizations.disabilitey_id = this.disabilities_values
        .filter((dis) => dis && dis.id)
        .map((dis) => dis.id);
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

      this.Country_values = this.CountryOptions.find(
        (country) => country.id === this.organizations.country_id
      );
      this.city_values = this.cityOptions.find(
        (city) => city.id === this.organizations.city_id
      );

      if (Array.isArray(this.organizations.disabilitey_id)) {
        this.disabilities_values = this.disabilitiesOptions.filter(
          (disability) =>
            this.organizations.disabilitey_id.includes(disability.id)
        );
      } else {
        this.disabilities_values = [];
      }
    },
    async submitForm() {
      const store = useOrganizationEditStore();
      const id = this.$route.params.id;

      this.organizations.country_id = this.Country_values.id;
      this.organizations.city_id = this.city_values.id;
      this.organizations.disabilitey_id = this.disabilities_values.map(
        (dis) => dis.id
      );

      await store.updateOrganization(id, this.organizations);
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
