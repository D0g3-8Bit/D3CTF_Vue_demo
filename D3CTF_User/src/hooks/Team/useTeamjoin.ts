/*加入队伍*/
import axios from "axios";
import { ref } from "vue";


/**
 * models.JoinTeam
 */
export interface TeamJoinRequest {
    inviteToken: string;
}
export interface TeamJoinResult {
    success?: string;
    statusCode: number;
    error?:string;
}

export async function JoinRequest(data:TeamJoinRequest){
    let result:TeamJoinResult;
    try{
        const response = await axios.post('/api/team/join', data);
        result =response.data;
        result.statusCode = response.status;
        return result;
    }catch(error){
        throw(error)
    }
}