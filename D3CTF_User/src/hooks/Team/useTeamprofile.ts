/*
    @File: useTeamprofile.ts
*/

import axios, { type AxiosResponse, AxiosError} from 'axios';
import { ElMessageBox } from 'element-plus';
import router from '@/routers/index';
import { onMounted, ref } from 'vue';
import TeamProfile from '@/pages/Home/Team/teamProfile.vue';
/**
 * models.TeamWithMembers
 */
export interface TeamInfo {
    avatar?: string;
    bio?: string;
    captainName?: string;
    inviteToken?: string;
    members?: ModelsMember[];
    team_id?: number;
    team_name?: string;
    [property: string]: any;
}

/**
 * models.Member
 */
export interface ModelsMember {
    user_id?: number;
    username?: string;
}

export function useTeamProfile() {
  const loading = ref(true);
  const teamInfo :TeamInfo = ref({});

  async function fetchTeamInfo() {
    try {
      const response: AxiosResponse<any> = await axios.get('/api/team/teamInfo');
      if (response.status === 200 && response.data.success) {
        teamInfo.value = response.data;
      } else {
        console.error('Failed to fetch team info:', response.data);
        teamInfo.value = {};
      }
    } catch (error) {
      const err = error as any;
      if (err.response?.status === 401) {
        handleUnauthorized();
        teamInfo.value = {};
      } else {
        console.error('Error fetching team info:', err);
        teamInfo.value = {};
      }
    } finally {
      loading.value = false;
    }
  }

  /**
   * 处理未授权（401）错误的函数。
   */
  function handleUnauthorized() {
    // 显示提示信息
    ElMessageBox.alert('您尚未登录或会话已过期，请登录后再试。', '提示', {
      confirmButtonText: '确定',
      type: 'warning',
    }).then(() => {
      // 用户点击确定后跳转到登录页面
      router.push('/login');
    });
  }

  return { loading, teamInfo, fetchTeamInfo };
}