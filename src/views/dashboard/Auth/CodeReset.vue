<template>
  <form action="" class="Codepage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4" id="codes">
          <h3>Enter Your Code To Reset Password</h3>

          <input type="number" class="form-control" placeholder="code" />
          <router-link to="/ResetPassword">
            <button type="submit">Reset Password</button>
          </router-link>
        </div>

        <div class="col-md-8">
          <img
            src="@/assets/photos/password-reset-vector-52497884.jpg"
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
  name: "CodeReset",
  data() {
    return {
      value: null,
    };
  },
};
</script>

<style></style>
