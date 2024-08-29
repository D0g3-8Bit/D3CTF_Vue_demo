import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

/**
 * 验证码响应数据接口
 */
export interface CaptchaResponse {
    /**
     * 验证码id
     */
    captcha_id?: string;
    /**
     * 验证码的图像base64，例如返回(data:image/png;be64,iV==)
     */
    captcha_img?: string;
    [property: string]: any;
}

/**
 * 获取验证码的工具函数
 * @returns {Promise<CaptchaResponse>} 返回验证码的响应数据
 */
export async function fetchCaptcha(): Promise<CaptchaResponse> {
    try {
        const response = await axios.get<CaptchaResponse>('/captcha', {
            baseURL: '/api/captcha', // 替换为实际的 API 地址
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching captcha:', error);
        throw error;
    }
}



/*
    接受两个参数，为图像base64,另一个为ImageUrl
    负责在html中显示验证码
*/
export function displayCaptchaImage(captchaImgBase64: string, captchaImageUrl: any): void {
    captchaImageUrl.value = captchaImgBase64;
}