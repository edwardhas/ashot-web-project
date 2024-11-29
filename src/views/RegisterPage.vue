<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Register</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li><a href="">home</a></li>
          </router-link>

          <li class="active">Register</li>
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
              <a data-toggle="tab">
                <router-link :to="{ name: 'login' }">
                  <h4>login</h4>
                </router-link>
              </a>
              <a class="active" data-toggle="tab">
                <h4>register</h4>
              </a>
            </div>
            <div class="tab-content">
              <div id="lg1" class="tab-pane"></div>
              <div id="lg2" class="tab-pane active">
                <div class="login-form-container">
                  <div class="login-register-form">
                    <form method="post" @submit.prevent="sendForm">
                      <input
                        type="text"
                        name="user-name"
                        placeholder="First Name"
                        required
                        v-model="firstName"
                      />
                      <input
                        type="text"
                        name="user-lastname"
                        placeholder="Last Name"
                        required
                        v-model="lastName"
                      />

                      <input
                        name="user-email"
                        placeholder="Email"
                        type="email"
                        required
                        v-model="email"
                      />

                      <input
                        name="user-phone"
                        placeholder="Phone"
                        type="text"
                        required
                        maxlength="14"
                        v-model="phone"
                        @input="formatPhone"
                      />

                      <input
                        type="password"
                        name="user-password"
                        placeholder="Password"
                        required
                        v-model="password"
                      />

                      <div
                        id="my-account-1"
                        class="panel-collapse collapse show"
                      >
                        <div class="panel-body">
                          <div class="billing-information-wrapper">
                            <div class="account-info-wrapper">
                              <h4>Shipping Address Information</h4>
                              <!-- <h5>Your Personal Details</h5> -->
                            </div>
                            <div class="row">
                              <div class="col-lg-12 col-md-12">
                                <div class="billing-info">
                                  <label>STREET</label>
                                  <input
                                    type="text"
                                    v-model="shippingAddress.street"
                                  />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="billing-info">
                                  <label>CITY</label>
                                  <input
                                    type="text"
                                    v-model="shippingAddress.city"
                                  />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="billing-info">
                                  <label>STATE</label>
                                  <input
                                    type="text"
                                    v-model="shippingAddress.state"
                                  />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <div class="billing-info">
                                  <label>ZIP</label>
                                  <input
                                    type="number"
                                    v-model="shippingAddress.zip"
                                  />
                                </div>
                              </div>

                              <div class="col-lg-6 col-md-6"></div>
                            </div>
                            <div class="billing-back-btn"></div>
                          </div>
                        </div>
                      </div>

                      <div class="button-box">
                        <button type="submit">
                          <span>Register</span>
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
// import { registerUser } from "../db_queries";
import axios from "axios";
import ValidationComponentVue from "../components/ValidationComponent.vue";
import { useAuthStore } from "@/store/authStore";

export default {
  name: "registerPage",
  components: { ValidationComponentVue },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      formattedPhone: "",
      password: "",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      message: "",
      page: "Register",
      status: false,
      isDisplayed: false,
    };
  },
  methods: {
    async sendForm() {
      const authStore = useAuthStore();
      authStore.logout();

      const userData = {
        userName: this.firstName,
        userLastName: this.lastName,
        userEmail: this.email,
        userPhone: this.phone,
        userPassword: this.password,
        shippingAddress: this.shippingAddress,
      };

      const response = await axios.post("/api/register", userData);
      const success = response.data.success;
      const { token, user } = response.data;

      this.name = "";
      this.email = "";
      this.password = "";
      this.shippingAddress.userStreet = "";
      this.shippingAddress.userCity = "";
      this.shippingAddress.userState = "";
      this.shippingAddress.userZip = "";

      success == undefined || null
        ? ((this.message = response.data.error),
          (this.status = false),
          (this.isDisplayed = true))
        : ((this.message = success),
          (this.status = false),
          (this.isDisplayed = true),
          authStore.setToken(token),
          authStore.setUser(user));

      // if (message == undefined)
      //   return (
      //     (this.message = errorMessage),
      //     (this.status = false),
      //     (this.isDisplayed = true)
      //   );

      // return (
      //   (this.message = message),
      //   (this.status = true),
      //   (this.isDisplayed = true),
      //   authStore.setToken(token),
      //   authStore.setUser(user)
      // );
    },
    formatPhone() {
      // Remove all non-digit characters
      const cleaned = this.phone.replace(/\D/g, "");

      // Match and format the phone number
      if (cleaned.length <= 10) {
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

        if (match) {
          let formatted = "";
          if (match[1]) formatted = `(${match[1]}`;
          if (match[2]) formatted += `)-${match[2]}`;
          if (match[3]) formatted += `-${match[3]}`;
          this.phone = formatted; // Update input with formatted value
        }
      }
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.login-register-tab-list a {
  cursor: pointer;
  text-decoration: none;
}
</style>
