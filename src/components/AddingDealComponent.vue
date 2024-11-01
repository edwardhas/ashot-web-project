<script setup>
import axios from "axios";
import { ref } from "vue";
import { ElNotification } from "element-plus";

let dealProductName = ref("Product Name");
let dealProductDescription = ref("Product Description");
let dealProductPrice = ref(0);
let dealProductOldPrice = ref(0);
let dealProductImageUrlOne = ref(null);
let dealProductImageUrlTwo = ref(null);
let dealProductImageUrlThree = ref(null);
let dealProductImageUrlFour = ref(null);
let dealProductImageUrlFive = ref(null);
let dealImages = ref([]);
let type = ref("Type");
let generation = ref("");
let stage = ref("Stage");
let rarity = ref("Rarity");

const setGeneration = (value) => {
  generation.value = value;
};
const setType = (value) => {
  type.value = value;
};
const setRarity = (value) => {
  rarity.value = value;
};
const setStage = (value) => {
  stage.value = value;
};

const updateProductName = (newValue) => {
  dealProductName.value = newValue;
};

const updateProductDescription = (newValue) => {
  return (dealProductDescription.value = newValue);
};

const updateProductPrice = (newValue) => {
  return (dealProductPrice.value = Number(newValue));
};
const updateProductOldPrice = (newValue) => {
  return (dealProductOldPrice.value = Number(newValue));
};

const updateProductImageUrl = (newValue, variable) => {
  if (variable == "one") {
    console.log(dealProductImageUrlOne);
    return (dealProductImageUrlOne.value = newValue);
  } else if (variable == "two")
    return (dealProductImageUrlTwo.value = newValue);
  else if (variable == "three")
    return (dealProductImageUrlThree.value = newValue);
  else if (variable == "four")
    return (dealProductImageUrlFour.value = newValue);
  else if (variable == "five")
    return (dealProductImageUrlFive.value = newValue);
};

const addBestDeal = async () => {
  dealProductImageUrlOne.value == null
    ? null
    : dealImages.value.push(dealProductImageUrlOne.value);
  dealProductImageUrlTwo.value == null
    ? null
    : dealImages.value.push(dealProductImageUrlTwo.value);
  dealProductImageUrlThree.value == null
    ? null
    : dealImages.value.push(dealProductImageUrlThree.value);
  dealProductImageUrlFour.value == null
    ? null
    : dealImages.value.push(dealProductImageUrlFour.value);
  dealProductImageUrlFive.value == null
    ? null
    : dealImages.value.push(dealProductImageUrlFive.value);

  const dealData = {
    name: dealProductName.value,
    price: dealProductPrice.value,
    oldPrice: dealProductOldPrice.value,
    description: dealProductDescription.value,
    imageUrls: dealImages.value,
    generation: generation.value,
    type: type.value,
    stage: stage.value,
    rarity: rarity.value,
  };

  const response = await axios.post("/api/admin/deal/add", dealData);

  response.data.success
    ? ElNotification({
        title: "Success! ",
        message: response.data.success,
        type: "success",
        duration: 3000,
      })
    : ElNotification({
        title: "Error! ",
        message: response.data.error,
        type: "danger",
        duration: 3000,
      });

  dealProductName = "Product Name";
  dealProductDescription = "Product Description";
  dealProductPrice = 0;
  dealProductOldPrice = 0;
  dealProductImageUrlOne = null;
  dealProductImageUrlTwo = null;
  dealProductImageUrlThree = null;
  dealProductImageUrlFour = null;
  dealProductImageUrlFive = null;
};
</script>

<template>
  <div class="deal-section">
    <div class="deal-area bg-img pt-95 pb-100">
      <div class="container">
        <div class="section-title text-center mb-50">
          <h2>Deal of the Week Section</h2>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="deal-img wow fadeInLeft">
              <img
                v-if="dealProductImageUrlOne"
                :src="dealProductImageUrlOne"
              />
              <p v-else>
                Picture will be displayed here after you place the link in the
                corresponding field below
              </p>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="deal-content">
              <h3>
                <a>{{ dealProductName }}</a>
              </h3>
              <div class="deal-pro-price">
                <span class="deal-old-price"
                  >${{ dealProductOldPrice }}.00
                </span>
                <span>${{ dealProductPrice }}.00</span>
              </div>
              <p>
                {{ dealProductDescription }}
              </p>
              <div class="timer timer-style">
                <div data-countdown="2017/10/01"></div>
              </div>
              <div class="discount-btn mt-35">
                <a class="btn-style">SHOP NOW</a>
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
              :value="dealProductName"
              @input="updateProductName($event.target.value)"
            />

            <p>Place The Product Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="dealProductPrice"
              min="0"
              @input="updateProductPrice($event.target.value)"
            />

            <p>Place The Product Old Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="dealProductOldPrice"
              min="0"
              @input="updateProductOldPrice($event.target.value)"
            />

            <p>Place The Product Description Here</p>

            <textarea
              class="custom-edit-input"
              :value="dealProductDescription"
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

            <p>
              Place The Product Image Link Here (Only the first one shows up on
              this page)
            </p>

            <input
              class="custom-edit-input"
              :value="dealProductImageUrlOne"
              placeholder="URL goes here"
              @input="updateProductImageUrl($event.target.value, 'one')"
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlTwo"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'two')"
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlThree"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'three')"
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlFour"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'four')"
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlFive"
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
      <a @click="addBestDeal" class="addtocart-btn" href="#">
        <i class="ion-bag"></i>
        Add To DataBase
      </a>
    </div>
  </div>
</template>

<style scoped>
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

.submit {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 100px;
}

.product-list-action-left {
  padding-bottom: 50px;
}
.product-list-action-left a {
  text-decoration: none;
}

.deal-section {
  display: flex;
}

.deal-area {
  margin-left: 20px;
  width: 70%;
}

.shop-area {
  width: 30%;
}

@media screen and (max-width: 700px) {
  .dropdown-tag {
    margin-right: 20px;
  }
  .deal-section {
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
</style>
