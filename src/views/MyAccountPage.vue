<template>
  <Header />

  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>my account</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li class="text-white"><a>home</a></li>
          </router-link>

          <li class="active">my account</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="my-account-area pt-100 pb-70">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="checkout-wrapper">
            <div id="faq" class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                    <span>1</span>
                    <a data-toggle="collapse" data-parent="#faq"
                      >Your account information
                    </a>
                  </h5>
                </div>
                <div id="my-account-1" class="panel-collapse collapse show">
                  <div class="panel-body">
                    <div class="billing-information-wrapper">
                      <div class="account-info-wrapper">
                        <h4>My Account Information</h4>
                        <h5>Your Personal Details</h5>
                      </div>
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="billing-info">
                            <label>First Name</label>
                            <input type="text" v-model="firstname" disabled />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="billing-info">
                            <label>Last Name</label>
                            <input type="text" v-model="lastname" disabled />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="billing-info">
                            <label>Email Address</label>
                            <input type="email" v-model="email" disabled />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <!-- <div class="billing-info">
                            <label>Telephone</label>
                            <input type="text" placeholder="PHONE" />
                          </div> -->
                        </div>
                        <!-- <div class="col-lg-6 col-md-6">
                          <div class="billing-info">
                            <label>Fax</label>
                            <input type="text" />
                          </div>
                        </div> -->
                      </div>
                      <div class="billing-back-btn">
                        <!-- <div class="billing-back">
                          <a href="#"><i class="ti-arrow-up"></i> back</a>
                        </div> -->
                        <!-- <div class="billing-btn">
                          <button type="submit">Continue</button>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                    <span>2</span>
                    <a data-toggle="collapse" data-parent="#faq"
                      >Change your password
                    </a>
                  </h5>
                </div>
                <div id="my-account-2" class="panel-collapse">
                  <div class="panel-body">
                    <div class="billing-information-wrapper">
                      <div class="account-info-wrapper">
                        <h4>Change Password</h4>
                        <h5>Your Password</h5>
                      </div>
                      <div class="row">
                        <div class="col-lg-12 col-md-12">
                          <div class="billing-info">
                            <label>Password</label>
                            <input type="password" />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="billing-info">
                            <label>Password Confirm</label>
                            <input type="password" />
                          </div>
                        </div>
                        <div class="entries-edit-delete text-center">
                          <a class="edit">Change</a>
                        </div>
                      </div>
                      <div class="billing-back-btn">
                        <!-- <div class="billing-back">
                          <a href="#"><i class="ti-arrow-up"></i> back</a>
                        </div> -->
                        <!-- <div class="billing-btn">
                          <button type="submit">Continue</button>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                    <span>3</span>
                    <a data-toggle="collapse" data-parent="#faq"
                      >Modify your address
                    </a>
                  </h5>
                </div>
                <div id="my-account-3" class="panel-collapse">
                  <div class="panel-body">
                    <div class="billing-information-wrapper">
                      <div class="account-info-wrapper">
                        <h4>Address</h4>
                      </div>
                      <div class="entries-wrapper">
                        <div class="row">
                          <div
                            class="col-lg-6 col-md-6 d-flex align-items-center justify-content-center"
                          >
                            <div class="entries-info text-center">
                              <p>{{ firstname }}</p>
                              <p>
                                {{ shippingAddress.street }},
                                {{ shippingAddress.city }},
                                {{ shippingAddress.state }},
                                {{ shippingAddress.zip }}
                              </p>
                            </div>
                          </div>
                          <div
                            class="col-lg-6 col-md-6 d-flex align-items-center justify-content-center"
                          >
                            <div class="entries-edit-delete text-center">
                              <a class="edit">Edit</a>
                              <a class="delete">Delete</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="billing-back-btn">
                        <!-- <div class="billing-back">
                          <a href="#"><i class="ti-arrow-up"></i> back</a>
                        </div> -->
                        <!-- <div class="billing-btn">
                          <button type="submit">Continue</button>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel panel-default custom-btn-logout">
                <div class="product-list-action-left">
                  <a
                    class="addtocart-btn"
                    title="Add to cart"
                    @click="logoutHandler"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { useAuthStore } from "@/store/authStore";

export default {
  name: "MyAccountPage",
  data() {
    return {
      firstname: useAuthStore().user.username,
      lastname: useAuthStore().user.userlastname,
      email: useAuthStore().user.email,
      shippingAddress: useAuthStore().user.shippingAddress,
    };
  },
  components: { Header, Footer },
  methods: {
    logoutHandler() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push({ name: "login" });
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

#my-account-1 input {
  cursor: not-allowed;
}

.custom-btn-logout {
  margin-top: 100px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.addtocart-btn {
  cursor: pointer;
  text-decoration: none;
}

.edit {
  cursor: pointer;
  text-decoration: none;
}

.delete {
  cursor: pointer;
  text-decoration: none;
}
</style>
