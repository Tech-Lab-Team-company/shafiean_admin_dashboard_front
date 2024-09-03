<template>
  <div class="lessons-add">
    <header-pages title="تعديل درس" :showButton="false" />
    <form action="">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدرس</label>
          <div class="input">
            <input type="text" placeholder="اسم الدرس" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدرس</label>
          <div class="input">
            <input type="text" placeholder="اسم الدرس" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدرس</label>
          <div class="input">
            <input type="text" placeholder="اسم الدرس" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">اسم الدرس</label>
          <div class="input">
            <input type="text" placeholder="اسم الدرس" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">من</label>
          <div class="input">
            <input type="date" placeholder="من" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <label for="">الي</label>
          <div class="input">
            <input type="date" placeholder="الي" />
          </div>
        </div>
      </div>

      <div class="all-btn">
        <button type="submit" class="save">تعديل</button>
        <button type="button" class="bake" @click="$router.go(-1)">رجوع</button>
      </div>
    </form>
  </div>
</template>
<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
export default {
  components: { HeaderPages },
};
</script>
