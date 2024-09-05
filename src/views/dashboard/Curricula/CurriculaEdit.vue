<template>
  <header-pages title="تعديل منهج" :showButton="false" />
  <div class="edit-curricula">
    <form action="" @submit.prevent="updateCurricula">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المنهج</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المنهج"
              v-model="Curriculas.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">رقم المنهج</label>
          <div class="input">
            <input
              type="text"
              placeholder="نوع المنهج"
              v-model="Curriculas.type"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> المنهج</label>
          <div class="input">
            <input
              type="text"
              placeholder="نوع المنهج"
              v-model="Curriculas.status"
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
import headerPages from "@/components/headerpages/HeaderPages.vue";
import { useCurriculumEditStore } from "@/stores/curricula/curriculaEditStore";
export default {
  name: "CurriculaEdit",
  components: {
    headerPages,
  },
  data() {
    return {
      Curriculas: {
        title: "",
        type: "",
        status: "",
      },
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async fetchData() {
      const store = useCurriculumEditStore();
      const id = this.$route.params.id;

      await store.fetchCurricula(id);
      this.Curriculas = store.Curriculas;
    },
    async updateCurricula() {
      const store = useCurriculumEditStore();
      const id = this.$route.params.id;
      await store.updateCurriculum(id, {
        title: this.Curriculas.title,
        type: this.Curriculas.type,
        status: this.Curriculas.status,
      });
      this.$router.go(-1);
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
