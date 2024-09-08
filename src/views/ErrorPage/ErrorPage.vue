<template>
  <div class="error-page">
    <dotlottie-player
      src="https://lottie.host/7d598d6b-5ed6-4c67-b170-f46cffcbad0c/WoTLQwDOLG.json"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px"
      loop
      autoplay
    ></dotlottie-player>
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      error: null,
    };
  },
};
</script>

<style scoped>
.error-page {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "bold";
}
.error-page h1 {
  font-size: 100px;
  margin-bottom: 20px;
}
.error-page p {
  font-size: 24px;
  margin-bottom: 20px;
}
a {
  background-color: var(--main);
  padding: 1rem;
  color: white;
  text-decoration: none;
  font-family: "regular";
  border-radius: 10px;
}
</style>
