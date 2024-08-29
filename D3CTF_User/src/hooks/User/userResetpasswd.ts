// userResetpasswd.ts

import axios from 'axios';

export interface ResetPasswordRequest {
    /**
     * 验证码id
     */
    captchaId?: string;
    newPassword: string;
    oldPassword: string;
    /**
     * 验证码对应的值
     */
    value?: string;
    [property: string]: any;
}

export async function resetUserPassword(data: ResetPasswordRequest): Promise<any> {
    try {
        const response = await axios.post('/api/user/resetPasswd', data);
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}