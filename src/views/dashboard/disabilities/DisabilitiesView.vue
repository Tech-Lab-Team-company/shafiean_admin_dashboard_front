<template>
  <div>
    <div class="plus">
      <!-- <i class="fa-solid fa-pen-to-square"></i> -->
      <HeaderPages title="تفاصيل فئه تعليمية" :showButton="false" />
    </div>

    <div class="disabilities-view">
      <div class="row g-4">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="avatar-uploader">
            <p>صوره</p>

            <div class="avatar-preview">
              <img
                :src="
                  disabilitie.imageSrc
                    ? disabilitie.imageSrc
                    : disabilitie.image
                "
                alt="Avatar Preview"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <p>اسم الفئه تعليمية</p>

          <span class="data">{{ disabilitie.title }}</span>
        </div>
        <div class="col-lg-12 col-md-6 col-12 mt-3">
          <p>وصف المرحلة</p>

          <span class="data">{{ disabilitie.description }}</span>
        </div>
      </div>
      <button type="button" class="bake mt-3" @click="$router.go(-1)">
        رجوع
      </button>
    </div>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
import { useDisabilitieEditStore } from "@/stores/disabilities/disabilitieEditStore";

export default {
  name: "edit-disabilities",
  components: {
    HeaderPages,
  },
  data() {
    return {
      disabilitie: {
        title: "",
        description: "",
        image: null,
        imageSrc: "",
      },
    };
  },

  methods: {
    async fetchData() {
      const store = useDisabilitieEditStore();
      const id = this.$route.params.id;
      await store.fetchDisabilitie(id);
      this.disabilitie = store.disabilitie;
    },
  },

  async mounted() {
    await this.fetchData();
  },
};
</script>
<style scoped>
.disabilities-view {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
}
p {
  color: #000;
  font-weight: bold;
}

.data {
  border: 1px solid #06797e;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
}
</style>
