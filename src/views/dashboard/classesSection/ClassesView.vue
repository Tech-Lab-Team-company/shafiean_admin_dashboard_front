<template>
  <div class="add-countries">
    <div class="plus">
      <!-- <i class="fa-solid fa-pen-to-square"></i> -->
      <header-pages title="تفاصيل الفصول الدراسيه" :showButton="false" />
    </div>

    <div class="classes-view">
      <div class="row g-4">
        <div class="col-lg-6 col-md-6 col-12">
          <p>أسم الفصل الدراسي</p>

          <span class="data">{{ form.title }} </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>أختر الدوله</p>

          <span class="data">{{ form?.country?.title }} </span>
        </div>
      </div>
      <div class="all-btn mt-3">
        <!-- <button type="submit" class="save" @click="Edit()">تعديل</button> -->
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </div>
  </div>
</template>
<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useClassesEditStore } from "@/stores/Classess/ClassesEditStore";

export default {
  components: {
    headerPages,
  },

  data() {
    return {
      form: {
        title: "",
        country_id: "",
      },
      Country_values: {},
      CountryOptions: [],
    };
  },

  methods: {
    async fetchData() {
      const store = useClassesEditStore();
      const id = this.$route.params.id;
      await store.fetchClasses(id);
      this.form = store.Classes;

      this.Country_values = this.form.country;
      console.log("Selected Country ID:", this.form);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.classes-view {
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
