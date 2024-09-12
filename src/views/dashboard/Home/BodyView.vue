<template>
  <div class="col-lg-8 col-md-12 col-12 px-4">
    <div class="percentage_projects">
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
              sssss
              style="height: 500px"
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
    <div class="team_shift">
      <div class="d-flex justify-content-between align-items-center">
        <h5>الطلاب المنضمين حديثا</h5>
        <router-link to="/students" class="btn">عرض الكل</router-link>
      </div>
      <!-- ======= table team ======= -->
      <div class="table-responsive">
        <table class="table" style="text-align: start">
          <thead>
            <tr>
              <th style="padding-left: 14%" scope="col">الإسم</th>
              <th scope="col">مستوي الاعاقة</th>
              <th scope="col">المجموعة</th>
              <th scope="col">تاريخ الانضمام</th>
            </tr>
          </thead>
          <tbody>
            <!-- For loop this details team -->
            <tr>
              <td class="name">
                <div class="details_team">
                  <div class="contact">
                    <p>Diaa Adel</p>
                    <span>01017745465</span>
                  </div>
                </div>
              </td>
              <td data-label="المستوي الوظيفي">إعاقة سمعية</td>
              <td data-label="رقم الهاتف">مجموعة العهد الحديث</td>
              <td data-label="نوع العمل">
                <span class="type_work total">مارس22, 2012</span>
              </td>
            </tr>
            <!-- For loop this details team -->
            <tr>
              <td class="name">
                <div class="details_team">
                  <div class="contact">
                    <p>Diaa Adel</p>
                    <span>01017745465</span>
                  </div>
                </div>
              </td>
              <td data-label="المستوي الوظيفي">إعاقة سمعية</td>
              <td data-label="رقم الهاتف">مجموعة العهد الحديث</td>
              <td data-label="نوع العمل">
                <span class="type_work total">مارس22, 2012</span>
              </td>
            </tr>
            <tr>
              <td class="name">
                <div class="details_team">
                  <div class="contact">
                    <p>Diaa Adel</p>
                    <span>01017745465</span>
                  </div>
                </div>
              </td>
              <td data-label="المستوي الوظيفي">إعاقة سمعية</td>
              <td data-label="رقم الهاتف">مجموعة العهد الحديث</td>
              <td data-label="نوع العمل">
                <span class="type_work total">مارس22, 2012</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- ======= table team ======= -->
    </div>
    <div class="employment_rates">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5>معدل التفاعل مع الموظفين</h5>
      </div>

      <div class="card">
        <Chart
          type="line"
          :data="chartDataRates"
          :options="chartOptionsRates"
          style="height: 500px"
          class="h-[30rem]"
        />
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
      chartDatapercentageProjectsDay: null,
      chartOptionspercentageProjectsDay: null,
      chartOptionsRates: null,
      chartDataRates: null,
    };
  },
  mounted() {
    this.chartDatapercentageProjectsDay =
      this.setChartDatapercentageProjectsDay();
    this.chartDataRates = this.setChartDataRates();
    this.chartOptionsRates = this.setChartOptionsRates();
  },
  methods: {
    // =============Chart Employment Rates=============
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
    // ==========Chart Empoloyess Activeity================
    setChartDataRates() {
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
    setChartOptionsRates() {
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
  },
};
</script>
