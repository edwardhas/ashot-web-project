<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Cart Page</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li class="text-white"><a>home</a></li>
          </router-link>
          <li class="active">Cart Page</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="cart-main-area pt-95 pb-100" v-if="cartItems[0]">
    <div class="container">
      <h3 class="page-title">Your cart items</h3>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <form action="#">
            <div class="table-content table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Until Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody v-auto-animate>
                  <tr v-for="item in cartItems" :key="item._id">
                    <td class="product-thumbnail">
                      <a><img :src="item.images[0]" alt="" /></a>
                    </td>
                    <td class="product-name">
                      <router-link :to="{ path: `/products/${item._id}` }">
                        <a href="#">{{ item.name }}</a>
                      </router-link>
                    </td>
                    <td class="product-price-cart" v-if="item.oldPrice">
                      <span class="amount">${{ item.oldPrice }}.00</span>
                    </td>
                    <td class="product-quantity">
                      <div class="cart-plus-minus">
                        <input
                          class="cart-plus-minus-box prevent-select"
                          type="text"
                          name="qtybutton"
                          v-model="item.quantity"
                        />
                      </div>
                    </td>
                    <td class="product-subtotal">${{ item.price }}.00</td>
                    <td class="product-remove">
                      <a @click="$emit('remove-from-cart', item._id)"
                        ><i class="ti-trash"></i
                      ></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-shiping-update-wrapper">
                  <div class="cart-shiping-update">
                    <router-link :to="{ path: '/' }">
                      <a>Continue Shopping</a>
                    </router-link>
                  </div>
                  <div class="cart-clear">
                    <a href="">
                      <a>Clear Shopping Cart</a>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="row">
            <div class="col-lg-4 col-md-12">
              <div class="grand-totall">
                <span>Subtotal: ${{ calculateTotal() }}.00</span>
                <h5>Grand Total: ${{ calculateTax(calculateTotal()) }}</h5>

                <a @click="handleCheckout">Proceed To Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="custom-empty-cart" v-else>
    <!-- <div>
      <h2>Your cart is empty</h2>
    </div> -->
    <el-empty
      description="Your cart is empty"
      image="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
    />

    <div class="cart-shiping-update">
      <router-link :to="{ name: 'products' }">
        <a>Continue Shopping</a>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "ShoppingCartList",

  props: ["cartItems"],

  methods: {
    calculateTotal() {
      const prices = this.cartItems.map((item) => Number(item.price));

      let totalPrice = 0;

      for (let price of prices) {
        totalPrice += price;
      }

      return totalPrice;
    },
    calculateTax(totalPrice) {
      const taxRate = 10.25 / 100; // 10.25% tax rate
      const taxAmount = totalPrice * taxRate;
      const totalPriceWithTax = totalPrice + taxAmount;
      return totalPriceWithTax.toFixed(2);
    },

    async handleCheckout() {
      try {
        const stripe = await loadStripe(
          "pk_test_51PYwiSRqy7S2QG3uV7ey7QqsvqBcQ2NSENraON2BlBJZxmcS1JNzWFTuhmVDIxS7Ueri65eeU4C05HFl8cHonYiN00aTgLcsk9"
        );

        const { data } = await axios.post(
          "https://localhost:8000/api/create-checkout-session",
          {
            products: this.cartItems,
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

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.custom-empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 70vh;
}

.custom-empty-cart div {
  padding: 50px;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.cart-plus-minus-box {
  pointer-events: none;
}

.product-thumbnail a {
  cursor: default;
}
</style>
