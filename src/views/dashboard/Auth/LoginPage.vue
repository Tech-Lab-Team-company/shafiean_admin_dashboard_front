<template>
  <form action="">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4" id="forgetPass">
          <div ref="lottieContainer"></div>
          <h2>New Here</h2>
          <p>
            How To recover Your Password and <br />
            Reset it
          </p>
          <router-link to="/forget-password">
            <button>Forget Password</button>
          </router-link>
        </div>

        <div class="col-md-8">
          <div class="login">
            <h2>Login To Your Account</h2>
            <input
              type="email"
              v-model="email"
              placeholder="Enter Your Email or Phone"
              class="form-control"
            />
            <div>
              <input
                :type="passwordType"
                placeholder="Enter your password"
                class="form-control"
                v-model="password"
              />
              <i class="fa-solid fa-lock" @click="togglePasswordVisibility"></i>
            </div>
            <button @click="blockAlert" class="login-btn">دخول</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Swal from "sweetalert2";
import lottie from "lottie-web";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      passwordType: "password",
    };
  },
  props: {
    animationPath: {
      type: String,
      required: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    blockAlert() {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "لقد تمت تسجيل الدخول بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    loadAnimation() {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: "svg",
        loop: this.loop,
        autoplay: this.autoplay,
        path: this.animationPath,
      });
    },
  },
  mounted() {
    this.loadAnimation();
  },
};
</script>

<style scoped></style>
