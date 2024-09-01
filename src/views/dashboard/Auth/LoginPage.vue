<template>
  <div class="naim-login">
    <form @submit.prevent="login">
      <div class="logo">
        <img src="../../../assets/photos/logo.png" alt="" />
      </div>
      <label for="email">ادخل البريد الألكتروني</label>
      <div class="input">
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="ادخل البريد الألكتروني"
          required
        />
      </div>
      <label for="password">ادخل كلمة المرور</label>
      <div class="input">
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="ادخل كلمة المرور"
          required
        />
      </div>
      <button type="submit">تسجيل الدخول</button>
    </form>
    <div class="forget">
      <router-link to="/forget-password">
        <h6>هل نسيت كلمة المرور؟</h6>
      </router-link>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/auth/AuthStore";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    async login() {
      await this.authStore.login({
        email: this.email,
        password: this.password,
      });

      this.$router.push("/");
    },
  },
};
</script>
