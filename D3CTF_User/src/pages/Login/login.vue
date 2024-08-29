<template>
  <div class="container">
    <div class="introduction">
      <Introduction />
    </div>
    <div class="login">
      <h2 class="login-title">登录</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username" class="label">username</label>
          <input type="text" v-model="username" id="username" required class="input-field">
        </div>
        <div class="input-group">
          <label for="password" class="label" >password</label>
          <input type="password" v-model="password" id="password" required class="input-field">
        </div>
        <button type="submit" class="login-button">Login</button>
        <div>
          <router-link to="/register" class="register-link">to register</router-link> 
        </div>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLogin } from '@/hooks/Login/useLogin';
import Introduction from '@/components/Header/introduction.vue';

const { username, password, errorMessage, login } = useLogin();
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.introduction .login{
  flex: 1;
  box-sizing: border-box;
}

.login {
  background-color: #3a808f77;
  width: 450px;
  height: 400px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px; 
}

.login-title {
  color: hsl(208, 66%, 57%);
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

.input-field {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  width: 50%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

.label {
  display: block; /* 让标签独占一行 */
  font-size: 16px; /* 设置字体大小 */
  color: #333; /* 设置字体颜色 */
  margin-bottom: 10px; /* 添加底部外边距 */
  font-weight: bold; /* 设置字体加粗 */
}

.register-link {
  color: rgb(32, 205, 75);
  text-decoration: underline;
}
</style>