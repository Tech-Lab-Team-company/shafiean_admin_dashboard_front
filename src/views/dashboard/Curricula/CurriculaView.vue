<template>
  <div class="plus">
    <!-- <i class="fa-solid fa-pen-to-square"></i> -->
    <header-pages title="تفاصيل منهج" :showButton="false" />
  </div>
  <div class="curricula-view">
    <div>
      <div class="row g-4">
        <div class="col-lg-6 col-md-6 col-12">
          <p>اسم المنهج</p>

          <span class="data">
            {{ Curriculas.title }}
          </span>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <p>نوع المنهج</p>

          <span class="data">
            {{
              Curriculas.type == 1
                ? "قراءن"
                : Curriculas.type == 2
                ? "حديث"
                : "فقه"
            }}
          </span>
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
        type: null,
      },

      typeOptions: [
        { id: 1, name: "قرأن" },
        { id: 2, name: "حديث" },
        { id: 3, name: "فقه" },
      ],
      selectedType: null,
    };
  },

  methods: {
    async fetchData() {
      try {
        const store = useCurriculumEditStore();
        const id = this.$route.params.id;
        await store.fetchCurricula(id);

        // Ensure Curriculas is always an object
        this.Curriculas = store.Curriculas || { title: "", type: null };
      } catch (error) {
        console.error("Failed to fetch data:", error);
        Swal.fire("Error", "Failed to load data", "error");
      }
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>

<style scoped>
.curricula-view {
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
