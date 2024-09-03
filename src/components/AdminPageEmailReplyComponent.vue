<template>
  <div class="shop-area custom-shop-area pt-95 pb-100">
    <div class="container custom-container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="product-details-content">
            <h2><span class="title">user/email ID: </span> {{ email.id }}</h2>
            <div class="product-price">
              <span class="new">{{ email.fullname }}</span>
              <span class="title">{{ email.email }}</span>
            </div>
            <p>{{ email.message }}</p>
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
            :value="dealProductName"
            @input="updateProductName($event.target.value, deal)"
          />

          <p>Place The Product Price Here</p>

          <input
            type="number"
            class="custom-edit-input"
            :value="dealProductPrice"
            min="0"
            @input="updateProductPrice($event.target.value, 'deal')"
          />

          <p>Place The Product Old Price Here</p>

          <input
            type="number"
            class="custom-edit-input"
            :value="dealProductOldPrice"
            min="0"
            @input="updateProductOldPrice($event.target.value, 'deal')"
          />

          <p>Place The Product Description Here</p>

          <input
            class="custom-edit-input"
            :value="dealProductDescription"
            @input="updateProductDescription($event.target.value, 'deal')"
          />

          <p>Place The Product Image Link Here</p>

          <input
            class="custom-edit-input"
            :value="dealProductImageUrl"
            placeholder="URL goes here"
            @input="updateProductImageUrl($event.target.value, 'deal')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["email"],
  data() {
    return {};
  },
  methods: {
    updateProductName(newValue, section) {
      if (section == "adding") return (this.productName = newValue);
      return (this.dealProductName = newValue);
    },
    updateProductDescription(newValue, section) {
      if (section == "adding") return (this.productDescription = newValue);
      return (this.dealProductDescription = newValue);
    },
    updateProductPrice(newValue, section) {
      if (section == "adding") return (this.productPrice = Number(newValue));
      return (this.dealProductPrice = Number(newValue));
    },
    updateProductOldPrice(newValue, section) {
      if (section == "adding") return (this.productOldPrice = Number(newValue));
      return (this.dealProductOldPrice = Number(newValue));
    },
  },
};
</script>

<style scoped>
@import "../assets/css/responsive.css";

.custom-container {
  display: flex;
  justify-content: center;
}

.col-lg-6 {
  width: 100%;
}

h2 {
  font-weight: 400;
  margin-bottom: 30px;
}

.title {
  font-weight: 600;
}
</style>
