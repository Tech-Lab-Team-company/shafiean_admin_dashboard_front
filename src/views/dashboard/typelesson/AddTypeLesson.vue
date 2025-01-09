<template>
  <div class="lessons-add">
    <header-pages title="إضافة نوع حلقة" :showButton="false" />
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-12 col-md-6 col-12">
          <label for="title" class="mt-3">نوع الحلقة</label>
          <div class="input">
            <input
              id="title"
              type="text"
              placeholder="اكتب نوع الحلقة"
              v-model="title"
            />
            <span class="error-feedback" v-if="v$.title.$error">
              {{ getErrorMessage(v$.title) }}
            </span>
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
import { useTypeLessonsAddStore } from "@/stores/typelesson/TypeLessonsAddStore";
import Swal from "sweetalert2";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { HeaderPages },
  data() {
    return {
      title: "",
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      title: { required },
    };
  },
  methods: {
    async submitForm() {
      if (this.v$.$invalid) {
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "يرجى ملء جميع الحقول المطلوبة.",
        });
        return;
      }

      const store = useTypeLessonsAddStore();
      const data = { title: this.title };

      try {
        await store.addLessonsData(data);
      } catch (error) {
        console.error(error);
      }
    },
    getErrorMessage(validation) {
      if (validation.$error) {
        if (!validation.required) return "هذا الحقل مطلوب.";
      }
      return "";
    },
  },
};
</script>
  
 