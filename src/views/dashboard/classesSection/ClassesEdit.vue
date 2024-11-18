<template>
  <div class="add-countries">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="اضافة فصول دراسيه" :showButton="false" />
    </div>

    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">أسم الفصل الدراسي</label>
          <div class="input">
            <input
              type="text"
              placeholder="أسم الفصل الدراسي "
              v-model="form.title"
              required
            />
          </div>
          <span class="error-feedback" v-if="v$.form.title.$error"
            >{{ getErrorMessage(v$.form.title) }}
          </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Country">أختر الدوله</label>
          <multiselect
            id="Country"
            v-model="form.country"
            :options="CountryOptions"
            track-by="id"
            label="title"
            :close-on-select="true"
          ></multiselect>

          <span class="error-feedback" v-if="v$.form.country.$error">{{
            getErrorMessage(v$.form.country)
          }}</span>
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
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useClassesEditStore } from "@/stores/Classess/ClassesEditStore";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import Swal from "sweetalert2";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { mapState } from "pinia";

export default {
  components: {
    headerPages,
    Multiselect,
  },

  data() {
    return {
      v$: useVuelidate(),
      form: {
        title: "",
        country_id: "",
      },
      Country_values: {},
      CountryOptions: [],
    };
  },

  validations() {
    return {
      form: {
        title: { required },
        country: { required },
      },
    };
  },

  computed: {
    ...mapState(useClassesEditStore, {
      countries: (state) => state.countries,
    }),
  },

  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    async fetchData() {
      const store = useClassesEditStore();
      const id = this.$route.params.id;
      await store.fetchClasses(id);
      this.form = store.Classes;
      await this.fetchEidtCountries();

      this.Country_values = this.form.country;
      console.log("Selected Country ID:", this.form);
    },
    async submitForm() {
      const store = useClassesEditStore();
      const id = this.$route.params.id;
      await store.updateClass(id, {
        title: this.form.title,
        country_id: this.form.country.id,
      });
      if (!this.form.title || !this.form.country) {
        Swal.fire("Error", "Please fill in all fields", "error");
        return;
      } else {
        Swal.fire("Success", "تم تعديل السنه الدراسيه بنجاح", "success");
      }
      this.$router.go(-1);
    },
    async fetchEidtCountries() {
      const store = useClassesEditStore();
      try {
        await store.getCountries();
        this.CountryOptions = store.countries || [];
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
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
</style>
