<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Login</h2>
        <ul>
          <li class="active wow shake">Welcome Back Empire member!</li>
        </ul>
      </div>
    </div>
  </div>

  <ValidationComponentVue
    :page="page"
    :message="message"
    :status="status"
    :isDisplayed="isDisplayed"
  />

  <div class="login-register-area pt-95 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-md-12 ml-auto mr-auto mx-auto">
          <div class="login-register-wrapper">
            <div class="login-register-tab-list nav">
              <a class="active" data-toggle="tab">
                <h4>login</h4>
              </a>
              <a data-toggle="tab">
                <router-link :to="{ name: 'register' }">
                  <h4>register</h4>
                </router-link>
              </a>
            </div>
            <div class="tab-content">
              <div id="lg1" class="tab-pane active mx-auto">
                <div class="login-form-container">
                  <div class="login-register-form">
                    <form method="post" @submit.prevent="sendForm">
                      <input
                        type="text"
                        v-model="email"
                        name="user-email"
                        placeholder="Email"
                      />
                      <input
                        type="password"
                        v-model="password"
                        name="user-password"
                        placeholder="Password"
                      />
                      <div class="button-box">
                        <div class="login-toggle-btn">
                          <!-- <input type="checkbox" />
                          <label>Remember me</label> -->
                          <router-link :to="{ name: 'recover' }">
                            <a>Forgot Password?</a>
                          </router-link>
                        </div>
                        <button type="submit">
                          <span>Login</span>
                        </button>
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
import ValidationComponentVue from "../components/ValidationComponent.vue";
import axios from "axios";
import store from "../store/index";

export default {
  name: "LoginPage",
  components: { ValidationComponentVue },
  data() {
    return {
      email: "",
      password: "",
      message: "",
      page: "Login",
      status: false,
      isDisplayed: false,
    };
  },
  methods: {
    async sendForm() {
      store.commit("logout");
      const userData = {
        userEmail: this.email,
        userPassword: this.password,
      };

      const response = await axios.post("/api/users/get", userData);
      const message = response.data.message;
      const errorMessage = response.data.error;
      const { token, user } = response.data;
      store.commit("setToken", token);
      store.commit("setUser", user);
      // console.log(`This is the console log: ${message}`);
      // console.log(`This is the console log: ${errorMessage}`);

      this.email = "";
      this.password = "";
      if (message == undefined)
        return (
          (this.message = errorMessage),
          (this.status = false),
          (this.isDisplayed = true)
        );

      return (
        (this.message = message),
        (this.status = true),
        (this.isDisplayed = true)
      );
    },
  },
};
</script>

<style scoped>
.breadcrumb-area {
  position: relative;
  width: 100%;
  aspect-ratio: 9/2;
  overflow: hidden; /* Ensure no overflow from pseudo-element */
  background-size: cover;
  background-position: center;
}

.breadcrumb-area::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://www.empire-tcg.com/cdn/shop/files/IMG_2920.jpg?v=1723960927&width=3840");
  background-size: cover;
  background-position: center;
  filter: brightness(50%);
  z-index: -1; /* Place behind the content */
  animation: zoom-in-out 40s infinite;
}

.breadcrumb-content {
  position: relative;
  color: white; /* Ensure text is visible */
  text-align: center;
}

@keyframes zoom-in-out {
  0% {
    background-size: 100%; /* Initial size */
  }
  50% {
    background-size: 120%; /* Zoom in at the halfway point */
  }
  100% {
    background-size: 100%; /* Zoom out back to original size */
  }
}

.login-register-tab-list a {
  cursor: pointer;
  text-decoration: none;
}
</style>
