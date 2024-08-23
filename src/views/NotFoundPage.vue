<template>
  <Header />
  <div class="custom-title-wrap">
    <h1>404: Page Not Found</h1>
    <span></span>
    <h4>please visit existing pages</h4>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "NotFoundPage",
  components: { Header },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.custom-title-wrap {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

h1 {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 3rem;
  color: black;
  padding: 30px;
}

h4 {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 30rem;
}

span {
  width: 50%;
  border: 1px solid black;
  margin: 0 auto;
}
</style>
