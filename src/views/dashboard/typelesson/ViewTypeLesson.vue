<template>
  <div class="lessons-add">
    <div class="plus">
      <i class="fa-solid fa-pen-to-square"></i>
      <header-pages title="تعديل نوع حلقه" :showButton="false" />
    </div>
    <form @submit.prevent="updateLessons">
      <div class="row">
        <div class="col-lg-12 col-md-6 col-12">
          <div class="input">
            <label for=""> نوع الحلقه</label>

            <input type="text" placeholder="نوع الحلقه" v-model="title" />
          </div>
        </div>
      </div>

      <div class="all-btn">
        <!-- <button type="submit" class="save" @click="Edit()">تعديل</button> -->
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>
    
    <script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useTypeLessonsEditStore } from "@/stores/typelesson/TypeLessonsEditStore";

import { mapState } from "pinia";

import useVuelidate from "@vuelidate/core";

export default {
  components: { HeaderPages },
  data() {
    return {
      v$: useVuelidate(),

      title: "",
    };
  },

  computed: {
    ...mapState(useTypeLessonsEditStore, {
      type_lessons: (state) => state.type_lessons,
    }),
  },
  methods: {
    async fetchData() {
      const store = useTypeLessonsEditStore();
      const id = this.$route.params.id;
      await store.fetchLessons(id);

      this.title = this.type_lessons.title;
    },

    async updateLessons() {
      const updatedData = {
        title: this.title,
      };

      console.log("Updated data for lesson:", updatedData);

      const store = useTypeLessonsEditStore();
      const id = this.$route.params.id;

      if (!this.v$.$error) {
        try {
          await store.updateLessons(id, updatedData);
        } catch (error) {
          console.error("Error details:", error);
        }
      }
    },

    Edit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("lessons");
        this.updateLessons();
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
    