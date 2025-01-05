<template>
  <div>
    <div class="plus">
      <!-- <i class="fa-solid fa-pen-to-square"></i> -->
      <header-pages title="تفاصيل سنه دراسيه" :showButton="false" />
    </div>

    <div class="years-view">
      <div class="row g-4">
        <div class="col-lg-6 col-md-6 col-12">
          <p>أسم السنه</p>
          <span class="data">
            {{ years.title }}
          </span>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>الدوله</p>
          <span class="data">
            {{ years.country?.title }}
          </span>
        </div>
      </div>
      <div class="all-btn mt-3">
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script>
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useYearsEditStore } from "@/stores/Years/YearsEditStore";

export default {
  components: {
    headerPages,
  },

  data() {
    return {
      years: {
        title: "",
        country: "",
      },
      Country_values: {},
      CountryOptions: [],
    };
  },

  methods: {
    async fetchData() {
      const store = useYearsEditStore();
      const id = this.$route.params.id;
      await store.fetchYears(id);
      this.years = store.years;
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.years-view {
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
