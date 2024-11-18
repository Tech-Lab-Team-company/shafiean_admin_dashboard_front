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
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          placeholder="ادخل كلمة المرور"
          required
        />
        <span @click="togglePasswordVisibility" class="toggle-password">
          <i v-if="showPassword" class="fa fa-eye"></i>
          <i v-else class="fa fa-eye-slash"></i>
        </span>
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
      showPassword: false,
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
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
<style scoped>
::placeholder {
  color: #999;
  margin-right: 20px;
}
</style>
