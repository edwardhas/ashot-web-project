<template>
  <div v-if="product">
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
};
</script>

<style></style>
