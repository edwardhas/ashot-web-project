<template>
  <div>
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
          <el-menu-item index="1-1">category one</el-menu-item>
          <el-menu-item index="1-2">category two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item index="1-3">category three</el-menu-item>
        <el-sub-menu index="1-4">
          <template #title><span>category four</span></template>
          <el-menu-item index="1-4-1">category one</el-menu-item>
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
};

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const toggleMenu = () => {
  isCollapse.value = !isCollapse.value; // Toggle menu when burger icon is clicked
};

const closeMenu = () => {
  isCollapse.value = true; // Collapse the menu when overlay is clicked
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
