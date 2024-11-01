<template>
  <div id="chat-app" class="container py-4">
    <div class="card shadow-lg chat-container">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Pokibot room</h5>
      </div>
      <div class="card-body chat-body">
        <div class="chat-messages">
          <!-- Example Messages -->
          <div class="message mb-2 d-flex flex-row" v-if="userMessage">
            <div class="message-avatar me-2">
              <img
                src="../assets/img/about-us/ashot-avatar.jpg"
                class="rounded-circle"
                alt="Ashot"
              />
            </div>
            <div class="message-content">
              <div class="message-username text-primary fw-bold">Ashot</div>
              <div class="message-text">{{ userMessage }}</div>
            </div>
          </div>
          <div class="message mb-2 d-flex flex-row-reverse" v-if="botResponse">
            <div class="message-avatar ms-2">
              <img
                src="https://dspncdn.com/a1/media/692x/84/b5/f6/84b5f68fec23cf7aa769f40280eef3b6.jpg"
                class="rounded-circle"
                alt="User 2"
              />
            </div>
            <div class="message-content">
              <div class="message-username text-success fw-bold text-end">
                Pokibot
              </div>
              <div class="message-text text-end">
                {{ botResponse }}
              </div>
            </div>
          </div>
          <!-- Add more messages dynamically here -->
        </div>
      </div>
      <div class="card-footer bg-light">
        <div class="input-group">
          <el-input
            v-model="userMessage"
            style="max-width: 600px"
            placeholder="Enter message..."
            class="input-with-select"
            @keyup.enter="sendGPTRequest"
          >
            <template #append>
              <el-button :icon="Search" @click="sendGPTRequest" />
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

let botResponse = ref("");
let userMessage = ref("");
let isMessageSent = ref(false);
let isMessageReceived = ref(false);

const sendGPTRequest = async () => {
  try {
    const response = await axios.post("/api/openAI/answer", {
      question: userMessage,
    });

    if (response.data.answer) {
      return (
        (botResponse.value = response.data.answer),
        (isMessageSent.value = true),
        (isMessageReceived.value = true)
      );
    }
    botResponse.value =
      response.data.error || "Error occured during proccessing the request";
    isMessageSent.value = true;
    isMessageReceived.value = true;
  } catch (e) {
    throw e;
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: auto;
  height: 70vh;
}

.chat-body {
  height: 400px;
  overflow-y: auto;
}

.input-with-select {
  height: 2.5rem;
}

.chat-messages {
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  align-items: center;
}

.message-avatar img {
  width: 40px;
  height: 40px;
}

.message-content {
  max-width: 70%;
}

.message-username {
  font-size: 0.9rem;
}

.message-text {
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 8px 12px;
  margin-top: 4px;
}

.message-content.message-from-user .message-text {
  background-color: #d1e7ff;
}

.card-footer .input-group .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.card-footer .input-group .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
