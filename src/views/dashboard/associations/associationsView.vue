<template>
  <div class="associations-edit">
    <div class="plus">
      <!-- <i class="fa-solid fa-pen-to-square"></i> -->
      <header-pages title="تفاصيل جمعية" :showButton="false" />
    </div>
    <div class="associations-view">
      <div class="row g-4">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="avatar-uploader">
            <p>صوره</p>

            <div v-if="organizations.imageSrc" class="avatar-preview">
              <img :src="organizations.imageSrc" alt="Avatar Preview" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>أسم الجمعية</p>

          <span class="data">{{ organizations.name }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>رقم الترخيص</p>
          <span class="data">{{ organizations.licence_number }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>رقم التليفون</p>
          <span class="data">{{ organizations.phone }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>البريد الالكتروني</p>
          <span class="data">{{ organizations.email }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>العنوان</p>

          <span class="data">{{ organizations.address }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>اسم المدير</p>
          <span class="data">{{ organizations.manager_name }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>رقم المدير</p>
          <span class="data">{{ organizations.manager_phone }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>بريد الالكتروني المدير</p>
          <span class="data">{{ organizations.manager_email }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>دوله</p>
          <span class="data">{{ Country_values?.title }}</span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>مدينه</p>
          <span class="data">{{ city_values?.title }}</span>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="disabilities">فئه تعليمية</label>

          <div class="d-flex data">
            <span v-for="item in disabilities_values" :key="item.id">
              {{ item?.title }} ,
            </span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>link</p>
          <span class="data">{{ organizations.website_link }}</span>
        </div>
        <div class="all-btn">
          <button type="button" class="bake" @click="$router.go(-1)">
            رجوع
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";

import { useOrganizationEditStore } from "@/stores/organizations/oreganizationEdit";

export default {
  components: {
    HeaderPages,
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
        disability_ids: null,
        website_link: "",
        disabilities: [],
      },
      CountryOptions: [],
      cityOptions: [],
      disabilitiesOptions: [],
      city_values: {},
      Country_values: {},
      disabilities_values: [],
    };
  },

  methods: {
    async fetchData() {
      const store = useOrganizationEditStore();
      const id = this.$route.params.id;

      // جلب البيانات للمؤسسة
      await store.fetchOrganizations(id);

      this.organizations = store.organizations;
      if (this.organizations.image) {
        this.organizations.imageSrc = this.organizations.image;
      }

      // جلب الدول والبيانات الأخرى
      await store.getCountries();
      await store.getDisabilities();

      // التحقق من أنه يتم استدعاء getcities بعد الحصول على country_id
      if (this.organizations.country_id) {
        await store.getcities(this.organizations.country_id); // تمرير country_id إلى دالة getcities
      }

      // تعيين القيم من البيانات المسترجعة
      this.CountryOptions = store.countries;
      this.cityOptions = store.cities;
      this.disabilitiesOptions = store.disabilities;

      // تعيين القيم بناءً على البيانات المحفوظة
      this.Country_values = this.CountryOptions.find(
        (country) => country.id === this.organizations.country_id
      );

      this.city_values = this.cityOptions.find(
        (city) => city.id === this.organizations.city_id
      );

      // تحضير القيم الأخرى للـ disabilities
      this.disabilities_values = this.organizations.disabilities.map((dis) => ({
        id: dis.id,
        title: dis.title,
      }));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.associations-view {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
}
p {
  color: #000;
  font-weight: bold;
}

.data {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
}
</style>
