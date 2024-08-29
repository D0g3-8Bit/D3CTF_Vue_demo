import {ref,onMounted} from "vue";
import axios from "axios";

export interface userInfo {
    avatar: string;
    email: string;
    name: string;
    phone: string;
    username: string
}

export default function useUserprofile()  {
    const error = ref("no error")
    const success = ref(false)
    const userProfile = ref<userInfo>({
        avatar: '',
        email: "",
        name: "",
        phone: "",
        username: ""
    })
    const fetchUserProfile = async () =>  {
        try{
            const response  = await axios.get<userInfo>("/api/user/profile")
            if(response.status === 200){
                userProfile.value = response.data
                success.value = true
            }else if(response.status === 400 || response.status === 401){
                error.value = "Failed to fetch"
            }else{
                error.value = "Failed to fetch"
            }
        }catch(e){
            error.value = "Failed to fetch"
        }

    } 
    
    onMounted(() => {
        fetchUserProfile();
      });

    return{
        error,
        success,
        userProfile
    }
}
