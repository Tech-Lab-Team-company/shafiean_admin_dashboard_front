import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export const useOrganizationAddStore = defineStore("organizationAdd", {
  state: () => ({
    organizations: [],
    cities: [],
    countries: [],
    disabilities: [],
    disabilities_id: [],
    cities_id: [],
    country_id: [],
  }),
  actions: {
    async getcities(countryId) {
      const response = await axios.post("fetch_cities", {
        country_id: countryId,
      });
      if (response.data.status === true) {
        this.cities = response.data.data.data;

        // Loop through the cities and extract the id
        this.cities.forEach((city) => {
          // console.log(city.id, "City ID");

          this.cities_id.push(city.id);
          // console.log(this.cities_id, "cities sssssssssssssssssssssssssid");
        });
      } else {
        console.log("Error fetching cities.");
      }
    },
    async getCountries() {
      const response = await axios.post("fetch_countries");
      if (response.data.status === true) {
        this.countries = response.data.data.data;
        this.countries.forEach((country) => {
          this.country_id.push(country.id);
        });
      } else {
        console.log("Error fetching countries.");
      }
    },

    async getDisabilities() {
      const response = await axios.post("fetch_disabilities");
      if (response.data.status === true) {
        this.disabilities = response.data.data.data;
        this.disabilities.forEach((disability) => {
          this.disabilities_id.push(disability.id);
        });
      } else {
        console.log("Error fetching disabilities.");
      }
    },

    async addOrganization(organizationData) {
      try {
        // تحويل البيانات إلى FormData
        const formData = new FormData();
        Object.keys(organizationData).forEach((key) => {
          if (Array.isArray(organizationData[key])) {
            organizationData[key].forEach((item) => {
              formData.append(`${key}[]`, item);
            });
          } else {
            formData.append(key, organizationData[key]);
          }
        });

        // إرسال الطلب
        const response = await axios.post("add_organization", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // التحقق من الاستجابة
        if (response.data.status === true) {
          this.organizations.push(response.data);
          router.push("/associations");
          Swal.fire({
            icon: "success",
            title: "تم بنجاح",
            text: response.data.message || "تم حفظ المنظمة بنجاح.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "خطأ",
            text: response.data.message || "فشل في حفظ المنظمة.",
          });
        }
      } catch (error) {
        // التعامل مع الأخطاء العامة
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text:
            error.response?.data?.message || // إذا كان الخطأ مرتبطاً بالـ response
            "حدث خطأ أثناء حفظ المنظمة. حاول مرة أخرى.", // خطأ عام
        });
      }
    },
  },
});
