<template>
  <div class="main-container">
    <!-- Burger Icon to toggle menu -->
    <div class="burger-icon" @click="toggleMenu">
      <img src="../assets/img/logo/burger-menu.png" alt="" />
    </div>

    <!-- Overlay for darkening the background and closing the menu when clicked -->
    <div v-if="!isCollapse" class="overlay" @click="closeMenu"></div>

    <!-- Mobile Menu -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Products</span>
        </template>
        <el-menu-item-group>
          <el-sub-menu index="1-1">
            <template #title><span>Generation</span></template>
            <el-menu-item index="1-1-1">Generation I</el-menu-item>
            <el-menu-item index="1-1-2">Generation II</el-menu-item>
            <el-menu-item index="1-1-3">Generation III</el-menu-item>
            <el-menu-item index="1-1-4">Generation IV</el-menu-item>
            <el-menu-item index="1-1-5">Generation V</el-menu-item>
            <el-menu-item index="1-1-6">Generation VI</el-menu-item>
            <el-menu-item index="1-1-6">Generation XII</el-menu-item>
            <el-menu-item index="1-1-6">Generation XIII</el-menu-item>
            <el-menu-item index="1-1-6">Generation IX</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="1-2">
            <template #title><span>Type</span></template>
            <el-menu-item index="1-2-1">Normal</el-menu-item>
            <el-menu-item index="1-2-2">Fairy</el-menu-item>
            <el-menu-item index="1-2-3">Flying</el-menu-item>
            <el-menu-item index="1-2-4">Ground</el-menu-item>
            <el-menu-item index="1-2-5">Poison</el-menu-item>
            <el-menu-item index="1-2-6">Steel</el-menu-item>
            <el-menu-item index="1-2-7">Dark</el-menu-item>
            <el-menu-item index="1-2-8">Fighting</el-menu-item>
            <el-menu-item index="1-2-9">Ghost</el-menu-item>
            <el-menu-item index="1-2-10">ICE</el-menu-item>
            <el-menu-item index="1-2-11">Psychic</el-menu-item>
            <el-menu-item index="1-2-12">Water</el-menu-item>
            <el-menu-item index="1-2-13">Dragon</el-menu-item>
            <el-menu-item index="1-2-14">Fire</el-menu-item>
            <el-menu-item index="1-2-15">Grass</el-menu-item>
            <el-menu-item index="1-2-16">Rock</el-menu-item>
            <el-menu-item index="1-2-17">Bug</el-menu-item>
          </el-sub-menu>
        </el-menu-item-group>
        <el-sub-menu index="1-3">
          <template #title><span>Rarity</span></template>
          <el-menu-item index="1-3-1">Common</el-menu-item>
          <el-menu-item index="1-3-2">Uncommon</el-menu-item>
          <el-menu-item index="1-3-3">Rare</el-menu-item>
          <el-menu-item index="1-3-4">Holo Rare</el-menu-item>
          <el-menu-item index="1-3-5">Ultra Rare</el-menu-item>
          <el-menu-item index="1-3-6">Secret Rare</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="1-4">
          <template #title><span>Evolutionary Stage</span></template>
          <el-menu-item index="1-4-1">Basic Pokémon</el-menu-item>
          <el-menu-item index="1-4-2">Stage 1 Pokémon</el-menu-item>
          <el-menu-item index="1-4-3">Stage 2 Pokémon</el-menu-item>
          <el-menu-item index="1-4-4">Baby Pokémon</el-menu-item>
          <el-menu-item index="1-4-5"
            >Legendary & Mythical Pokémon</el-menu-item
          >
        </el-sub-menu>
      </el-sub-menu>
      <router-link :to="{ path: '/about-us' }">
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          About Us
        </el-menu-item>
      </router-link>
      <router-link :to="{ path: '/contact-us' }">
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          Contact Us
        </el-menu-item>
      </router-link>
      <router-link :to="{ path: '/my-account' }">
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          Account
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
  document.body.style.overflow = "hidden";
};

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const toggleMenu = () => {
  isCollapse.value = !isCollapse.value; // Toggle menu when burger icon is clicked
};

const closeMenu = () => {
  isCollapse.value = true; // Collapse the menu when overlay is clicked
  document.body.style.overflow = "";
};
</script>

<style scoped>
/* Burger Icon */
.burger-icon {
  width: 30px;
  height: 25px;
  top: 99px;
  left: 120px;
  z-index: 998;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.burger-icon::before,
.burger-icon::after,
.burger-icon div {
  content: "";
  width: 100%;
  height: 4px;
  background-color: black;
  border-radius: 2px;
}

/* Overlay to darken the background */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Dark semi-transparent background */
  z-index: 999; /* Just below the menu */
  cursor: pointer;
}
.el-menu--collapse {
  display: none;
}
/* Mobile Menu */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 30vw; /* Set width to 30% of the viewport */
  height: 100vh; /* Full height of the viewport */
  position: fixed; /* Fixed position to make it overlay */
  top: 0;
  left: 0;
  background-color: white; /* Or any background color you want */
  z-index: 1000; /* Higher z-index to overlay above content */
  overflow-y: auto; /* In case there are too many items */
}

@media screen and (max-width: 700px) {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 50%;
    height: 100%;
  }
  .burger-icon {
    top: 129px;
    left: 15px;
  }
}

a {
  text-decoration: none;
}
</style>
