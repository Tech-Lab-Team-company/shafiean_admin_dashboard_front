<template>
  <div class="add-countries">
    <header-pages title="اضافة دوله" link="/countries" :showButton="false" />

    <form action="" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدوله</label>
          <div class="input">
            <input
              type="text"
              placeholder="اسم الدوله"
              v-model="countries.title"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود الدوله</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود الدوله"
              v-mpdel="countries.code"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">كود الهاتف</label>
          <div class="input">
            <input
              type="number"
              placeholder="كود الدوله"
              v-model="countries.phone_code"
            />
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
import headerPages from "@/components/headerpages/HeaderPages.vue";
export default {
  data() {
    return {
      rolesOptions: ["Admin", "Manager", "Employee"],
      countries: {
        title: "",
        code: "",
        image: null,
        phone_code: "",
      },
    };
  },
  components: {
    headerPages,
  },
};
</script>
