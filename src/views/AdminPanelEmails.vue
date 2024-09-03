<template>
  <div v-if="email">
    <AdminPageEmailReplyComponentVue :email="email" />
  </div>

  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import AdminPageEmailReplyComponentVue from "@/components/AdminPageEmailReplyComponent.vue";
import NotFoundPage from "./NotFoundPage.vue";
import axios from "axios";

export default {
  components: { NotFoundPage, AdminPageEmailReplyComponentVue },
  data() {
    return {
      email: [],
    };
  },
  async created() {
    const response = await axios.get(
      `/api/emails/${this.$route.params.userId}/${this.$route.params.emailId}`
    );
    const email = response.data;
    this.email = email;
  },
};
</script>

<style></style>
