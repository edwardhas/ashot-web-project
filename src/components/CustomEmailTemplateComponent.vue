<template>
  <div class="contact-area pt-100 pb-100">
    <div class="container">
      <div class="row"></div>
      <div class="row">
        <div class="col-12">
          <div class="contact-message-wrapper">
            <h4 class="contact-title">CREATE CUSTOM EMAIL TEMPLATE</h4>
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
import axios from "axios";

const receiverEmail = ref("");

const userEmails = ref([]);

const htmlContent = computed(
  () =>
    `
  <h1>Hello, ${
    userEmails.value.includes(receiverEmail.value)
      ? receiverEmail.value
      : "RECEIVER UNDEFINED"
  }!</h1>
  <p>Edit this HTML to see live updates!</p>
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
