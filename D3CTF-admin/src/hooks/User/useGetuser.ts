// useGetUser.ts
import { reactive, ref, onMounted, computed } from 'vue';
import axios from 'axios';

export interface User {
  Role?: number;
  activationToken?: string;
  avatar?: string;
  email: string;
  id?: number;
  isActive?: boolean;
  name?: string;
  password?: string;
  phone?: string;
  username?: string;
}

export interface ResponseData {
  page: number;
  size: number;
  total: number;
  users: User[];
}

export interface Request {
  page?: number;
  search?: string;
}

export function useGetUser() {
  const users = reactive<User[]>([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = 10;
  const search = ref('');

  const totalPages = computed(() => Math.ceil(total.value / pageSize));

  const fetchUsers = async (page: number = currentPage.value) => {
    const request: Request = {
      page,
      search: search.value,
    };

    try {
      // 使用 GET 请求，并将参数附加在 URL 上
      const response = await axios.get<ResponseData>('/api/admin/users', {
        params: request
      });
      users.splice(0, users.length, ...response.data.users);
      total.value = response.data.total;
      currentPage.value = response.data.page;
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  const  fetchUsersbySearch = async (searchInput: String = search.value) => {
    try{
        const response = await axios.get<ResponseData>('/api/admin/users',{
            params:{
                search:searchInput
            }
        })
        users.splice(0, users.length, ...response.data.users); //不知道这句是干什么的
        total.value = response.data.total
    }catch(error){
        console.error('Failed to fetch users:', error);
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      fetchUsers(currentPage.value - 1);
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      fetchUsers(currentPage.value + 1);
    }
  };

  onMounted(() => {
    fetchUsers();
  });

  return {
    users,
    total,
    currentPage,
    pageSize,
    search,
    totalPages,
    fetchUsers,
    fetchUsersbySearch,
    prevPage,
    nextPage,
  };
}