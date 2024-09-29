<template>
  <div class="checkout">
    <h1>Checkout Page</h1>

    <div v-for="product in products" :key="product.id" class="product">
      <img :src="product.image" alt="product" />
      <h2>{{ product.name }}</h2>
      <p>Price: ${{ product.price }}</p>
      <label
        >Quantity:
        <input type="number" v-model="product.quantity" min="1" />
      </label>
    </div>

    <button @click="handleCheckout">Proceed to Checkout</button>
  </div>
</template>

<script>
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "T-shirt",
          price: 20,
          quantity: 1,
          image:
            "https://i5.walmartimages.com/seo/Verizon-Apple-iPhone-15-Pro-Max-512GB-Black-Titanium_a3275625-c7df-46d9-8752-98e1fa80e8f5.9dd3f30e48bfc773185548e93b664763.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        },
        {
          id: 2,
          name: "Hat",
          price: 15,
          quantity: 1,
          image:
            "https://media.wired.com/photos/6508bcf4f60ed7f4e17ab7d0/1:1/w_1234,h_1234,c_limit/iPhone-15-Review-Featured-Gear.jpg",
        },
      ],
    };
  },
  methods: {
    async handleCheckout() {
      try {
        const stripe = await loadStripe(
          "pk_test_51PYwiSRqy7S2QG3uV7ey7QqsvqBcQ2NSENraON2BlBJZxmcS1JNzWFTuhmVDIxS7Ueri65eeU4C05HFl8cHonYiN00aTgLcsk9"
        );

        const { data } = await axios.post(
          "https://localhost:8000/api/create-checkout-session",
          {
            products: this.products,
          }
        );

        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) {
          console.error(result.error.message);
        }
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    },
  },
};
</script>

<style scoped>
.checkout {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.product img {
  width: 150px;
  height: 150px;
}

button {
  background-color: #6772e5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #5469d4;
}
</style>
