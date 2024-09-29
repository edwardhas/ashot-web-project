<template>
  <div class="container">
    <el-result icon="success"></el-result>
    <h2>Payment Done!</h2>
    <p>
      Thank you for completing your secure online payment. You can click the
      button below to go back to the homepage.
    </p>
  </div>
  <router-link :to="{ path: '/' }">
    <el-button type="primary" color="#7e4c4f" class="btn" plain>Home</el-button>
  </router-link>
</template>

<script>
export default {
  name: "PaymentSuccess",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 200px;
}

h1 {
  font-size: 7.5em;
  margin: 15px 0px;
  font-weight: bold;
}
h2 {
  font-weight: bold;
  margin-top: 20px;
}

p {
  margin-top: 20px;
}

button {
  display: flex;
  margin: 0 auto;
  margin-top: 40px;
  width: 100px;
  transition: 0.5s;
}

/* this is for router-link which will be converted to an a element */
a {
  text-decoration: none;
}

@media (max-width: 576px) {
  h1 {
    font-size: 4em;
  }
}
</style>
