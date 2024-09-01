<template>
  <div class="Steps">
    <header-pages title="المراحل" button="+ اضافة مرحلة" link="/add-steps" />
    <form action="" @submit.prevent>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم المرحلة</label>
          <div class="input">
            <input type="text" placeholder="اسم المرحلة" />
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12">
          <label for="">وصف المرحلة</label>
          <div class="input">
            <input type="text" placeholder="وصف المرحلة" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="">الاعاقات</label>
          <multiselect
            v-model="value"
            :options="options"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="">المنهج</label>
          <multiselect
            v-model="value"
            :options="options"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
  components: { HeaderPages, Multiselect },
  data() {
    return {
      value: [],
      options: ["list", "of", "options"],
    };
  },
};
</script>
