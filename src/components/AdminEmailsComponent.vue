<template>
  <div class="product-area pt-95 gray-bg">
    <div class="container">
      <div class="section-title text-center mb-55">
        <h2>All emails section</h2>
      </div>
      <div class="row" v-if="emails[0]">
        <!-- <div class="row-xl-3 row-lg-4 row-md-6 row-sm-6">
          <div
            class="above-product-wrapper"
            v-for="email in emails"
            :key="email.id"
          >
            <div
              class="product-wrapper mb-10"
              v-for="eachEmail in email.emails"
              :key="eachEmail.id"
            >
              <div class="product-content">
                <h4>
                  <a>User ID: {{ email.id }}</a>
                </h4>
                <h4>
                  <a>Email ID: {{ eachEmail.id }}</a>
                </h4>
                <div class="product-price email-name-subject">
                  <span class="new"
                    >{{ eachEmail.fullname }} ({{ eachEmail.email }})</span
                  >
                  <span class="new subject">{{ eachEmail.subject }}</span>
                </div>
                <div class="product-price email-message">
                  <span class="new">{{ eachEmail.message }}</span>
                </div>
              </div>
              <div class="submit submit-emails">
                <div class="product-list-action-left">
                  <a
                    class="addtocart-btn"
                    href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                    target="_blank"
                    title="Redirects to gmail.com"
                  >
                    <i class="ion-bag"></i>
                    Manual Reply
                  </a>
                </div>
                <div class="product-list-action-left">
                  <router-link
                    :to="{ path: `/admin/panel/${email.id}/${eachEmail.id}` }"
                  >
                    <a
                      class="addtocart-btn"
                      href="#"
                      title="Redirects to replying section"
                    >
                      <i class="ion-bag"></i>
                      Quick reply
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <el-table :data="emails" height="100%" style="width: 100%">
          <el-table-column prop="id" label="User ID" width="250" />
          <el-table-column prop="fullname" laabel="Full Name">
            <template #default="{ row }">
              <div v-for="(email, index) in row.emails" :key="index">
                <p>{{ email.email }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="Address" />
        </el-table> -->

        <!-- <el-table :data="emails" height="100%" style="width: 100%">
          <el-table-column prop="id" label="User ID" width="250" />

          <el-table-column label="Full Names">
            <template #default="{ row }">
              <div v-for="(email, index) in row.emails" :key="index">
                <p>{{ email.fullname }}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Emails">
            <template #default="{ row }">
              <div v-for="(email, index) in row.emails" :key="index">
                <p>{{ email.email }}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="address" label="Address" />
        </el-table> -->
        <el-table :data="flattenEmails" height="100%" style="width: 100%">
          <el-table-column prop="userName" label="User ID" width="250" />
          <el-table-column prop="fullname" label="Full Name" />
          <el-table-column prop="email" label="Email" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="custom-empty-products-list" v-else>
        <h3>No emails at this moment</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const emails = ref([]);
const totalEmails = ref();

const flattenEmails = computed(() => {
  return emails.value.flatMap((user) =>
    user.emails.map((email) => ({
      id: user.id,
      userName: user.userName,
      userLastName: user.userLastName,
      fullname: email.fullname,
      email: email.email,
      address: user.address,
    }))
  );
});

onMounted(async () => {
  const response = await axios.get("/api/emails");
  const response_emails = response.data.emails;
  const response_emailsTotal = response.data.userEmailsTotal;
  emails.value = response_emails;
  totalEmails.value = response_emailsTotal;
  console.log(emails.value);
});
</script>

<style>
.product-area {
  height: 100vh;
}
</style>
