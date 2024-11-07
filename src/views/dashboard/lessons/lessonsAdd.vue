<template>
  <div class="lessons-add">
    <header-pages title="اضافة حصه" :showButton="false" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- <div class="col-lg-6 col-md-6 col-12">
          <label for=""> من </label>
          <div class="input">
            <input type="date" placeholder="من" v-model="lessons.start_verse" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for=""> إلي</label>
          <div class="input">
            <input type="date" placeholder="إلي" v-model="lessons.end_verse" />
          </div>
        </div> -->
        <!-- Multiselect for Stages -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="Stages">المرحلة</label>
          <multiselect
            v-model="Stages_values"
            :options="StagesOptions"
            track-by="id"
            label="title"
            :close-on-select="true"
            @update:model-value="updateStagesValue"
          ></multiselect>
          <span class="error-feedback" v-if="v$.lessons.stage_id.$error">
            {{ getErrorMessage(v$.lessons.stage_id) }}
          </span>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="">القرأن</label>
          <multiselect
            id="type"
            v-model="selectedType"
            :options="typeOptions"
            :close-on-select="true"
            label="name"
            track-by="id"
            @update:model-value="updateTypeId"
          ></multiselect>
          <span class="error-feedback" v-if="v$.lessons.quraan_id.$error">
            {{ getErrorMessage(v$.lessons.quraan_id) }}
          </span>
        </div>
        <div class="col-lg-12 col-md-6 col-12">
          <label for="" class="mt-3"> وصف المنهج</label>
          <div class="input">
            <textarea
              id="description"
              name="w3review"
              rows="4"
              cols="100"
              placeholder="اسم الدرس"
              v-model="lessons.title"
            >
            </textarea>
            <span class="error-feedback" v-if="v$.lessons.title.$error">
              {{ getErrorMessage(v$.lessons.title) }}
            </span>
          </div>
        </div>
      </div>

      <div class="all-btn">
        <button type="submit" class="save" @click="save()">حفظ</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useLessonsAddStore } from "@/stores/lessons/LessonsAddStore";
import "vue-multiselect/dist/vue-multiselect.css";
import Multiselect from "vue-multiselect";
import { mapState } from "pinia";
// import Swal from "sweetalert2";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: { HeaderPages, Multiselect },

  data() {
    return {
      v$: useVuelidate(),
      lessons: {
        title: "",
        quraan_id: null,
        stage_id: "",
      },
      StagesOptions: [], // Updated to hold fetched options
      Stages_values: {},
      typeOptions: [
        { id: 1, name: "قرأن" },
        { id: 2, name: "حديث" },
        { id: 3, name: "فقه" },
      ],
      selectedType: null,
    };
  },
  validations() {
    return {
      lessons: {
        title: { required },
        quraan_id: { required },
        stage_id: { required },
      },
    };
  },

  computed: {
    ...mapState(useLessonsAddStore, {
      lesson: (state) => state.lesson,
    }),
  },

  methods: {
    getErrorMessage(field) {
      if (field.$invalid && field.$dirty) {
        return "هذا الحقل مطلوب";
      }
      return "";
    },
    async fetchStages() {
      try {
        const LessonsStore = useLessonsAddStore();
        if (!LessonsStore) {
          throw new Error("Failed to load Lessons store");
        }
        await LessonsStore.fetchSteps();
        this.StagesOptions = LessonsStore.lesson; // Populate StagesOptions
        console.log("StagesOptions:", this.StagesOptions);
      } catch (error) {
        console.error("Error fetching stages", error);
      }
    },

    async submitForm() {
      try {
        const LessonsIndexStore = useLessonsAddStore();
        if (!LessonsIndexStore) {
          throw new Error("Failed to load Lessons store");
        }

        if (
          !this.lessons.stage_id ||
          !this.lessons.quraan_id ||
          !this.lessons.title
        ) {
          // Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await LessonsIndexStore.addLessonsData(this.lessons);
        this.$router.push("/lessons");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },

    updateStagesValue() {
      this.lessons.stage_id = this.Stages_values ? this.Stages_values.id : null;
      console.log("Stages_id", this.lessons.stage_id);
    },
    updateTypeId(selectedOption) {
      this.lessons.quraan_id = selectedOption ? selectedOption.id : null;
    },
    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("lessons", this.lessons);
      }
    },
  },

  mounted() {
    this.fetchStages();
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.85rem;
}
</style>
