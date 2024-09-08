<template>
  <div class="steps-add">
    <header-pages title="اضافة مرحلة" :showButton="false" />
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
            v-model="valueone"
            :options="options"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="">المنهج</label>
          <multiselect
            v-model="valuetwo"
            :options="options"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label for="">المنهج</label>
          <multiselect
            v-model="valuethree"
            :options="options"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
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
      valueone: [],
      valuetwo: [],
      valuethree: [],
      options: ["list", "of", "options"],
    };
  },
};
</script>
