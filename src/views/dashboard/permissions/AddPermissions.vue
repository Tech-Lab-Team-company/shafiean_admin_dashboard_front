<template>
  <div class="add-courses">
    <div class="plus">
      <i class="fa-solid fa-plus"></i>
      <header-pages title="اضافة صلاحية" :showButton="false" />
    </div>
    <div class="all-permisson-permisson">
      <form action="permations.html" class="add_form">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-12">
            <div class="form-group">
              <label style="font-size: 13px" for="">* اختر الوظيفه</label>
              <select
                name=""
                id=""
                class="form-control selectpicker"
                title="اختر الوظيفه"
              >
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <div class="form-group">
              <label style="font-size: 14px" for="">*اسم الصلاحية</label>
              <input
                type="text"
                name=""
                id=""
                class="form-control"
                placeholder="اكتب هنا"
              />
            </div>
          </div>
        </div>

        <div class="add-permisson">
          <div class="add">
            <input
              class="input"
              type="checkbox"
              value="one"
              name="access"
              id="flexCheckDefault"
            />
            <label class="flabel" for="flexCheckDefault">
              الدخول من وجهة المعلم
            </label>
          </div>
          <div class="edit">
            <input
              class="input"
              type="checkbox"
              value="two"
              name="access"
              id="flexCheckDefault2"
            />
            <label class="flabel" for="flexCheckDefault">
              الدخول من وجهة الموقع
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <td>المراحل الدراسية</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>المواد</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>المجموعات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الدروس</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الاختبارات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الاسالة التفاعلية</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الواجبات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>بنك الاسئله</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الطلاب</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>المعلمين</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>أولياء الامور</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>المشرفين</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>اضافة اسليدر</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>من نحن</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>شركاء النجاح</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الخدمات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تطبيق المعلم</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تطبيق الطالب</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تطبيق ولي الأمر</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>عرض المدونه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الأقسام</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الهشتاج</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>اضافة مدونه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>التقارير العامه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تقارير الأنجازات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تقارير الحضور والأنصراف</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تقارير الأمتحانات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تقارير المسابقات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تقارير السلوكيه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>تقارير الاكادميه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>التقارير الفائته</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>التقارير التفصيليه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>التقارير الجمعيه أو المدرسه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الأرشيف</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>المسابقات</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>المكتبه الألكترونيه</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الشكاوي</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الاعدادات العامة</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>الوظائف</td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> view </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> edite </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> delet </label>
            </div>
          </td>
          <td>
            <div class="form">
              <input
                class="input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="flabel" for="flexCheckDefault"> add </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="Addd">
      <button class="btn">اضافه</button>
    </div>
  </div>
</template>

<script>
import HeaderPages from "@/components/headerpages/HeaderPages.vue";
export default {
  components: {
    HeaderPages,
  },
};
</script>
