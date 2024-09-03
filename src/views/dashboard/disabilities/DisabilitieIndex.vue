<template>
  <div class="disabilities">
    <HeadersPages
      title="الأعاقات"
      button="+ اضافة اقاعة"
      link="/add-disabilities"
    />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRowsDisabilitie"
      :pages="tablePages"
      :editLink="editLink"
      :viewLink="viewLink"
    />
  </div>
</template>
<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
import { useDisabilitieStore } from "@/stores/disabilitie/disabilitieStoreIndex";
import { mapState } from "pinia";
export default {
  name: "DisabilitiesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
  },
  data() {
    return {
      tableHeaders: ["ID", "الصور", "اسم الأعاقه", "وصف الأعاقه"],
      editLink: "/edit-disabilities",
      viewLink: "/view-disabilities",
    };
  },
  computed: {
    ...mapState(useDisabilitieStore, {
      disabilitie: (state) => state.disabilitie,
      pages: (state) => state.pages,
    }),
    tableRowsDisabilitie() {
      console.log(this.disabilitie, "nasrasssssssddddddss");

      return this.disabilitie.map((dis) => [
        dis.id,
        dis.image,
        dis.title,
        dis.description,
      ]);
    },
    tablePages() {
      return this.pages;
    },
  },

  async mounted() {
    const disabilitiesStore = useDisabilitieStore();
    await disabilitiesStore.fetchDisabilitie();
  },
};
</script>
