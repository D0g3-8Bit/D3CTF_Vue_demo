<template>
    <div class="container">
      <div v-if="loading">加载中...</div>
      <div v-else-if="!teamInfo">当前没有队伍信息,请确认是否加入或创建队伍</div>
      <div v-else>
        <div class="team-info">
            <h2 class="title">当前队伍</h2>
            <div class="team-info">Team id:{{ teamInfo.team_id }}</div>
            <div class="team-info">Team name:{{ teamInfo.team_name }}</div>
            <div class="team-info">captainName: {{ teamInfo.captainName }}</div>
        </div>
        <el-form-item>
              <el-button type="primary" @click="DeleteTeamClick">删除队伍</el-button>
          </el-form-item>
      </div>

    </div>
    
</template>

<script lang="ts" setup name="teamDelete">
import { onMounted } from 'vue';
import { useTeamProfile } from '@/hooks/Team/useTeamprofile';
import { deleteTeam, type TeamDeleteRequest } from '@/hooks/Team/useTeamdelete';
import { ElMessage } from 'element-plus';

const { loading, teamInfo, fetchTeamInfo } = useTeamProfile();
onMounted(() => {
  fetchTeamInfo();
});
const reqdata : TeamDeleteRequest = {
  team_id: teamInfo.team_id
}
async function DeleteTeamClick(){
    try{
        const result = await deleteTeam(reqdata);
        if (result.statusCode === 200) {
          ElMessage.success("注销成功");
        } else if (result.statusCode === 400) {
          ElMessage.error("无效的队伍id");
        } else if (result.statusCode === 401) {
          ElMessage.error("请登录");
        } else if (result.statusCode === 500) {
          ElMessage.error("删除失败");
        }else if (result.statusCode === 403){
          ElMessage.error("this is not for u");
        } else {
          ElMessage.error('未知错误');
        }
      } catch (error) {
        console.error('创建队伍失败:', error);
      }
    }
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 设置容器最小高度为视口高度 */
}

.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.title {
  font-size: 1.5em;
  margin-bottom: 10px;
}
</style>