<template>
    <div class="reset-password-container">
      <form @submit.prevent="submitForm">
        <label for="oldPassword">Old Password:</label>
        <input type="password" id="oldPassword" class= "text" v-model="formData.oldPassword" required />
  
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" class= "text" v-model="formData.newPassword" required />
  
        <!-- 验证码值输入框和验证码图像 -->
        <div class="captcha-container">
          <label for="value">Captcha Value:</label>
          <input type="text" id="value" v-model="formData.value" required />
          <div class="captcha-image">
            <img :src="captchaImageUrl" alt="Captcha Image" />
          </div>
        </div>
  
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts" name='userResetpasswd'>
  import { ref, onMounted } from 'vue';
  import { resetUserPassword } from '@/hooks/User/userResetpasswd';
  import { fetchCaptcha, displayCaptchaImage } from '@/tools/Captcha/fetchCaptcha'; // 引入获取验证码的函数
  
  const formData = ref({
    oldPassword: '',
    newPassword: '',
    captchaId: '',
    value: ''
  });
  
  const captchaImageUrl = ref('');
  
  onMounted(async () => {
    // 在组件挂载完成后自动获取验证码
    const captchaData = await fetchCaptcha();
    if (captchaData.captcha_id) {
      formData.value.captchaId = captchaData.captcha_id;
    } else {
      formData.value.captchaId = ''; // 或者设置其他默认值
    }
    if (captchaData.captcha_img) {
      displayCaptchaImage(captchaData.captcha_img, captchaImageUrl);
    } else {
      // 处理 captcha_img 为 undefined 的情况
      console.error('captcha_img is not defined');
    }
  });
  
  async function submitForm() {
    try {
      const result = await resetUserPassword(formData.value);
      alert('Password reset successfully!');
      console.log(result);
    } catch (error) {
      console.error('Failed to reset password:', error);
      alert('Failed to reset password. Please check your input and try again.');
    }
  }
  </script>
  
  <style scoped>
  .reset-password-container {
    max-width: 450px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 5px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    margin-top: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .captcha-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .captcha-image {
    margin-left: 5px;
  }
  
  .captcha-image img {
    max-width: 100%;
    height: auto;
  }
  .text{
    margin-bottom: 10px; 
  }
  </style>