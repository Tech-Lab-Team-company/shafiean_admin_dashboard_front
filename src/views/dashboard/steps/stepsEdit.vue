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
              v-model="Steps.title"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المرحلة</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم المرحلة"
              v-model="Steps.description"
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
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useStepsEditStore } from "@/stores/steps/StepsEditStore";
export default {
  components: { HeaderPages, Multiselect },
  data() {
    return {
      Steps: {
        title: "",
        description: "",
        curriculum_id: "",
        disabilities_id: "",
        selectedType: "",
      },
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async fetchData() {
      const store = useStepsEditStore();
      const id = this.$route.params.id;

      await store.fetchSteps(id);
      this.Steps = store.Steps;
    },
    async updateSteps() {
      const store = useStepsEditStore();
      const id = this.$route.params.id;
      await store.updateSteps(id, {
        title: this.Steps.title,
        description: this.Steps.description,
        curriculum_id: this.Steps.curriculum_id,
        disabilities_id: this.Steps.disabilities_id,
      });
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
