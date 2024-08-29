<template>
  <div class="employees">
    <HeadersPages title="الموظفين" button="+ اضافة موظف" link="/add-employee" />
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">صوره</th>
            <th scope="col">أسم الموظف</th>
            <th scope="col">رقم الهاتف</th>
            <th scope="col">البريد الالكتروني</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img
                class="img-employee"
                src="@/assets/photos/Rectangle 8917.png"
                alt=""
              />
            </td>
            <td>محمد أحمد محمد نصره</td>
            <td>01027003762</td>
            <td>mohamed@gmail.com</td>
            <td class="actions">
              <i class="fa-solid fa-pen-to-square" title="تعديل"></i>
              <i id="delet" class="fa-solid fa-trash" title="حذف"></i>
              <i class="fa-solid fa-eye" title="عرض"></i>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <img
                class="img-employee"
                src="@/assets/photos/Rectangle 8917.png"
                alt=""
              />
            </td>
            <td>محمد أحمد محمد نصره</td>
            <td>01027003762</td>
            <td>mohamed@gmail.com</td>
            <td class="actions">
              <i class="fa-solid fa-pen-to-square"></i>
              <i id="delet" class="fa-solid fa-trash"></i>
              <i class="fa-solid fa-eye"></i>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <img
                class="img-employee"
                src="@/assets/photos/Rectangle 8917.png"
                alt=""
              />
            </td>
            <td>محمد أحمد محمد نصره</td>
            <td>01027003762</td>
            <td>mohamed@gmail.com</td>
            <td class="actions">
              <i class="fa-solid fa-pen-to-square"></i>
              <i id="delet" class="fa-solid fa-trash"></i>
              <i class="fa-solid fa-eye"></i>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <img
                class="img-employee"
                src="@/assets/photos/Rectangle 8917.png"
                alt=""
              />
            </td>
            <td>محمد أحمد محمد نصره</td>
            <td>01027003762</td>
            <td>mohamed@gmail.com</td>
            <td class="actions">
              <i class="fa-solid fa-pen-to-square"></i>
              <i id="delet" class="fa-solid fa-trash"></i>
              <i class="fa-solid fa-eye"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import HeadersPages from "@/components/headerpages/HeaderPages.vue";
export default {
  name: "EmployeesIndex",
  components: {
    HeadersPages,
  },
};
</script>
