<template>
  <div>
    <div class="plus">
      <!-- <i class="fa-solid fa-pen-to-square"></i> -->
      <header-pages title="تفاصيل مرحلة" :showButton="false" />
    </div>
    <div class="steps-view">
      <div class="row g-4">
        <!-- Step Title Input -->
        <div class="col-lg-6 col-md-6 col-12">
          <p>اسم المرحلة</p>

          <span class="data">{{ Steps.title }}</span>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <p>المنهج الدراسي</p>

          <span class="data">{{ curricula_values?.title }}</span>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <p>الإعاقات</p>

          <div class="data">
            <span v-for="item in disabilities_values" :key="item.id">
              {{ item?.title }} ,
            </span>
          </div>
        </div>

        <!-- Type Select -->
        <div class="col-lg-6 col-md-6 col-12">
          <p>السورة</p>

          <div class="data">
            <span v-for="item in selectedType_values" :key="item.id">
              {{ item?.name }} ,
            </span>
          </div>
        </div>
        <div class="col-lg-12 col-md-6 col-12 mt-3">
          <p>وصف المرحلة</p>
          <span class="data" v-html="Steps.description"> </span>
        </div>
      </div>

      <!-- Form Buttons -->
      <div class="all-btn mt-3">
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";

import { useStepsEditStore } from "@/stores/steps/StepsEditStore";
import { mapState } from "pinia";

export default {
  components: { HeaderPages },
  data() {
    return {
      selectedType_values: [],
      curricula_values: null,
      disabilities_values: [],
      typeOptions: [],
      curriculaOptions: [],
      disability_ids: [],
      disabilitiesOptions: [],
      surahOptions: [],
      Steps: {
        title: "",
        description: "",
        curriculum: {},
        surahs: [],
        type_id: "",
        curriculum_id: null,
        disability_ids: "",
        surah_ids: null,
      },
    };
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      const store = useStepsEditStore();
      const id = this.$route.params.id;

      await store.fetchSteps(id);
      this.Steps = store.Steps;

      this.selectedType_values = this.Steps.surahs.map((surah) => ({
        id: surah.id,
        name: surah.name,
      }));

      this.curricula_values = this.Steps.curriculum
        ? { id: this.Steps.curriculum.id, title: this.Steps.curriculum.title }
        : null;

      this.disabilities_values = this.Steps.disability.map((dis) => ({
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
.steps-view {
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
