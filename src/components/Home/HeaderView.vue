<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <div class="welcome">
          <!-- <h5>صباح الخير 😄</h5> -->
          <h5>{{ greeting }}</h5>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-12" style="text-align: start">
        <div class="buton-index">
          <router-link to="/employees" class="btn btn_title_page">
            الموظفين</router-link
          >

          <router-link to="/disabilities" class="btn btn_title_page"
            >فئه تعليمية</router-link
          >
          <router-link to="/curricula" class="btn btn_title_page good">
            المناهج</router-link
          >
          <router-link to="/lessons" class="btn btn_title_page">
            الحلقات</router-link
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
      <div class="col-lg-12 col-md-12 col-12 px-4">
        <div class="statistics">
          <!-- Card 1: Total Organizations -->
          <div class="card_statistics">
            <div class="d-flex justify-content-between">
              <i class="fa-solid fa-users"></i>
              <p class="counter">{{ animatedOrganizations }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <span>اجمالى عدد الجمعيات</span>
              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>

          <!-- Card 2: Total Employees -->
          <div class="card_statistics">
            <div class="d-flex justify-content-between">
              <i class="fa-solid fa-user-check"></i>
              <p class="counter">{{ animatedTeacher }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <span>اجمالى عدد الموظفين</span>
              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>

          <!-- Card 3: Total Joins -->
          <div class="card_statistics">
            <div class="d-flex justify-content-between">
              <i class="fa-solid fa-circle"></i>
              <p class="counter">{{ animatedUser }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <span>اجمالى عدد الانضمامات</span>
              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-12 px-4">
        <div class="percentage_jobs">
          <h5 style="text-align: right">معدل التفاعل مع المنصة</h5>
          <!-- ============chart============ -->
          <div class="card">
            <Chart
              type="bar"
              :data="chartData"
              :options="chartOptions"
              class="h-[30rem]"
            />
          </div>
        </div>
        <div class="percentage_projects mt-4">
          <div class="d-flex justify-content-between">
            <h5>نسبة الالتزام لدي الموظفين</h5>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-day-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-day"
                  type="button"
                  role="tab"
                  aria-controls="pills-day"
                  aria-selected="true"
                >
                  يوميا
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-week-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-week"
                  type="button"
                  role="tab"
                  aria-controls="pills-week"
                  aria-selected="false"
                >
                  اسبوعيا
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-month-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-month"
                  type="button"
                  role="tab"
                  aria-controls="pills-month"
                  aria-selected="false"
                >
                  شهريا
                </button>
              </li>
            </ul>
          </div>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-day"
              role="tabpanel"
              aria-labelledby="pills-day-tab"
              tabindex="0"
            >
              <div class="card">
                <Chart
                  type="line"
                  :data="chartDatapercentageProjectsDay"
                  :options="chartOptionspercentageProjectsDay"
                  class="h-[30rem]"
                />
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-week"
              role="tabpanel"
              aria-labelledby="pills-week-tab"
              tabindex="0"
            >
              <div class="chart-containers">
                <canvas id="percentageProjectsWeek"></canvas>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-month"
              role="tabpanel"
              aria-labelledby="pills-month-tab"
              tabindex="0"
            >
              <div class="chart-containers">
                <canvas id="percentageProjectsMonth"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-12">
        <div class="left_content">
          <!-- Start best performance job -->
          <div class="best_job">
            <h5>أكثر المجموعات نشاطا</h5>
          </div>
          <!-- End best performance job -->

          <!-- Start best performance project -->
          <div
            class="best_project"
            v-for="student in this.store.MostActive"
            :key="student.id"
          >
            <!-- Start Card project -->
            <div class="card_project">
              <div class="percentage_bar" data-percent="90%">
                <div class="bar">
                  <div class="title">{{ student.name }}</div>
                  <div class="number_person">
                    <i class="fa-solid fa-people-group"></i>
                    <span>{{ student.user_count }}</span>
                  </div>
                </div>
                <div class="percent">{{ student.user_count }}</div>
              </div>
            </div>
            <!-- End Card project -->
            <!-- Start Card project -->
            <!-- <div class="card_project">
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
            </div> -->
            <!-- End Card project -->

            <!-- Start Card project -->
            <!-- <div class="card_project">
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
            </div> -->
            <!-- End Card project -->

            <!-- End best performance project -->
          </div>
          <!-- End best performance project -->
          <!-- <div class="average">
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
          </div> -->
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
                <table class="table">
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
          <!-- <div class="accuracy_projects">
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
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHomeStore } from "@/stores/HomeStore/HomeStore";
import Chart from "primevue/chart";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      greeting: "",
      store: useHomeStore(),
      animatedOrganizations: 0,
      organizationCount: null,
      animatedTeacher: 0,
      teacherCount: null,
      animatedUser: 0,
      userCount: null,

      chartData: null,
      chartOptions: null,
      chartDataAccuracy: null,
      chartOptionsAccuracy: {
        cutout: "60%",
      },
      chartDatapercentageProjectsDay: null,
      chartOptionspercentageProjectsDay: null,
    };
  },
  async mounted() {
    await this.store.getCounts();
    await this.store.fetchMostActive();
    await this.store.fetchFirstChart();
    await this.store.fetchPlaces();

    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();

    this.chartDataAccuracy = this.setChartDataAccuracy();
    this.chartOptionsAccuracy = this.setChartOptionsAccuracy();

    this.chartDatapercentageProjectsDay =
      this.setChartDatapercentageProjectsDay();

    // counter
    this.animateCount(
      "animatedOrganizations",
      (this.organizationCount = this.store.Counts.organization_count),
      1500
    );
    this.animateCount(
      "animatedTeacher",
      (this.teacherCount = this.store.Counts.teacher_count),
      1500
    );
    this.animateCount(
      "animatedUser",
      (this.userCount = this.store.Counts.user_count),
      1500
    );
  },

  methods: {
    animateCount(variable, target, duration) {
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const increment = Math.min(progress / duration, 1);
        this[variable] = Math.floor(increment * target);

        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          this[variable] = target;
        }
      };

      window.requestAnimationFrame(step);
    },

    setChartData() {
      return {
        labels: this.store.ChartData.months,

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
            data: this.store.ChartData.user_counts,
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
    setChartDatapercentageProjectsDay() {
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
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            tension: 0.4,
            borderColor: "white",
          },
          {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: "#996b92",
          },
          {
            label: "Third Dataset",
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: "#996b92",
            tension: 0.4,
            backgroundColor: "#e9f0ed",
          },
        ],
      };
    },
    setChartOptionspercentageProjectsDay() {
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
        aspectRatio: 0.6,
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
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
    setGreeting() {
      const currentHour = new Date().getHours();
      if (currentHour >= 16 || currentHour < 2) {
        this.greeting = "مساء الخير 😄";
      } else {
        this.greeting = "صباح الخير 😄";
      }
    },
  },
  created() {
    this.setGreeting();
  },
};
</script>

<style scoped>
.statistics .card_statistics {
  margin-bottom: 20px;
}

.counter {
  font-size: 24px;
  font-weight: bold;
}
</style>
