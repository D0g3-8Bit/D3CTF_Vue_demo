import { ref, onMounted } from 'vue';
import axios from 'axios';

export interface UserRegister {
  captchaId: string;
  email: string;
  password: string;
  username: string;
  value: string;
}

export interface CaptchaResponse {
    captcha_id: string;
    captcha_img: string;
  }

export default function useRegister() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  const captchaId = ref<string>('');
  const captchaImageUrl = ref<string | null>(null);

  const fetchCaptcha = async () => {
    try {
        const response = await axios.get<CaptchaResponse>('/captcha');
        captchaId.value = response.data.captcha_id;
        captchaImageUrl.value = `data:image/png;base64,${response.data.captcha_img}`;
      } catch (e) {
        console.error('Failed to fetch captcha:', error);
        error.value = 'Failed to fetch captcha';
      }
  };

  const registerUser = async (user: UserRegister) => {
    try {
      loading.value = true;
      const response = await axios.post('/register', { ...user, captchaId: captchaId.value });
      if (response.status === 200) {
        success.value = true;
        error.value = null;
      } else {
        throw new Error('Unexpected server response');
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        error.value = e.response?.data.message || 'Registration failed';
      } else {
        error.value = 'An unexpected error occurred';
      }
      success.value = false;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchCaptcha();
  });

  return {
    loading,
    error,
    success,
    captchaImageUrl,
    registerUser,
  };
}