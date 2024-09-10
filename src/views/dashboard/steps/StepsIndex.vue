<template>
  <div class="Steps">
    <header-pages title="المراحل" button="+ اضافة مرحلة" link="/add-steps" />

    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsSteps"
      :showSelect="false"
      :pages="tablePages"
      editLink="/edit-steps"
      viewLink="/view-steps"
      @delete="handleDeleteSteps"
    />
  </div>
</template>

<script>
import TablesPageVue from "@/components/tables/TablesPage.vue";
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useStepsStore } from "@/stores/steps/StepsStore";
import { mapState } from "pinia";
export default {
  components: { HeaderPages, TablesPageVue },
  data() {
    return {
      tableHeaders: [
        "ID",
        "اسم المرحله",
        "الوصف",
        "  المنهج الدراسي   ",
        "الاعاقات ",
      ],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    ...mapState(useStepsStore, {
      steps: (state) => state.steps,
    }),
    tableRowsSteps() {
      console.log(this.steps, "Diiaaaa");

      return this.steps.map((st) => [
        st.id,
        st.title,
        st.curriculum_id,
        st.description,
        st.disabilities_id,
      ]);
    },
  },
  methods: {
    async handleDeleteSteps(id) {
      const stepsStore = useStepsStore();
      console.log(id);
      await stepsStore.deleteSteps(id);
    },
  },
  mounted() {
    const stepsStore = useStepsStore();
    stepsStore.getSteps();
  },
};
</script>
