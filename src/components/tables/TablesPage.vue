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
                <img
                  v-if="cellIndex === 1"
                  :src="cell"
                  alt="Image"
                  class="image"
                />
                <span v-else>{{ cell }}</span>
              </td>
              <td>
                <div class="action-icons">
                  <i
                    v-if="row[6] === 0"
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
    editLink: {
      type: String,
    },
    viewLink: {
      type: String,
    },
  },
  methods: {
    handleIconClick(action, id) {
      if (action === "view") {
        this.$router.push(this.viewLink + "/" + id);
      } else if (action === "edit") {
        this.$router.push(this.editLink + "/" + id);
      } else if (action === "delete") {
        this.$emit("delete", id);
      }
    },
  },
};
</script>
