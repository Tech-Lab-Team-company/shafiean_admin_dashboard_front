<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <div class="welcome">
          <h5>صباح الخير 😄</h5>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-12" style="text-align: start">
        <div class="buton-index">
          <router-link to="/employees" class="btn btn_title_page">
            الموظفين</router-link
          >
          <router-link to="/disabilities" class="btn btn_title_page"
            >الاعاقات</router-link
          >
          <router-link to="/curricula" class="btn btn_title_page good">
            المناهج</router-link
          >
          <router-link to="/lessons" class="btn btn_title_page">
            الحصص</router-link
          >
          <router-link to="/steps" class="btn btn_title_page">
            المراحل</router-link
          >
          <router-link to="/countries" class="btn btn_title_page">
            الدوله</router-link
          >
          <router-link to="/cities" class="btn btn_title_page">
            المدن
          </router-link>
          <router-link to="/associations" class="btn btn_title_page">
            الجمعيات</router-link
          >
          <router-link to="/adminInformation" class="btn btn_title_page">
            معلومات المسؤل
          </router-link>
        </div>
      </div>
      <div class="col-lg-8 col-md-12 col-12 px-4">
        <div class="statistics">
          <!-- ======== card statistics ======== -->
          <div class="card_statistics">
            <div class="d-flex justify-content-between">
              <i class="fa-solid fa-users"></i>
              <p class="counter">5,622</p>
            </div>
            <div class="d-flex justify-content-between">
              <span>اجمالى عدد الجمعيات</span>
              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>
          <!-- ======== card statistics ======== -->

          <!-- ======== card statistics ======== -->
          <div class="card_statistics">
            <div class="d-flex justify-content-between">
              <i class="fa-solid fa-user-check"></i>
              <p class="counter">250</p>
            </div>
            <div class="d-flex justify-content-between">
              <span>اجمالى عدد الموظفين</span>
              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>
          <!-- ======== card statistics ======== -->

          <!-- ======== card statistics ======== -->
          <div class="card_statistics">
            <div class="d-flex justify-content-between">
              <i class="fa-solid fa-circle"></i>
              <p class="counter">168</p>
            </div>
            <div class="d-flex justify-content-between">
              <span>اجمالى عدد الانضمامات</span>
              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-12 col-12 px-4">
        <div class="percentage_jobs">
          <h5 style="text-align: right">معدل التفاعل مع المنصة</h5>
          <!-- ============chart============ -->
          <div class="card">
            <Chart
              type="bar"
              style="height: 700px"
              :data="chartData"
              :options="chartOptions"
              class="h-[30rem]"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12 col-12">
        <div class="left_content">
          <!-- Start best performance job -->
          <div class="best_job">
            <h5>أكثر المجموعات نشاطا</h5>
          </div>
          <!-- End best performance job -->

          <!-- Start best performance project -->
          <div class="best_project">
            <!-- Start Card project -->
            <div class="card_project">
              <div class="percentage_bar" data-percent="90%">
                <div class="bar">
                  <div class="title">مجموعة العهد الحديث</div>
                  <div class="number_person">
                    <i class="fa-solid fa-people-group"></i>
                    <span>40</span>
                  </div>
                </div>
                <div class="percent">90%</div>
              </div>
            </div>
            <!-- End Card project -->
            <!-- Start Card project -->
            <div class="card_project">
              <div class="percentage_bar" data-percent="70%">
                <div class="bar">
                  <div class="title">مجموعة الطالب المتفوق</div>
                  <div class="number_person">
                    <i class="fa-solid fa-people-group"></i>
                    <span>20</span>
                  </div>
                </div>
                <div class="percent">70%</div>
              </div>
            </div>
            <!-- End Card project -->

            <!-- Start Card project -->
            <div class="card_project">
              <div class="percentage_bar" data-percent="50%">
                <div class="bar">
                  <div class="title">مجموعة الشطار</div>
                  <div class="number_person">
                    <i class="fa-solid fa-people-group"></i>
                    <span>30</span>
                  </div>
                </div>
                <div class="percent">50%</div>
              </div>
            </div>
            <!-- End Card project -->

            <!-- End best performance project -->
          </div>
          <!-- End best performance project -->
          <div class="average">
            <circle-progress value="75" max="100"></circle-progress>
            <div class="text-average">
              <h4>معدل تزايد الطلاب على المنصة</h4>
            </div>
          </div>
          <div class="average" style="margin-top: 10px">
            <circle-progress value="50" max="100"></circle-progress>
            <div class="text-average">
              <h4>معدل التفاعل بين الطلاب والمدرسين</h4>
            </div>
          </div>
          <!-- Start Region project -->
          <div class="region_project">
            <div class="d-flex justify-content-between align-items-center">
              <h5>افضل الأماكن تفاعل مع المنصة</h5>
              <div class="dropdown">
                <a
                  class="btn dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  السعودية
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">السعودية</a></li>
                  <li><a class="dropdown-item" href="#">مصر</a></li>
                  <li><a class="dropdown-item" href="#">الامارات</a></li>
                </ul>
              </div>
            </div>
            <img src="../../assets/photos/map.png" alt="map" />
            <div>
              <div class="table-responsive">
                <table class="table" style="text-align: right">
                  <thead>
                    <tr>
                      <th scope="col">المدينة</th>
                      <th scope="col">عدد الموظفين</th>
                      <th scope="col">عدد الطلاب</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>الرياض</td>
                      <td>22</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>الدمام</td>
                      <td>50</td>
                      <td>400</td>
                    </tr>
                    <tr>
                      <td>الخبر</td>
                      <td>60</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>المدينة</td>
                      <td>22</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>مكة</td>
                      <td>22</td>
                      <td>200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- End Region project -->

          <!-- Start accuracy in completing projects -->
          <div class="accuracy_projects">
            <div class="text-chart">
              <h4>70,5%</h4>
              <p>دقة الوقت</p>
            </div>

            <Chart
              type="doughnut"
              :data="chartDataAccuracy"
              :options="chartOptionsAccuracy"
              class="w-full md:w-[30rem]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "primevue/chart";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      chartDataAccuracy: null,
      chartOptionsAccuracy: {
        cutout: "60%",
      },
    };
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();

    this.chartDataAccuracy = this.setChartDataAccuracy();
    this.chartOptionsAccuracy = this.setChartOptionsAccuracy();
  },
  methods: {
    setChartData() {
      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            type: "line",
            label: "اجراء المهام",
            backgroundColor: "#3F3F44",
            borderColor: "#3F3F44",
            borderWidth: 1,
            data: [6, 9, 7, 3, 10, 7, 4, 6, 7, 10, 8],
          },
          {
            type: "bar",
            label: "تفاعل  الموظفين",
            backgroundColor: "#21765E",
            borderColor: "#21765E",
            borderWidth: 1,
            data: [10, 7, 4, 6, 9, 7, 3, 10, 13, 8, 11],
          },
          {
            type: "bar",
            label: "انضمام الطلاب",
            backgroundColor: "#E8EFED",
            borderColor: "#E8EFED",
            borderWidth: 1,
            tension: 0.1,
            data: [6, 9, 7, 3, 10, 7, 4, 6, 7, 10, 8],
          },
        ],
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--p-text-muted-color"
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        "--p-content-border-color"
      );

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    },
    setChartDataAccuracy() {
      return {
        labels: ["B", "C"],
        datasets: [
          {
            data: [325, 702],
            backgroundColor: [
              "rgba(178, 210, 63, 100)", // Color for Branch 1
              "rgba(178, 210, 63, 0.23)", // Color for Branch 1
            ],
            borderColor: [
              "rgba(230, 171, 47, 0.23)", // Border color for Branch 1
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    setChartOptionsAccuracy() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");

      return {
        plugins: {
          legend: {
            labels: {
              cutout: "60%",
              color: textColor,
            },
          },
        },
      };
    },
  },
};
</script>
