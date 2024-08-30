<template>
  <div class="headers">
    <h4>{{ title }}</h4>
    <router-link v-if="showButton" :to="link" class="add">
      {{ button }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HeaderPages",
  props: {
    title: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    showButton: {
      type: Boolean,
      default: true, // Button is shown by default
    },
  },
};
</script>
