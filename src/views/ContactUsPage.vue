<template>
  <Header />

  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Contact Us</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li><a href="">home</a></li>
          </router-link>

          <li class="active">Contact Us</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="contact-area pt-100 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12">
          <div class="contact-info-wrapper text-center mb-30">
            <div class="contact-info-icon">
              <i class="ti-location-pin"></i>
            </div>
            <div class="contact-info-content">
              <h4>Our Location</h4>
              <p>Street</p>
              <p>
                <a
                  href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                  target="_blank"
                  >info@example.com</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-12">
          <div class="contact-info-wrapper text-center mb-30">
            <div class="contact-info-icon">
              <i class="ti-mobile"></i>
            </div>
            <div class="contact-info-content">
              <h4>Contact us Anytime</h4>
              <p>Mobile: 012 345 678</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-12">
          <div class="contact-info-wrapper text-center mb-30">
            <div class="contact-info-icon">
              <i class="ti-email"></i>
            </div>
            <div class="contact-info-content">
              <h4>Write Some Words</h4>
              <p>
                <a
                  href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                  target="_blank"
                  >Support24/7@example.com
                </a>
              </p>
              <p>
                <a
                  href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                  target="_blank"
                  >info@example.com</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="contact-message-wrapper">
            <h4 class="contact-title">GET IN TOUCH</h4>
            <div class="contact-message">
              <form id="contact-form" method="post">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="contact-form-style mb-20">
                      <input
                        name="name"
                        placeholder="Full Name"
                        type="text"
                        v-model="fullname"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="contact-form-style mb-20">
                      <input
                        name="email"
                        placeholder="Email Address"
                        type="email"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="contact-form-style mb-20">
                      <input
                        name="subject"
                        placeholder="Subject"
                        type="text"
                        v-model="subject"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="contact-form-style">
                      <textarea
                        name="message"
                        placeholder="Message"
                        v-model="message"
                      ></textarea>
                      <a
                        @click="sendForm"
                        class="submit btn-style"
                        type="submit"
                      >
                        SEND MESSAGE
                      </a>
                    </div>
                  </div>
                </div>
              </form>
              <p class="form-messege"></p>
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
import axios from "axios";
import store from "../store/index";

export default {
  components: { Header, Footer },
  data() {
    return {
      fullname: "",
      email: "",
      subject: "",
      message: "",

      server_message: "",
    };
  },
  methods: {
    async sendForm() {
      const data = {
        fullname: this.fullname,
        email: this.email,
        subject: this.subject,
        message: this.message,
      };
      const response = await axios.post(
        `/api/${store.state.user.id}/contact-us`,
        data
      );
      const error = response.data.error;
      const success = response.data.success;
      if (success) this.server_message = success;
      this.server_message = error;
      console.log(this.server_message);
      this.fullname = "";
      this.email = "";
      this.subject = "";
      this.message = "";
    },
  },
};
</script>

<style scoped>
.breadcrumb-area {
  background-image: url("../assets/img/banner/banner-2.jpg");
}

textarea {
  resize: none;
}

.contact-form-style a {
  text-decoration: none;
}
</style>
