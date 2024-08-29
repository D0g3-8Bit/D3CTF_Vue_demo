import axios from "axios";

/**
 * models.TeamUserInfo
 */
export interface KickUserRequest {
    teamID?: number;
    userID?: number;
}
export interface KcikUserResult {
    statusCode?: number;
    success?:string
    error?:string
}
export async function useTeamkickuser(data: KickUserRequest) {
    let result: KcikUserResult;
    try {
        const response = await axios.post('/api/team/kick', data);
        result = response.data
        result.statusCode = response.status;
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}   