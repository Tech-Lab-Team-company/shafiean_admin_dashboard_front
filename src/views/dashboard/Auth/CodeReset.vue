<template>
  <form @submit.prevent="validateCodes" class="Codepage">
    <div class="content">
      <img src="../../../assets/photos/logo.png" alt="" />

      <h3>أدخل الكود المرسل</h3>
      <div class="input-group mb-3">
        <input
          v-model="code"
          type="text"
          class="form-control"
          placeholder="Enter code"
          maxlength="6"
          required
        />
      </div>
      <button type="submit" class="btn">استرجاع كلمة المرور</button>
      <div class="image-container">
        <img
          src="@/assets/photos/password-reset-vector-52497884.jpg"
          alt="Password Reset"
          class="img-fluid"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { useAuthStore } from "@/stores/auth/AuthStore";
export default {
  name: "CodeReset",
  data() {
    return {
      code: "",
    };
  },
  methods: {
    validateCode() {
      if (this.code.length === 6) {
        this.$router.push("/ResetPassword");
      } else {
        alert("Please enter a valid 6-digit code.");
      }
    },
    async validateCodes() {
      const authStore = useAuthStore();
      await authStore.validateCode(this.code);
    },
  },
};
</script>
