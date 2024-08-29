<template>
  <div class="container">
    <div class="sidebar">
      <h2 class="title">Home</h2>
      <!-- 导航区 -->
      <nav class="navigate">
        <RouterLink to="/home/profile" class="nav-link" active-class="active">个人资料</RouterLink>
        <div class="dropdown">
          <a href="#" @click.prevent="userDropdown" class="nav-link">用户管理</a>
          <div class="dropdown-menu" :class="{ 'show': isUserDropdown }">
            <RouterLink to="/home/resetpasswd" class="dropdown-item" active-class="active">Reset ur passwd</RouterLink>
          </div>
        </div>
        <RouterLink to="/home/teamprofile" class="nav-link" active-class="active">队伍信息</RouterLink>
        <div class="dropdown">
          <a href="#" @click.prevent="toggleDropdown" class="nav-link">队伍管理</a>
          <div class="dropdown-menu" :class="{ 'show': isDropdownOpen }">
            <RouterLink to="/home/teamcreate" class="dropdown-item" active-class="active">Create your Team</RouterLink>
            <RouterLink to="/home/teamdelete" class="dropdown-item" active-class="active">Delete your Team</RouterLink>
            <RouterLink to="/home/teamjoin" class="dropdown-item" active-class="active">Join a Team</RouterLink>
            <RouterLink to="/home/userkick" class="dropdown-item" active-class="active">Kick a user</RouterLink>
          </div>
        </div>
      </nav>
    </div>
    <div class="main-content">
      <!-- 展示区 -->
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" name="userHome" setup> 
import { ref } from 'vue';
const isDropdownOpen = ref(false);
const isUserDropdown = ref(false);
function toggleDropdown() {
isDropdownOpen.value = !isDropdownOpen.value;
}
function userDropdown() {
isUserDropdown.value = !isUserDropdown.value;
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: stretch; 
  height: 100vh; /* 设置容器高度为视口高度 */
  width: 100%; /* 设置容器宽度为100%，确保填充整个屏幕 */
}

.sidebar {
  width: 25%; /* 设置侧边栏宽度 */
  background-color: hsla(212, 27%, 14%, 0.808); /* 侧边栏背景颜色 */
  color: white; /* 文字颜色 */
  padding: 20px; /* 内边距 */
  box-sizing: border-box; /* 确保padding不会使元素溢出 */
  height: 100vh;
  border-radius: 4px;
}

.main-content {
  flex-grow: 1; /* 允许主内容区占据剩余空间 */
  background-color: hsl(210, 17%, 80%); /* 主内容区背景颜色 */
  padding: 20px; /* 内边距 */
  box-sizing: border-box; /* 确保padding不会使元素溢出 */
  border-radius: 4px;
}

/* 添加此规则以移除默认的margin和padding */
html, body, .container, .sidebar, .main-content {
  margin: 0;
  padding: 0;
}

.title {
display: flex;
justify-content: center; /* 水平居中 */
align-items: center; /* 垂直居中 */
height: 60px; /* 设置标题的高度，可以根据需要调整 */
background-color: #343a40; /* 背景颜色 */
color: white; /* 文字颜色 */
font-size: 1.5em; /* 文字大小 */
}

.nav-link {
display: block;
padding: 10px 20px;
width: 100%;
text-decoration: none;
color: hsla(115, 42%, 50%, 0.751);
border-left: 4px solid transparent;
transition: border-color 0.3s ease;
border-bottom: 2px solid #007bff;
}

.nav-link:hover {
background-color: #e9ecef;
color: #007bff;
}

.active {
border-left-color: #007bff;
color: #007bff;
background-color: #e9ecef;
}

.dropdown {
display: inline-block;
width: 100%;
}

.dropdown-menu {
display: none; /* 默认隐藏 */
top: 100%; /* 位于 .nav-link 下方 */
left: 0; /* 与 .nav-link 左边对齐 */
background-color: hsla(212, 27%, 14%, 0.808);
width: 100%; /* 与 .nav-link 宽度一致 */
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
}

.dropdown-menu.show {
display: block; /* 显示时 */
}

.dropdown-item {
color: #f75858;
padding: 10px 20px; /* 与 .nav-link 垫边一致 */
text-decoration: none;
display: block;
white-space: nowrap; /* 防止文本换行 */
text-indent: 16px; /* 文字向右偏移 */
}
</style>