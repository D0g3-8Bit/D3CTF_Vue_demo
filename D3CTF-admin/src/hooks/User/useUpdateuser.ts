import axios from "axios";

/**
 * models.UserInfoUpdate，传入的时候不变的一定要带上原来的数据
 */
export interface updateRequest {
    email?: string;
    /**
     * 确定是那个用户的
     */
    id: number;
    name?: string;
    phone?: string;
    /**
     * 身份
     */
    Role?: number;
    username?: string;
}
export interface updateResponse {
    error?:string,
    success?:string,
    status?:number
}
export async function useUpdateuser(data: updateRequest) {
    let result : updateResponse;
    try{
        const response = await axios.post('/api/admin/updateUser', data);
        result = response.data;
        result.status = response.status;
        return result;
       }catch(e){
        throw(e)
       }
    };