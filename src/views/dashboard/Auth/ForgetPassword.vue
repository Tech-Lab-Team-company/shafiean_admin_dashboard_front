<template>
  <form action="" class="formforget">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <h3>Forget Your Password</h3>
          <input type="email" class="form-control" placeholder="email adrees" />
          <router-link to="/Code">
            <button type="submit">Reset Password</button>
          </router-link>
        </div>

        <div class="col-md-8" id="forgetimg">
          <img
            src="@/assets/photos/25970f11-d221-4360-9f43-e344cc90260d_2000x2000.jpg"
            alt=""
            width="60%"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ForgetPasswordPage",
};
</script>

<style></style>
