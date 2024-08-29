<template>
  <div class="disabilities">
    <HeadersPages
      title="الأعاقات"
      button="+ اضافة اقاعة"
      link="/add-disabilitie"
    />
    <div class="disabilities-table">
      <div class="header">
        <div class="row">
          <div class="col-lg-6">
            <div class="search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" placeholder="بحث" />
            </div>
          </div>
          <div class="col-lg-6">
            <multiselect v-model="value" :options="options"></multiselect>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">صوره</th>
              <th scope="col">أسم الأعاقه</th>
              <th scope="col">الوصف</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img
                  class="img-disabilitie"
                  src="@/assets/photos/Rectangle 8917.png"
                  alt=""
                />
              </td>
              <td>صم وبكم</td>
              <td>اعاقة سمعيه وهذا علي سبيل المثال</td>
              <td class="actions">
                <i
                  class="fa-solid fa-pen-to-square"
                  title="تعديل"
                  @click="$router.push('/edit-disabilitie')"
                ></i>
                <i id="delet" class="fa-solid fa-trash" title="حذف"></i>
                <i class="fa-solid fa-eye" title="عرض"></i>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <img
                  class="img-disabilitie"
                  src="@/assets/photos/Rectangle 8917.png"
                  alt=""
                />
              </td>
              <td>صم وبكم</td>
              <td>اعاقة سمعيه وهذا علي سبيل المثال</td>
              <td class="actions">
                <i
                  class="fa-solid fa-pen-to-square"
                  title="تعديل"
                  @click="$router.push('/edit-disabilitie')"
                ></i>
                <i id="delet" class="fa-solid fa-trash" title="حذف"></i>
                <i class="fa-solid fa-eye" title="عرض"></i>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <img
                  class="img-disabilitie"
                  src="@/assets/photos/Rectangle 8917.png"
                  alt=""
                />
              </td>
              <td>صم وبكم</td>
              <td>اعاقة سمعيه وهذا علي سبيل المثال</td>
              <td class="actions">
                <i
                  class="fa-solid fa-pen-to-square"
                  title="تعديل"
                  @click="$router.push('/edit-disabilitie')"
                ></i>
                <i id="delet" class="fa-solid fa-trash" title="حذف"></i>
                <i class="fa-solid fa-eye" title="عرض"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
  name: "DisabilitiesIndex",
  components: {
    HeadersPages,
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: ["list", "of", "options"],
    };
  },
};
</script>
