<template>
    <div class="container">
      <div class="sidebar">
        <h2 class="title">Home</h2>
        <!-- 导航区 -->
        <nav class="navigate">
          <RouterLink to="/admin/users" class="nav-link" active-class="active">All users</RouterLink>
          <RouterLink to="/admin/deleteUser" class="nav-link" active-class="active">Delete user</RouterLink>
          <RouterLink to="/admin/updateUser" class="nav-link" active-class="active">Update user</RouterLink>
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
  </style>