<template>
  <div class="table-responsive">
    <div class="table">
      <div class="header">
        <div :class="['search', { 'half-width': showSelect }]">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" placeholder="بحث" />
        </div>
        <div class="select" v-if="showSelect">
          <multiselect
            v-model="value"
            :options="options"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                {{ header }}
              </th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                <div class="img" v-if="isLink(cell)">
                  <img :src="cell" alt="Image" class="image" />
                </div>
                <span v-else>{{ cell }}</span>
              </td>
              <td>
                <div class="action-icons">
                  <i
                    v-if="isMaster(rowIndex)"
                    class="fa-solid fa-trash action-icon"
                    @click="handleIconClick('delete', row[0])"
                  ></i>
                  <i
                    class="fa-solid fa-pen-to-square action-icon"
                    @click="handleIconClick('edit', row[0])"
                  ></i>
                  <i
                    class="fa-solid fa-eye action-icon"
                    @click="handleIconClick('view', row[0])"
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { isLink } from "@/helpers/isLink"; // Adjust the path as needed
// import pagination from "laravel-vue-pagination";
// import { useEmployeesStore } from "@/stores/employees/EmployeesStore";
// import { mapState, mapActions } from "pinia";

export default {
  name: "TablesPage",
  components: {
    Multiselect,
    // pagination,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    pages: {
      type: Array,
      default: () => [1, 2, 3],
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    editLink: {
      type: String,
    },
    viewLink: {
      type: String,
    },
    ismaster: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      value: [],
      options: ["list", "of", "options"],
    };
  },

  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
    },

    handleIconClick(action, id) {
      if (action === "view") {
        this.$router.push(this.viewLink + "/" + id);
      } else if (action === "edit") {
        this.$router.push(this.editLink + "/" + id);
      } else if (action === "delete") {
        this.$emit("delete", id);
      }
    },
    isMaster(index) {
      if (this.ismaster[index] === undefined) {
        return true;
      }
      return this.ismaster[index] === 0;
    },
    isLink,
  },

  computed: {
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },
  },
};
</script>
