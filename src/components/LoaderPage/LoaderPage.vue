<template>
  <div v-if="visible" class="spinner-loader">
    <div class="spinner">
      <img src="@/assets/photos/logo.png" alt="" />
    </div>

    <h4>منصة شفيعا</h4>
  </div>
</template>

<script>
export default {
  name: "SpinnerLoader",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.spinner-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.075);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
  font-family: "bold"; /* خط عصري */
  backdrop-filter: blur(10px); /* تأثير البلور على الخلفية */
  -webkit-backdrop-filter: blur(10px); /* للمتصفحات التي تحتاج إلى بادئة */
}

h4 {
  font-size: 1.5rem;
  margin-top: 15px;
  color: var(--main);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.spinner {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  animation: spin 1.2s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
