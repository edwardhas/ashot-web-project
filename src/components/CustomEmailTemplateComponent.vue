<template>
  <div class="contact-area pt-100 pb-100">
    <div class="container">
      <div class="row"></div>
      <div class="row">
        <div class="col-12">
          <div class="contact-message-wrapper">
            <h4 class="contact-title">SEND AN EMAIL WITH A CUSTOM TEMPLATE</h4>
            <div class="contact-message">
              <form id="contact-form" method="post">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="contact-form-style mb-20">
                      <input
                        name="name"
                        placeholder="Subject"
                        type="text"
                        v-model="fullname"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <el-input
                      disabled
                      placeholder="edward885788@gmail.com"
                      style="height: 45px"
                      :suffix-icon="CircleCloseFilled"
                    />
                  </div>
                  <div class="col-lg-12">
                    <div class="contact-form-style mb-20">
                      <input
                        name="receiver"
                        placeholder="To whom"
                        type="text"
                        v-model="receiverEmail"
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
                      <div class="el-column-wrapper" style="margin-top: 10px">
                        <el-dropdown round>
                          <el-button type="primary">
                            Send to all users<el-icon class="el-icon--right"
                              ><arrow-down
                            /></el-icon>
                          </el-button>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <el-dropdown-item>Yes</el-dropdown-item>
                              <el-dropdown-item>No</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>

                      <a
                        @click="sendForm"
                        class="submit btn-style"
                        type="submit"
                        style="text-decoration: none; margin-top: 50px"
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
    <div class="container">
      <div class="html-editor">
        <!-- Textarea for editing HTML code -->
        <el-input
          v-model="htmlContent"
          placeholder="Type your HTML here..."
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 300 }"
        ></el-input>

        <!-- iframe for live preview of the HTML -->
        <iframe :srcdoc="htmlContent" class="preview"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { ref, computed, onMounted } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import axios from "axios";

const receiverEmail = ref("");
const userEmails = ref([]);

// const htmlContent = computed(
//   () =>
//     `
//   <h1>Hello, User!</h1>
//   <p>Edit this HTML to see live updates!</p>
//   `
// );
const htmlContent = ref(
  `
  <style>
    /* General styling for the email container */
    .email-body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background-color: #fff0d5; /* Light yellow background */
      color: #333;
    }

    /* Container for the content */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
    }

    /* Logo styling */
    .logo {
      text-align: center;
      padding: 20px 0;
    }

    .logo img {
      max-height: 60px;
    }

    /* Header section */
    .header {
      background-color: #fff0d5;
      text-align: center;
      padding: 30px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: normal;
      color: #5a3a1e;
    }

    .header h2 {
      margin: 10px 0 20px;
      font-size: 28px;
      font-weight: bold;
      color: #000;
    }

    .header p {
      margin: 10px 0;
      font-size: 16px;
      color: #333;
    }

    /* Button styling */
    .button-container {
      text-align: center;
    }


    .button {
      display: inline-block;
      background-color: #7e4c4f;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
    }


    /* Footer styling */
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888;
    }
  </style>

<body>
   <div class="email-body">
  <table class="email-container" width="100%" border="0" cellspacing="0" cellpadding="0">
    <!-- Logo Section -->
    <tr>
      <td class="logo">
        <img src="../assets/img/logo/logo-title-empire-tcg-removebg-preview.png">
      </td>
    </tr>

    <!-- Header Section -->
    <tr>
      <td class="header">
        <h1>Catch 'Em All!</h1>
        <h2>Your Ultimate Pokémon Card Destination</h2>
        <p>Explore rare finds, build your dream collection, and relive the nostalgia. Adventure awaits!</p>
        <div class="button-container">
          <a href="https://ashotwebsite.com" class="button">Shop Now</a>
        </div>
      </td>
    </tr>

    <!-- Footer Section -->
    <tr>
      <td class="footer">
        © 2024 Empire-TCG, Inc. All Rights Reserved.
      </td>
    </tr>
  </table>
  <div/>

</body>
  `
);

onMounted(async () => {
  const response = await axios.get("/api/get-users-email");
  userEmails.value = response.data;
});
</script>

<style scoped>
.html-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

textarea {
  width: 100%;
  height: 200px;
  padding: 10px;
  font-family: monospace;
}

.preview {
  width: 100%;
  min-height: 600px;
  max-height: 100vh;
  border: 1px solid #ddd;
}
</style>
