<template>
  <div class="adding-product-section">
    <div class="product-section">
      <div class="deal-area pt-95 pb-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="product-details-img">
                <img
                  v-if="productImageUrlOne"
                  id="zoompro"
                  :src="productImageUrlOne"
                />
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
                  <span class="inStock" v-if="isInStock"
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
                      v-model="productQuantity"
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
                      v-if="isInStock"
                      @click="addToCart"
                      class="addtocart-btn"
                      title="Add to cart"
                    >
                      <i class="ion-bag"></i>
                      Add to cart
                    </a>
                    <!-- Put v-else -->
                    <a
                      class="disabled addtocart-btn"
                      v-else
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

              <p>Click if the product is in stock</p>

              <input
                class="custom-edit-input custom-edit-checkbox"
                type="checkbox"
                :checked="isInStock"
                @change="updateProductAvailability('inStock', $event)"
              />

              <p>Place The Product Description Here</p>

              <textarea
                rows="10"
                class="custom-edit-input"
                :value="productDescription"
                @input="updateProductDescription($event.target.value)"
              />
              <el-dropdown>
                <el-button type="primary" class="dropdown-margin">
                  Generation
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="setGeneration('I')"
                      >I</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('II')"
                      >II</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('III')"
                      >III</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('IV')"
                      >IV</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('V')"
                      >V</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('VI')"
                      >VI</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('VII')"
                      >VII</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('VIII')"
                      >VIII</el-dropdown-item
                    >
                    <el-dropdown-item @click="setGeneration('IX')"
                      >IX</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown>
                <el-button type="success" class="dropdown-margin">
                  Type
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="setType('Normal')"
                      >Normal</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Fairy')"
                      >Fairy</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Flying')"
                      >Flying</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Ground')"
                      >Ground</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Poison')"
                      >Poison</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Steel')"
                      >Steel</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Dark')"
                      >Dark</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Fighting')"
                      >Fighting</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Ghost')"
                      >Ghost</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('ICE')"
                      >ICE</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Psychic')"
                      >Psychic</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Water')"
                      >Water</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Dragon')"
                      >Dragon</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Fire')"
                      >Fire</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Grass')"
                      >Grass</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Rock')"
                      >Rock</el-dropdown-item
                    >
                    <el-dropdown-item @click="setType('Bug')"
                      >Bug</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown>
                <el-button type="warning" class="dropdown-margin">
                  Rarity
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="setRarity('Common')"
                      >Common</el-dropdown-item
                    >
                    <el-dropdown-item @click="setRarity('Uncommon')"
                      >Uncommon</el-dropdown-item
                    >
                    <el-dropdown-item @click="setRarity('Rare')"
                      >Rare</el-dropdown-item
                    >
                    <el-dropdown-item @click="setRarity('Holo Rare')"
                      >Holo Rare</el-dropdown-item
                    >
                    <el-dropdown-item @click="setRarity('Ultra Rare')"
                      >Ultra Rare</el-dropdown-item
                    >
                    <el-dropdown-item @click="setRarity('Secret Rare')"
                      >Secret Rare</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown>
                <el-button type="danger" class="dropdown-margin">
                  Stage
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="setStage('Basic Pokémon')"
                      >Basic Pokémon</el-dropdown-item
                    >
                    <el-dropdown-item @click="setStage('Stage 1 Pokémon')"
                      >Stage 1 Pokémon</el-dropdown-item
                    >
                    <el-dropdown-item @click="setStage('Stage 2 Pokémon')"
                      >Stage 2 Pokémon</el-dropdown-item
                    >
                    <el-dropdown-item @click="setStage('Baby Pokémon')"
                      >Baby Pokémon</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click="setStage('Legendary & Mythical Pokémon')"
                      >Legendary & Mythical Pokémon</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div class="dropdown-tags">
                <el-tag
                  type="primary"
                  class="dropdown-tag"
                  size="large"
                  effect="plain"
                  round
                >
                  Generation {{ generation }}
                </el-tag>
                <el-tag
                  type="success"
                  size="large"
                  class="dropdown-tag"
                  effect="plain"
                  round
                >
                  {{ type }}
                </el-tag>
                <el-tag
                  type="warning"
                  size="large"
                  class="dropdown-tag"
                  effect="plain"
                  round
                >
                  {{ rarity }}
                </el-tag>
                <el-tag
                  type="danger"
                  size="large"
                  class="dropdown-tag"
                  effect="plain"
                  round
                >
                  {{ stage }}
                </el-tag>
              </div>

              <p>Place The Product Image Link Here</p>
              <!-- !! ADDING SECTION INPUTS -->
              <input
                :class="inputClass"
                :value="productImageUrlOne"
                placeholder="Primary URL"
                @input="updateProductImageUrl($event.target.value, 'one')"
              />
              <input
                :class="inputClass"
                :value="productImageUrlTwo"
                placeholder="OK to leave blank"
                @input="updateProductImageUrl($event.target.value, 'two')"
              />
              <input
                :class="inputClass"
                :value="productImageUrlThree"
                placeholder="OK to leave blank"
                @input="updateProductImageUrl($event.target.value, 'three')"
              />
              <input
                :class="inputClass"
                :value="productImageUrlFour"
                placeholder="OK to leave blank"
                @input="updateProductImageUrl($event.target.value, 'four')"
              />
              <input
                :class="inputClass"
                :value="productImageUrlFive"
                placeholder="OK to leave blank"
                @input="updateProductImageUrl($event.target.value, 'five')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="submit">
      <div class="product-list-action-left">
        <a @click="submitChanges" class="addtocart-btn" href="#">
          <i class="ion-bag"></i>
          Add To DataBase
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
export default {
  data() {
    return {
      product: [],
      productName: "",
      productDescription: "",
      productPrice: 0,
      productOldPrice: 0,
      productQuantity: 0,
      isInStock: false,
      productImageUrlOne: "",
      productImageUrlTwo: "",
      productImageUrlThree: "",
      productImageUrlFour: "",
      productImageUrlFive: "",
      productImages: [],
      inputClass: "custom-edit-input",
      type: "Type",
      generation: "",
      stage: "Stage",
      rarity: "Rarity",
    };
  },
  methods: {
    setGeneration(value) {
      this.generation = value;
    },
    setType(value) {
      this.type = value;
    },
    setRarity(value) {
      this.rarity = value;
    },
    setStage(value) {
      this.stage = value;
    },
    updateProductName(newValue) {
      this.productName = newValue;
    },
    updateProductDescription(newValue) {
      this.productDescription = newValue;
    },
    updateProductPrice(newValue) {
      this.productPrice = Number(newValue);
    },
    updateProductOldPrice(newValue) {
      this.productOldPrice = Number(newValue);
    },
    updateProductAvailability(option, event) {
      this[option] = event.target.checked;
      if (option === "inStock" && event.target.checked) {
        this.isInStock = true;
      } else {
        this.isInStock = false;
      }
    },
    updateProductImageUrl(newValue, variable) {
      console.log(this.productImages);
      if (variable == "one") {
        this.productImageUrlOne = newValue;
        this.productImages.push(this.productImageUrlOne);
        console.log(this.productImages);
      } else if (variable == "two") {
        this.productImageUrlTwo = newValue;
        this.productImages.push(this.productImageUrlTwo);
      } else if (variable == "three") {
        this.productImageUrlThree = newValue;
        this.productImages.push(this.productImageUrlThree);
      } else if (variable == "four") {
        this.productImageUrlFour = newValue;
        this.productImages.push(this.productImageUrlFour);
      } else if (variable == "five") {
        this.productImageUrlFive = newValue;
        this.productImages.push(this.productImageUrlFive);
      }
    },

    manageQuantity(operation) {
      if (this.productQuantity > 0) {
        if (!operation) {
          this.productQuantity--;
          console.log(this.productQuantity);
        }
        this.productQuantity++;
      } else if (this.productQuantity == 0) {
        if (operation) this.productQuantity++;
      }
    },

    async submitChanges() {
      const productId = this.$route.params.productId;

      const filteredArray = this.productImages.filter((element) =>
        element.includes("https://")
      );
      const data = {
        productName: this.productName,
        productDescription: this.productDescription,
        productQuantity: this.productQuantity,
        productPrice: this.productPrice,
        productOldPrice: this.productOldPrice,
        productImages: filteredArray,
        productIsInStock: this.isInStock,
      };

      console.log(data);

      // const response = await axios.post(
      //   `/api/admin/panel/edit_delete_product/${productId}`,
      //   data
      // );

      // response.data.success
      //   ? ElNotification({
      //       title: "Success! ",
      //       message: response.data.success,
      //       type: "success",
      //     })
      //   : ElNotification({
      //       title: "Error! ",
      //       message: response.data.error,
      //       type: "danger",
      //     });
    },
  },
  async created() {
    const productId = this.$route.params.productId;
    const response = await axios.get(
      `/api/admin/panel/edit_delete_product/${productId}`
    );
    const product = response.data;

    this.product = product;
    this.productName = product.name;
    this.productPrice = product.price;
    this.productOldPrice = product.oldPrice;
    this.productDescription = product.description;
    this.isInStock = product.isInStock;
    this.productQuantity = product.quantity;
    this.productImages = product.images;
    this.productImageUrlOne = product.images[0];
    this.productImageUrlTwo = product.images[1];
    this.productImageUrlThree = product.images[2];
    this.productImageUrlFour = product.images[3];
    this.productImageUrlFive = product.images[4];
  },
};
</script>

<style scoped>
@import "../assets/css/responsive.css";

.section-title h2 {
  padding: 50px;
  font-weight: 400;
  text-transform: uppercase;
}

.product-section {
  display: flex;
}

.deal-area {
  margin-left: 20px;
  width: 70%;
}

.shop-area {
  width: 30%;
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.input-group-text {
  border: none;
  cursor: pointer;
}

.form-control {
  border: none;
  text-align: center;
  pointer-events: none;
  margin: 0;
  padding: 0;
  height: 100%;
}
.custom-edit-input {
  margin-bottom: 30px;
  width: 80%;
}

.adding-product-section {
  margin: 0 auto;
  width: 100%;
  /* border-radius: 20px;
  -webkit-box-shadow: 0px 0px 30px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 30px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 30px -17px rgba(0, 0, 0, 0.75); */
}

.custom-row-wrap input {
  flex-wrap: wrap;
}

.row p {
  display: flex;
  flex-wrap: wrap;
}

.product-details-content {
  display: flex;
  /* justify-content: center;
  align-content: center; */
  flex-direction: column;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
}

.outOfStock {
  color: #ff3131;
  font-family: sans-serif;
  font-size: 15px;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  background: grey;
  opacity: 0.5;
}

.inStock {
  color: rgb(34, 170, 46);
  font-family: sans-serif;
  font-size: 15px;
}

.custom-edit-checkbox {
  width: 100px;
}

.edit-span-in {
  color: rgb(34, 170, 46);
}

.edit-span-out {
  color: #ff3131;
}

.product-list-action-left {
  padding-bottom: 50px;
}

.submit {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 100px;
}

.submit-emails {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  margin-bottom: 100px;
}

/* email section */

.custom-empty-products-list {
  display: flex;
  justify-content: center;
}

.email-message {
  margin-top: 20px;
}

.submit {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.submit .product-list-action-left a {
  font-size: 11px;
}

.product-wrapper {
  width: 50%;
}

.above-product-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* end of email section */
/* start of adding/deleting products section */

.product-action a {
  text-decoration: none;
}

.custom-empty-products-list {
  display: flex;
  justify-content: center;
}

.custom-image {
  aspect-ratio: 3/3;
}

.ti-plus-a {
  cursor: pointer;
}

.ti-shopping-cart-a {
  cursor: pointer;
}

hr {
  width: 85%;
  margin: 1rem 0;
  color: inherit;
  background-color: currentColor;
  border: 1px solid rgb(166, 162, 162);
  opacity: 0.25;
  margin: 0 auto;
}

.section-title h4 {
  margin-top: 100px;
}
/* end of adding/deleting products section */

.dropdown-margin {
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.dropdown-tags {
  margin-top: 20px;
  margin-bottom: 20px;
}

.dropdown-tag {
  margin-right: 40px;
  margin-top: 10px;
}

@media screen and (max-width: 700px) {
  .adding-product-section {
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .dropdown-tag {
    margin-right: 20px;
  }
  .dropdown-tag {
    margin-right: 20px;
  }
  .product-section {
    display: block;
  }
  .deal-area {
    width: 100%;
  }
  .shop-area {
    width: 100%;
  }
  .custom-edit-input {
    margin-bottom: 30px;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .product-wrapper {
    flex: 0 0 auto;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>

<!-- 
async created() {
    const productId = this.$route.params.productId;
    const response = await axios.get(
      `/api/admin/panel/edit_delete_product/${productId}`
    );
    const product = response.data;

    this.product = product;
    this.name = product.name;
    this.price = product.price;
    this.oldPrice = product.oldPrice;
    this.description = product.description;
    this.images = product.images;
    this.isInStock = product.isInStock;
    this.quantity = product.quantity;
  },
-->

<!-- 
async submitChanges(productId) {
      const data = {
        productName: this.name,
        productDescription: this.description,
        productQuantity: this.quantity,
        productPrice: this.price,
        productOldPrice: this.oldPrice,
        productImageUrl: this.image,
        productIsInStock: this.isInStock,
      };

      const response = await axios.post(
        `/api/admin/panel/edit_delete_product/${productId}`,
        data
      );

      if (response.data.success) {
        return (
          (this.showAlert = true),
          (this.alert_title = "Success!"),
          (this.alert_description = response.data.success),
          (this.alert_type = "success"),
          ElNotification({
            title: this.alert_title,
            message: this.alert_description,
            type: "success",
          })
        );
      } else {
        return (
          (this.showAlert = true),
          (this.alert_title = "Error!"),
          (this.alert_description = response.data.error),
          (this.alert_type = "error"),
          ElNotification({
            title: this.alert_title,
            message: this.alert_description,
            type: "error",
          })
        );
      }
    },
-->
