import axios from "axios";

/**
 * models.UserActive
 */
export interface ActiveRequest {
    id: number;
    isActive?: boolean;
}

export interface ActiveResponse {
    error?:string,
    success?:string,
    status?:number
}
//虽然不知道这个接口有什么用，但是先把一部分处理逻辑写在这
export async function useActive(data: ActiveRequest) {
    const result = await axios.get("/api/user/active", {
        params: data
    });
    return result.data;
}