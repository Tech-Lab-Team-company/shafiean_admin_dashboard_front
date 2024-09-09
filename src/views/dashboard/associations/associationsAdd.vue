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
          <label for="name">رقم الترخيص</label>
          <div class="input">
            <input
              type="number"
              placeholder="رقم الترخيص "
              v-model="form.license"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">رقم التليفون</label>
          <div class="input">
            <input
              type="tel"
              placeholder="رقم التليفون "
              v-model="form.phone"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name"> البريد الالكتروني</label>
          <div class="input">
            <input
              type="email"
              placeholder=" البريد الالكتروني "
              v-model="form.email"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="name">العنوان</label>
          <div class="input">
            <input type="text" placeholder="العنوان " v-model="form.address" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager-name">اسم المدير</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المدير "
              v-model="form.manager_name"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="manager-phone">رقم المدير</label>
          <div class="input">
            <input
              type="tel"
              placeholder="رقم المدير "
              v-model="form.manager_phone"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Country">دوله</label>
          <multiselect
            id="Country"
            v-model="form.Country"
            :options="CountryOptions"
            :multiple="true"
            :close-on-select="false"
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
            :close-on-select="false"
            @update:model-value="updateModelValue"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="disabilities">الاعاقات</label>
          <multiselect
            id="disabilities"
            v-model="form.disabilities"
            :options="disabilitiesOptions"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="link">link</label>
          <div class="input">
            <input type="link" placeholder="link " v-model="form.link" />
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
      CountryOptions: ["مصر", "عراق", "البحرين", "السعوديه", "الكويت"],
      cityOptions: [],
      disabilitiesOptions: ["صم", "بكم", "علم", "غير محدد"],
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
        Country: [],
        city_id: "",
        disabilities: [],
        link: "",
      },
      city_values: {},
    };
  },
  computed: {
    ...mapState(useOrganizationAddStore, {
      organizations: (state) => state.organizations,
      ...mapState(useOrganizationAddStore, {
        cities: (state) => state.cities,
      }),
    }),
  },
  methods: {
    updateModelValue() {
      // this.city_values.map((city) => {
      //   this.form.city_id = city.id;
      // });
      this.form.city_id = this.city_values.id;
      console.log("city_values", this.form.city_id);
      // console.log(this.form.city_id);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file; // Store the file in the form data
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.imageSrc = e.target.result; // Correctly update imageSrc
        };
        reader.readAsDataURL(file);
      }
    },

    async submitForm() {
      try {
        const organizationsStore = useOrganizationAddStore();

        if (!organizationsStore) {
          throw new Error("Failed to load employees store");
        }
        await organizationsStore.addOrganization(this.form); // Call addEmployee instead of fetchEmployees
        this.$router.push("/associations");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
    async fetchCitiess() {
      try {
        const organizationsStore = useOrganizationAddStore();
        if (!organizationsStore) {
          throw new Error("Failed to load organizations store");
        }
        await organizationsStore.getcities();
        this.cityOptions = this.cities; // If you need to populate the multiselect options
      } catch (error) {
        console.error("Error in fetchCities:", error);
      }
    },
  },
  mounted() {
    this.fetchCitiess();
    // console.log(this.organizations, "organizations");
    // console.log(this.cities, "cities");
    // console.log(this.cities_id, "citissssssssssssssssssssssssses_id");
    // console.log(this.form.city, "ddassssssssssssssssssssa");
    console.log(this.form.city_id);
  },
};
</script>
