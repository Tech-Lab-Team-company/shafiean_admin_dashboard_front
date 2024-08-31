<template>
  <div class="table-responsive">
    <div class="table">
      <div class="header">
        <div :class="['search', { 'half-width': showSelect }]">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" placeholder="بحث" />
        </div>
        <!-- Show the select option based on the prop -->
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                <img
                  v-if="cellIndex === 1"
                  :src="cell"
                  alt="Image"
                  class="image"
                />
                <span v-else-if="cellIndex !== row.length - 1">{{ cell }}</span>
                <span v-else>
                  <i
                    v-for="(icon, iconIndex) in cell"
                    :key="iconIndex"
                    :class="icon.class"
                    class="action-icon"
                    @click="handleIconClick(icon.action)"
                  ></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
        <li class="page-item" v-for="page in pages" :key="page">
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
  name: "TablesPage",
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: ["list", "of", "options"],
    };
  },
  props: {
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
  },
  methods: {
    handleIconClick(action) {
      if (typeof action === "string") {
        this.$router.push(action); // Route to a specific path
      } else if (typeof action === "function") {
        action(); // Execute a specific function
      }
    },
  },
};
</script>

<style></style>
