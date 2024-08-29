<template>
    <div class="container">
      <div class="introduction">
        <Introduction />
      </div>
      <div class="register">
        <h2 class="register-title">注册</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="username" class="label">email</label>
            <input type="text" v-model="username" id="username" required class="input-field">
          </div>
          <div class="input-group">
            <label for="email" class="label">email</label>
            <input type="email" v-model="email" id="email" required class="input-field">
          </div>
          <div class="input-group">
            <label for="password" class="label">password</label>
            <input type="password" v-model="password" id="password" required class="input-field">
          </div>
          <div class="captcha-container">
            <input type="text" class="captcha-input" id = "captchaId" placeholder="Enter the code">
            <img class="captcha-image" :src="captchaImageUrl!" alt="Captcha Image">
            </div>
          <button type="submit" class="register-button">register</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <p v-if="success">success!</p>
      </div>
    </div>
  </template>
  
 <script setup lang="ts">
  import { ref } from 'vue';
  import  useRegister, { type UserRegister }  from '@/hooks/Register/useRegister';
  import Introduction from '@/components/Header/introduction.vue';
  import router from '@/routers';
  
  const { loading, error, success, captchaImageUrl,registerUser } = useRegister();
  
  const captchaId = ref('');
  const email = ref('');
  const password = ref('');
  const username = ref('');
  const value = ref(''); //这几把是什么东西
  
  const handleSubmit = async () => {
    const user: UserRegister = {
      captchaId: captchaId.value,
      email: email.value,
      password: password.value,
      username: username.value,
      value: value.value,
    };
    await registerUser(user);
  };
  if(success.value){
    router.push('/login');
  }
  //console.log(success.value)
  </script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.introduction.register{
  flex: 1;
  box-sizing: border-box;
  height: auto; 
}
.register {
  background-color: #3a808f77;
  width: 450px;
  height: 400px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(62, 60, 60, 0.863);
  border-radius: 10px; 
  display: flex; /* 使用Flexbox布局 */
  flex-direction: column; /* 元素垂直排列 */
  align-items: stretch; /* 使子元素填充整个容器宽度 */
}
.register-title {
  color: hsl(208, 66%, 57%);
  text-align: center;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
}

.input-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%; /* 设置宽度为100%，使其自适应父容器 */
  padding: 10px; /* 保留内边距 */
  border: 1px solid #ccc; /* 保留边框 */
  border-radius: 4px; /* 保留圆角 */
  font-size: 16px; 
  box-sizing: border-box; /* 这个属性确保padding和border被包含在width之内 */
}
.register-button:hover {
  background-color: #0056b3;
}
.register-button {
  width: 100%; /* 或者使用具体的像素值，如：width: 200px; */
  height: auto; 
  padding: 10px; 
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出的部分 */
  box-sizing: border-box; /* 确保padding和border包含在width和height内 */
}

.label {
  display: block; /* 让标签独占一行 */
  font-size: 16px; /* 设置字体大小 */
  color: #333; /* 设置字体颜色 */
  margin-bottom: 10px; /* 添加底部外边距 */
  font-weight: bold; /* 设置字体加粗 */
}

.error {
  color: red;
  margin-top: 10px;
}
.captcha-input{
  width: 50%; /* 设置宽度为100%，使其自适应父容器 */
  padding: 10px; /* 保留内边距 */
  border: 1px solid #ccc; /* 保留边框 */
  border-radius: 4px; /* 保留圆角 */
  font-size: 16px; 
  box-sizing: border-box; /* 这个属性确保padding和border被包含在width之内 */
    
}
.captcha-image {
  max-width: 100%; /* 图片宽度不超过容器宽度 */
  height: auto; /* 保持图片比例 */
}
</style>