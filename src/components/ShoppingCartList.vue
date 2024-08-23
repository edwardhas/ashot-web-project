<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Cart Page</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li><a>home</a></li>
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
                      <a href="#"><img :src="item.image" alt="" /></a>
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
                    <router-link :to="{ name: 'products' }">
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
                <router-link :to="{ name: 'checkout' }">
                  <a>Proceed To Checkout</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="custom-empty-cart" v-else>
    <div>
      <h2>Your cart is empty</h2>
    </div>

    <div class="cart-shiping-update">
      <router-link :to="{ name: 'products' }">
        <a>Continue Shopping</a>
      </router-link>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style scoped>
/* .breadcrumb-area {
  background-image: url("../assets/img/banner/banner-2.jpg");
} */

.breadcrumb-area {
  /* background-image: url(../assets/img/banner/banner-2.jpg); */
  aspect-ratio: 9/2;
  filter: brightness(50%);
  background-image: url("https://www.empire-tcg.com/cdn/shop/files/IMG_2920.jpg?v=1723960927&width=3840");
  background-size: 120%;
  animation: zoom-in-out 40s infinite;
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
</style>
