import axios from 'axios';

/**
 * 删除队伍的请求接口
 */
export interface TeamDeleteRequest {
    team_id?: number;
}
export interface TeamDeleteResult {
    statusCode?: number;
    message?: string;
  }

/**
 * 删除队伍
 * @param request 请求参数
 * @returns Promise<unknown> 返回状态码
 */
export async function deleteTeam(data: TeamDeleteRequest): Promise<TeamDeleteResult> {
    try {
        const response = await axios.post('/api/team/delete', data);
        return {
            statusCode: response.status,
        };
    } catch (error) {
        console.error('Error deleting team:', error);
        throw error;
    }
}