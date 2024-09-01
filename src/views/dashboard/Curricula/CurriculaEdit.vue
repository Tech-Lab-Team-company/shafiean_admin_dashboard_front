<template>
  <header-pages title="تعديل منهج" :showButton="false" />
  <div class="edit-curricula">
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
          <div class="input">
            <input type="text" placeholder="نوع المنهج" />
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
export default {
  name: "CurriculaEdit",
};
</script>
