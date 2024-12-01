<template>
  <div class="row">
    <div class="col-lg-7 col-md-12 col-12">
      <div class="team_shift">
        <div class="d-flex justify-content-between align-items-center">
          <h5>الطلاب المنضمين حديثا</h5>
          <router-link to="/students" class="btn">عرض الكل</router-link>
        </div>
        <!-- ======= table team ======= -->

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">صوره</th>
                <th scope="col">الاسم</th>
                <th scope="col">الهاتف</th>
                <th scope="col">اسم المجموعة</th>
                <th scope="col">المستوي الاعاقة</th>
                <th scope="col">تاريخ الانضمام</th>
              </tr>
            </thead>
            <tbody>
              <!-- For loop this details team -->
              <tr v-for="student in this.store.lastStudents" :key="student.id">
                <td class="name">
                  <div class="details_team">
                    <div class="contact">
                      <img :src="student.image" alt="" />
                      <div></div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{{ student.name }}</p>
                </td>
                <td>
                  <span>{{ student.phone }}</span>
                </td>
                <td data-label="رقم الهاتف">
                  {{
                    student.group && student.group.title
                      ? student.group.title
                      : "لا توجد مجموعة"
                  }}
                </td>
                <td data-label="المستوي الاعاقة">
                  {{
                    student.disability_type
                      ? student.disability_type
                      : "لا يوجد"
                  }}
                </td>
                <td data-label="نوع العمل">
                  <span class="type_work total">{{ student.created_at }}</span>
                </td>
              </tr>
              <!-- For loop this details team -->
            </tbody>
          </table>
        </div>
        <!-- ======= table team ======= -->
      </div>
    </div>
    <div class="col-lg-5 col-md-12 col-12 px-4">
      <div class="employment_rates">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5>معدل التفاعل مع الموظفين</h5>
        </div>

        <div class="card">
          <Chart
            type="line"
            :data="chartDataRates"
            :options="chartOptionsRates"
            style="height: 295px"
            class="h-[30rem]"
          />
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
      store: useHomeStore(),
      chartDatapercentageProjectsDay: null,
      chartOptionspercentageProjectsDay: null,
      chartOptionsRates: null,
      chartDataRates: null,
    };
  },

  async mounted() {
    this.chartDataRates = this.setChartDataRates();
    this.chartOptionsRates = this.setChartOptionsRates();
    await this.store.getLastStudents();
  
  },
  methods: {
    // =============Chart Employment Rates=============

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
