<template>
  <div class="shop-area custom-shop-area pt-95 pb-100">
    <div class="container custom-container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="product-details-content">
            <h2><span class="title">user/email ID: </span> {{ email.id }}</h2>
            <div class="product-price">
              <span class="new">{{ email.fullname }}</span>
              <span class="title">{{ email.email }}</span>
            </div>
            <p>{{ email.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="shop-area pt-95 pb-100">
    <div class="container">
      <div class="row">
        <div class="custom-row-wrap">
          <p>Place The Subject (Will appear at the top. Place a good hook)</p>
          <textarea
            class="custom-edit-input"
            :value="email_subject"
            @input="updateEmailSubject($event.target.value)"
          />

          <p>Place The Body Message</p>

          <textarea
            class="custom-edit-input"
            :value="email_message"
            min="0"
            @input="updateEmailMessage($event.target.value)"
          />

          <p>Place Image URL (will appear as an attachment)</p>

          <input class="custom-edit-input" placeholder="URL goes here" />
        </div>
        <div class="product-list-action-left">
          <a
            class="addtocart-btn"
            href="#"
            title="Redirects to replying section"
          >
            <i class="ion-bag"></i>
            Quick reply
          </a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <h1>Appearence (Phone lock screen and Gmail app)</h1>
        <h4>Attachments are not icnluded</h4>
        <div class="email-wrap">
          <div class="avatar-section">
            <div class="email-avatar">
              <img
                src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png"
                alt=""
              />
            </div>
          </div>

          <div class="body-section">
            <h4 class="email-header">EmpireTCG.com</h4>
            <h4 class="email-subject">{{ email_subject }}</h4>
            <p class="email-message">{{ email_message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["email"],
  data() {
    return {
      email_subject: "",
      email_message: "",
    };
  },
  methods: {
    updateEmailSubject(newValue) {
      return (this.email_subject = newValue);
    },
    updateEmailMessage(newValue) {
      return (this.email_message = newValue);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/responsive.css";

.custom-container {
  display: flex;
  justify-content: center;
}

.col-lg-6 {
  width: 100%;
}

h2 {
  font-weight: 400;
  margin-bottom: 30px;
}

.title {
  font-weight: 600;
}

.product-list-action-left {
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  justify-content: center;
}

.product-list-action-left a {
  text-decoration: none;
}

.email-wrap {
  display: flex;
  width: 100%;
}

.avatar-section {
  justify-content: center;
  margin-right: 10px;
}

.email-avatar img {
  width: 50px;
  height: 40px;
  opacity: 0.4;
}

.body-section h4 {
  font-size: 20px;
  font-weight: bold;
}

.row h1 {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 40px;
  font-size: 30px;
}

.row h4 {
  display: flex;
  justify-content: center;
}

.row .email-wrap {
  display: flex;
  justify-content: flex-start;
}
</style>
