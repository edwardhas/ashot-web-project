<template>
  <Header />

  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Recover</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li><a>home</a></li>
          </router-link>

          <li class="active">Recover</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="login-register-area pt-95 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-md-12 ml-auto mr-auto mx-auto">
          <div class="login-register-wrapper">
            <div class="login-register-tab-list nav">
              <a class="active" data-toggle="tab">
                <h4>Forget Password</h4>
              </a>
            </div>
            <div class="tab-content">
              <div id="lg1" class="tab-pane"></div>
              <div id="lg2" class="tab-pane active">
                <div class="login-form-container">
                  <div class="login-register-form">
                    <form method="post">
                      <input
                        name="user-email"
                        placeholder="Email"
                        type="email"
                      />
                      <span class="custom-span"
                        >We send you an email with a new password</span
                      >
                      <div class="button-box">
                        <button type="submit"><span>Send Email</span></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: { Header },
};
</script>

<style scoped>
.breadcrumb-area {
  background-image: url(../assets/img/banner/banner-2.jpg);
}

.login-register-tab-list a {
  cursor: default;
  text-decoration: none;
}

.button-box {
  margin-top: 20px;
}
</style>
