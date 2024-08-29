<template>
  <div class="disabilities">
    <HeadersPages
      title="الأعاقات"
      button="+ اضافة اقاعة"
      link="/add-disabilitie"
    />
    <TablesPageVue
      :headers="tableHeaders"
      :rows="tableRows"
      :pages="tablePages"
    />
  </div>
</template>
<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import TablesPageVue from "@/components/tables/TablesPage.vue";
export default {
  name: "DisabilitiesIndex",
  components: {
    HeadersPages,
    TablesPageVue,
  },
  data() {
    return {
      tableHeaders: ["ID", "الصور", "اسم الأعاقه", "وصف الأعاقه", "actions"],
      tableRows: [
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",

          [
            { class: "fa-solid fa-pen-to-square", action: "/edit-disabilitie" },
            { class: "fa-solid fa-trash", action: this.deleteEmployee },
            { class: "fa-solid fa-eye", action: "/view-disabilitie" },
          ],
        ],
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",

          [
            { class: "fa-solid fa-pen-to-square", action: "/edit-disabilitie" },
            { class: "fa-solid fa-trash", action: this.deleteEmployee },
            { class: "fa-solid fa-eye", action: "/view-disabilitie" },
          ],
        ],
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",

          [
            { class: "fa-solid fa-pen-to-square", action: "/edit-disabilitie" },
            { class: "fa-solid fa-trash", action: this.deleteEmployee },
            { class: "fa-solid fa-eye", action: "/view-disabilitie" },
          ],
        ],
        [
          "1",
          require("@/assets/photos/Rectangle 8917.png"),
          "اصم",
          "اعاقة سمعيه",

          [
            { class: "fa-solid fa-pen-to-square", action: "/edit-disabilitie" },
            { class: "fa-solid fa-trash", action: this.deleteEmployee },
            { class: "fa-solid fa-eye", action: "/view-disabilitie" },
          ],
        ],
      ],
      tablePages: [1, 2, 3, 4, 5],
    };
  },
};
</script>
