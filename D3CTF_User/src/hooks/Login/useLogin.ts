// src/hooks/useLogin.ts
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export  function useLogin() {
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: username.value,
        password: password.value,
      });

      if (response.data.success) {
        // 登录成功后重定向到首页或其他页面
        router.push('/');
      } else {
        errorMessage.value = '登录失败，请检查用户名或密码';
      }
    } catch (error) {
      errorMessage.value = '登录失败，请重试';
    }
  };

  return {
    username,
    password,
    errorMessage,
    login,
  };
}
