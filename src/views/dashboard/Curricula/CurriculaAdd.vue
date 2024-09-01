<template>
  <div class="Curricula-add">
    <header-pages title="اضافة منهج" :showButton="false" />
    <form action="" @submit.prevent>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم المنهج</label>
          <div class="input">
            <input type="text" placeholder="اسم المنهج" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">نوع المنهج</label>
          <multiselect
            id="roles"
            v-model="form.role"
            :options="rolesOptions"
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
  name: "CurriculaAdd",
  components: {
    Multiselect,
    HeaderPages,
  },
  data() {
    return {
      rolesOptions: ["admin", "user", "editor"],
      form: {
        role: [],
      },
    };
  },
};
</script>
