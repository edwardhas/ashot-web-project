<template>
  <div class="container">
    <form>
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>

      <!-- Used to display form errors. -->
      <div id="card-errors" role="alert"></div>

      <button type="submit">Pay</button>
    </form>
  </div>
</template>

<script>
import store from "../store/index";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "checkoutPage",
  data() {
    return {
      cartItems: [],
      stripe: null,
      elements: null,
      card: null,
    };
  },
  mounted() {
    // Check if Stripe.js is already loaded
    if (!window.Stripe) {
      // Load Stripe.js if not already loaded
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.async = true;
      script.onload = () => {
        this.initializeStripe(); // Initialize Stripe after the script is loaded
      };
      document.head.appendChild(script);
    } else {
      this.initializeStripe(); // Initialize Stripe if it's already loaded
    }
  },

  async created() {
    // Getting Cart Items

    const response = await axios.get(`/api/users/${store.state.user.id}/cart`);
    const cartItems = response.data;
    this.cartItems = cartItems;

    // Stripe section
    const stripe = await loadStripe(
      "pk_test_51PYwiSRqy7S2QG3uV7ey7QqsvqBcQ2NSENraON2BlBJZxmcS1JNzWFTuhmVDIxS7Ueri65eeU4C05HFl8cHonYiN00aTgLcsk9"
    );

    const body = {
      cartItems: this.cartItems,
    };

    const session_response = await axios.post(
      "/api/create-checkout-session",
      body
    );
    const session = response.data;
  },
  methods: {
    initializeStripe() {
      // Initialize Stripe with your publishable key
      this.stripe = window.Stripe(
        "pk_test_51PYwiSRqy7S2QG3uFvutnATahFAikR7lkfRBRDXTK0QG7Xj1tSFxSxeZcO7ivmLlwRycqlrwtCIhlWYBTib5teRW00HqNqHw84"
      );
      this.elements = this.stripe.elements();

      // Create an instance of the card Element with customized styles
      this.card = this.elements.create("card", {
        style: {
          base: {
            color: "#000",
            fontFamily: '"Roboto", sans-serif',
            fontSize: "14px",
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "#9B9B9B",
            },
            ":-webkit-autofill": {
              color: "#000",
            },
          },
          invalid: {
            color: "#E53E3E",
            iconColor: "#E53E3E",
          },
        },
      });

      // Mount the card Element into the `card-element` div
      this.card.mount("#card-element");
    },
  },
};
</script>

<style scoped></style>
