<template>
  <ValidationComponentVue
    :page="page"
    :message="message"
    :status="status"
    :isDisplayed="isDisplayed"
  />

  <div class="adding-product-section">
    <div class="section-title text-center mb-50 mt-90">
      <h2>Adding Products Section</h2>
    </div>

    <div class="shop-area pt-95 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="product-details-img">
              <img v-if="productImageUrl" id="zoompro" :src="productImageUrl" />
              <p v-else>
                Picture will be displayed here after you place the link in the
                corresponding field below
              </p>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="product-details-content">
              <h2>{{ productName }}</h2>

              <div class="product-price">
                <span class="new">${{ productPrice }}.00</span>
                <span class="old">${{ productOldPrice }}.00</span>
              </div>
              <div class="in-stock">
                <span class="inStock" v-if="inStock"
                  ><i class="ion-android-checkbox-outline"></i>In Stock</span
                >
                <span class="outOfStock" v-else
                  ><i class="ion-android-checkbox-outline"></i> Out Of
                  Stock</span
                >
              </div>
              <p>{{ productDescription }}</p>

              <div class="quality-wrapper mt-30 product-quantity">
                <label>Qty:</label>
                <div class="cart-plus-minus">
                  <span
                    class="input-group-text prevent-select"
                    @click="manageQuantity(false)"
                    >-</span
                  >
                  <input
                    type="text"
                    class="form-control prevent-select"
                    v-model="quantity"
                    @change="updateQuantity"
                  />
                  <span
                    class="input-group-text prevent-select"
                    @click="manageQuantity(true)"
                    >+</span
                  >
                </div>
              </div>
              <div class="product-list-action">
                <div class="product-list-action-left">
                  <!-- Chekc is is in stock-->
                  <a
                    v-if="inStock"
                    @click="addToCart"
                    class="addtocart-btn"
                    href="#"
                    title="Add to cart"
                  >
                    <i class="ion-bag"></i>
                    Add to cart
                  </a>
                  <!-- Put v-else -->
                  <a
                    class="disabled addtocart-btn"
                    v-else
                    href="#"
                    title="Add to cart"
                  >
                    <i class="ion-bag"></i>
                    Out of stock
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shop-area pt-95 pb-100">
      <div class="container">
        <div class="row">
          <div class="custom-row-wrap">
            <p>Place The Product Name Here</p>
            <input
              class="custom-edit-input"
              :value="productName"
              @input="updateProductName($event.target.value)"
            />

            <p>Place The Product Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="productPrice"
              min="0"
              @input="updateProductPrice($event.target.value)"
            />

            <p>Place The Product Old Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="productOldPrice"
              min="0"
              @input="updateProductOldPrice($event.target.value)"
            />

            <p>
              Select The Product Availability (Left -
              <span class="edit-span-in">In Stock</span>; Right -
              <span class="edit-span-out">Out Of Stock</span> )
            </p>

            <input
              class="custom-edit-input custom-edit-checkbox"
              type="checkbox"
              :checked="inStock"
              @change="updateProductAvailability('inStock', $event)"
            />

            <input
              class="custom-edit-input custom-edit-checkbox"
              type="checkbox"
              :checked="outOfStock"
              @change="updateProductAvailability('outOfStock', $event)"
            />

            <p>Place The Product Description Here</p>

            <input
              class="custom-edit-input"
              :value="productDescription"
              @input="updateProductDescription($event.target.value)"
            />

            <p>Place The Product Image Link Here</p>

            <input
              class="custom-edit-input"
              :value="productImageUrl"
              @input="updateProductImageUrl($event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="submit">
      <div class="product-list-action-left">
        <a
          @click="addToDataBase"
          class="addtocart-btn"
          href="#"
          title="Add to cart"
        >
          <i class="ion-bag"></i>
          Add To DataBase
        </a>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped></style>
