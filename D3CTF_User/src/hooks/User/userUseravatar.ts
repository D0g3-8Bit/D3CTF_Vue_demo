/*此后所有的用户信息修改逻辑都在这里添加
  1. 上传头像  
*/
import axios from 'axios';

export interface UploadService {
  uploadFile: (file: File) => Promise<void>;
}

export const uploadService: UploadService = {
  uploadFile: async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/user/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        // 上传成功，但不需要处理返回的数据
      } else {
        throw new Error(`Upload failed with status code ${response.status}`);
      }
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  },
};
