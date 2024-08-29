import axios  from "axios";
import { ref } from "vue";

export  function useDeleteUser() {
    const deleteUser = async (id: number) => {
        try {
            await axios.delete('/api/admin/deleteUser',{
                data: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    return deleteUser;
}