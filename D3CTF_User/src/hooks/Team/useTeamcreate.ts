import axios from 'axios';
import { ref } from 'vue';

/**
 * 创建队伍的请求模型
 */
export interface TeamCreateRequest {
  /**
   * 队伍描述
   */
  bio: string;

  /**
   * 队伍名称
   */
  name: string;
}

/**
 * 创建队伍的结果模型
 */
export interface TeamCreateResult {
  statusCode: number;
  message?: string;
}

/**
 * 创建队伍
 * @param data - 创建队伍所需的参数
 * @returns Promise<TeamCreateResult> - 包含状态码和错误信息的对象
 */
export async function useTeamCreate(data: TeamCreateRequest): Promise<TeamCreateResult> {
  try {
    const response = await axios.post('/api/team/create', data);

    return {
      statusCode: response.status,
      message: '队伍创建成功',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          return {
            statusCode: 400,
            message: '输入有误',
          };
        case 401:
          return {
            statusCode: 401,
            message: '队伍名称已存在',
          };
        case 500:
          return {
            statusCode: 500,
            message: '服务端错误',
          };
        default:
          return {
            statusCode: error.response?.status || 500,
            message: '未知错误',
          };
      }
    } else {
      return {
        statusCode: 500,
        message: '网络错误',
      };
    }
  }
}