<template>
  <div class="forgetpassword">
    <div class="form">
      <div class="logo">
        <img src="../../../assets/photos/logo.png" alt="" />
        <h4>هل نسيت كلمة المرور ؟</h4>
      </div>
      <form @submit.prevent>
        <label for="email">أدخل البريد الألكتروني</label>
        <div class="input">
          <input
            type="email"
            id="email"
            placeholder="أدخل البريد الألكتروني"
            required
          />
        </div>
        <div class="bnt">
          <button type="submit">أرسال</button>
        </div>
      </form>
    </div>
    <div class="img">
      <img
        src="../../../assets/photos/25970f11-d221-4360-9f43-e344cc90260d_2000x2000.jpg"
        alt="Forgot Password Image"
      />
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/auth/AuthStore";

export default {
  name: "ForgetPassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async submitEmail() {
      const authStore = useAuthStore();
      await authStore.submitPasswordResetEmail(this.email);
    },
  },
};
</script>
