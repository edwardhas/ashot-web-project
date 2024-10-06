<template>
  <div
    class="alert"
    :style="[toggleDisplay]"
    :class="[status ? 'alert-success' : 'alert-danger']"
  >
    <strong>{{ status == true ? "Success! " : "Error! " }}</strong>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "validationComponent",
  props: ["page", "status", "message", "isDisplayed"],
  computed: {
    toggleDisplay() {
      return this.isDisplayed ? { display: "flex" } : { display: "none" };
    },
  },
  watch: {
    status(newValue) {
      if (newValue === true) {
        this.handleRedirect();
      }
    },
  },
  methods: {
    handleRedirect() {
      setTimeout(() => {
        if (this.page == "Login" || this.page == "Register")
          return this.$router.push("/");
        return this.$router.push("/admin/panel");
      }, 2000);
    },
  },
};
</script>

<style>
.alert {
  display: flex;
  justify-content: center;
}
</style>
