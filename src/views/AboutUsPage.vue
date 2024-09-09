<template>
  <Header />
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>About Us</h2>
        <ul>
          <router-link :to="{ name: 'products' }"></router-link>
          <li><a href="">home</a></li>
          <li class="active">About Us</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="about-us-area pt-100 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="about-us-img pr-30 wow fadeInLeft">
            <img alt="" src="../assets/img/banner/banner-3.png" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 d-flex align-items-center">
          <div class="about-us-content">
            <h2>About Ashot</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipis elit, sed do
              eiusmod tempor incididu ut labore et dolore magna aliqua. Ut enim
              ad minim quis nostrud exercitat ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <div class="about-us-list">
              <ul>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Culpa, saepe!
                </li>
              </ul>
            </div>
            <div class="about-us-btn">
              <router-link :to="{ name: 'contact-us' }">
                <a class="btn-style">CONTACT US</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="project-count-area pb-70 pt-100 gray-bg">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
          <div class="single-count mb-30 text-center wow flip">
            <h2 class="count wow flip">18</h2>
            <span>Years in Business</span>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
          <div class="single-count mb-30 text-center wow flip">
            <h2 class="count wow flip">290</h2>
            <span>Happy People</span>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
          <div class="single-count mb-30 text-center wow flip">
            <h2 class="count wow flip">24</h2>
            <span>Million Sales</span>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
          <div class="single-count mb-30 text-center wow flip">
            <h2 class="count wow flip">17</h2>
            <span>Award Winning</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="team-ara pt-95 pb-70">
    <div class="container">
      <div class="section-title text-center mb-55">
        <h2>Our Team</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="team-wrapper mb-30">
            <div class="team-img">
              <a>
                <!-- <img src="../assets/img/team/team-1.jpg" alt="" /> -->
                <img src="../assets/img/about-us/ashot.jpg" alt="" />
              </a>
              <div class="team-social">
                <a href="https://facebook.com">
                  <i class="ti-facebook"></i>
                </a>

                <a href="https://twitter.com">
                  <i class="ti-twitter-alt"></i>
                </a>
                <a href="https://instagram.com">
                  <i class="ti-instagram"></i>
                </a>
              </div>
            </div>
            <div class="team-content text-center">
              <h4>Ashot Harutyunyan</h4>
              <span>CEO </span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="team-wrapper mb-30">
            <div class="team-img">
              <a>
                <img src="../assets/img/about-us/marat.jpg" alt="" />
              </a>
              <div class="team-social">
                <a href="https://facebook.com">
                  <i class="ti-facebook"></i>
                </a>

                <a href="https://twitter.com">
                  <i class="ti-twitter-alt"></i>
                </a>
                <a href="https://instagram.com">
                  <i class="ti-instagram"></i>
                </a>
              </div>
            </div>
            <div class="team-content text-center">
              <h4>Marat Hasparian</h4>
              <span>Manager </span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="team-wrapper mb-30">
            <div class="team-img">
              <a>
                <img src="../assets/img/team/team-3.jpg" alt="" />
              </a>
              <div class="team-social">
                <a href="https://facebook.com">
                  <i class="ti-facebook"></i>
                </a>
                <a href="https://twitter.com">
                  <i class="ti-twitter-alt"></i>
                </a>
                <a href="https://instagram.com">
                  <i class="ti-instagram"></i>
                </a>
              </div>
            </div>
            <div class="team-content text-center">
              <h4>Bruce Cole</h4>
              <span>Customer </span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="team-wrapper mb-30">
            <div class="team-img">
              <a>
                <img src="../assets/img/team/team-4.jpg" alt="" />
              </a>
              <div class="team-social">
                <a href="https://facebook.com">
                  <i class="ti-facebook"></i>
                </a>

                <a href="https://twitter.com">
                  <i class="ti-twitter-alt"></i>
                </a>
                <a href="https://instagram.com">
                  <i class="ti-instagram"></i>
                </a>
              </div>
            </div>
            <div class="team-content text-center">
              <h4>Debra Lane</h4>
              <span>Manager </span>
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
export default {
  components: { Header, Footer },
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

.breadcrumb-area a {
  text-decoration: none;
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
.testimonial-area {
  background-image: url(../assets/img/banner/banner-1.jpg);
}
.about-us-btn a {
  text-decoration: none;
  cursor: pointer;
}
</style>
