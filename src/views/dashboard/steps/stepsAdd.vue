<template>
  <div class="steps-add">
    <header-pages title="اضافة مرحلة" :showButton="false" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- Step Title Input -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم المرحلة</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المرحلة"
              v-model="steps.title"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المرحلة</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المرحلة"
              v-model="steps.description"
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
            :close-on-select="false"
            @update:model-value="updateValue"
          ></multiselect>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="disabilities">الاعاقات</label>
          <multiselect
            v-model="disabilities_values"
            :options="disabilitiesOptions"
            track-by="id"
            label="title"
            :multiple="true"
            :close-on-select="false"
            @update:model-value="updatedisabilitiesValue"
          ></multiselect>
        </div>

        <!-- Type Select -->
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">قرأن</label>
          <multiselect
            id="type"
            v-model="selectedType"
            :options="typeOptions"
            :close-on-select="true"
            label="name"
            track-by="id"
            @update:model-value="updateTypeId"
          ></multiselect>
        </div>
      </div>

      <!-- Form Buttons -->
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
import { useOrganizationAddStore } from "@/stores/organizations/organizationAddStore";
import { mapState } from "pinia";
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
        description: "",
        disabilities_id: "",
      },
      disabilitiesOptions: [],
      Stepsoptions: [],
      steps_value: null,
      disabilities_values: null,
      typeOptions: [
        { id: 1, name: "قرأن" },
        { id: 2, name: "حديث" },
        { id: 3, name: "فقه" },
      ],
      selectedType: null,
    };
  },
  computed: {
    ...mapState(useStepsAddStore, {
      Stepss: (state) => state.Stepss,
    }),
    ...mapState(useOrganizationAddStore, {
      disabilities: (state) => state.disabilities,
    }),
  },
  methods: {
    async updateValue() {
      this.steps.curriculum_id = this.steps_value.id;
      console.log("steps_value", this.curriculum_id);
    },
    updatedisabilitiesValue() {
      this.steps.disabilities_id = this.disabilities_values
        .filter((dis) => dis && dis.id)
        .map((dis) => dis.id);
    },
    async fetchCurriculums() {
      try {
        const StepsStore = useStepsAddStore();
        if (!StepsStore) {
          throw new Error("Failed to load steps store");
        }
        await StepsStore.fetchCurriculums();
        this.Stepsoptions = this.Stepss;
      } catch (error) {
        console.error("Error fetching curriculums", error);
      }
    },
    async fetchDisabilities() {
      try {
        const StepsStore = useStepsAddStore();
        if (!StepsStore) {
          throw new Error("Failed to load steps store");
        }
        await StepsStore.fetchDisabilities();
        this.disabilitiesOptions = StepsStore.disabilities; // Update this
      } catch (error) {
        console.error("Error fetching disabilities", error);
      }
    },

    async submitForm() {
      try {
        const useStepsStore = useStepsAddStore();
        if (!useStepsStore) {
          throw new Error("Failed to load steps store");
        }

        if (!this.steps.title || !this.steps.curriculum_id) {
          Swal.fire("Error", "Please fill in all fields", "error");
          return;
        }

        await useStepsStore.addStepsData(this.steps);
        this.$router.push("/steps");
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
  },
  mounted() {
    this.fetchCurriculums();
    this.fetchDisabilities();
  },
};
</script>
