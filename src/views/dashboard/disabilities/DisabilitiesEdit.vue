<template>
  <div class="editdisabilities">
    <HeaderPages title="تعديل اعاقه" :showButton="false" />

    <div class="editinputs">
      <div class="row">
        <div class="col-lg-6">
          <label for=""> اسم الاعاقه</label>
          <div>
            <input type="text" placeholder="أدخل اسم الاعاقه" />
          </div>
        </div>
        <div class="col-lg-6">
          <label for=""> وصف الاعاقه</label>
          <div>
            <input type="text" placeholder="وصف الاعاقه" />
          </div>
        </div>
      </div>
      <button>حفظ</button>
      <button @click="$router.go(-1)">رجوع</button>
    </div>
  </div>
</template>
<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
export default {
  name: "edit-disabilities",

  components: {
    HeaderPages,
  },
};
</script>
