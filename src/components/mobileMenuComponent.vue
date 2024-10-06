<template>
  <!-- <el-container>
    
    <el-affix :offset="120">
      <el-button
        type="primary"
        class="affix-right"
        @click="toggleSidebar"
        v-if="isMobile"
        ><el-icon><Menu /></el-icon
      ></el-button>
    </el-affix>
    
    <el-aside
      :class="{ 'mobile-sidebar': isMobile, 'show-sidebar': isSidebarVisible }"
      width="200px"
    >
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>Navigation One</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-menu-item index="1-2">Option 2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span>Navigation Two</span>
        </el-menu-item>

        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span>Navigation Three</span>
        </el-menu-item>

        <el-submenu index="4">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>Navigation Four</span>
          </template>
          <el-menu-item index="4-1">Option 1</el-menu-item>
          <el-menu-item index="4-2">Option 2</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    
  </el-container> -->
  <p style="display: none"></p>
</template>

<script>
import { Menu } from "@element-plus/icons-vue";
export default {
  components: { Menu },
  data() {
    return {
      activeMenu: "1-1",
      isSidebarVisible: false,
      isMobile: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("Selected Menu:", key, keyPath);
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.isSidebarVisible = true; // Show sidebar by default on larger screens
      }
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style scoped>
.el-container {
  display: none;
}

.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
}

/* Mobile sidebar hidden by default */
.mobile-sidebar {
  position: fixed;
  height: 100%;
  z-index: 999;
  left: -200px; /* Move off-screen */
  top: 0;
  transition: left 0.3s ease;
}

/* Show sidebar when visible */
.show-sidebar {
  left: 0;
}

/* Button for toggling sidebar */
.toggle-sidebar {
  display: none;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

/* Media query for phones */
@media (max-width: 768px) {
  .toggle-sidebar {
    display: block;
  }

  .el-container {
    display: flex;
  }

  .mobile-sidebar {
    width: 200px;
    background-color: #fff;
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  }
}

@media (min-width: 769px) {
  .mobile-sidebar {
    display: none;
  }
}
</style>
