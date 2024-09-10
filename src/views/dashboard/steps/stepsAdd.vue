<template>
  <div class="steps-add">
    <header-pages title="اضافة مرحلة" :showButton="false" />
    <form action="" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المرحلة </label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المرحلة"
              v-model="steps.title"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="">المنهج الدراسي</label>
          <multiselect
            v-model="steps_value"
            :options="Stepsoptions"
            track-by="id"
            label="title"
            :multiple="true"
            :close-on-select="false"
            @update:model-value="updateValue"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> الحاله</label>
          <div class="input">
            <input type="text" placeholder="الحاله " v-model="steps.status" />
          </div>
        </div>
      </div>
      <div class="all-btn">
        <button type="submit" class="save">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useStepsAddStore } from "@/stores/steps/StepsAddStore";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
  name: "StepsAdd",
  components: {
    HeaderPages,
    Multiselect,
  },
  data() {
    return {
      steps: {
        title: "",
        curriculum_id: "",
        status: "",
      },
      Stepsoptions: [],
      steps_value: {},
    };
  },
  methods: {
    async fetchCurriculums() {
      try {
        const response = await this.axios.post("fetch_curriculums");
        this.Stepsoptions = response.data.data.data;
        if (response.data.status == true) {
          console.log(response.data.data);
        } else {
          console.log("Error fetching curriculums.");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async submitForm() {
      try {
        const useStepsStore = useStepsAddStore();
        if (!useStepsStore) {
          throw new Error("Failed to load steps store");
        }

        if (
          !this.steps.title ||
          !this.steps.curriculum_id ||
          !this.steps.status
        ) {
          Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await useStepsStore.addStepsData(this.steps);
        this.$router.push("/steps");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
    async updateValue() {
      this.curriculum_id = this.steps_value.id;
      console.log("steps_value", this.curriculums_id);
    },
  },
  mounted() {
    this.fetchCurriculums();
  },
};
</script>
