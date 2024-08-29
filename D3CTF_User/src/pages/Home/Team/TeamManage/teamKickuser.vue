<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="teamInfo && teamInfo.members">
        <el-form-item class="members-list">
          <ul>
            <li v-for="(member, index) in teamInfo.members" :key="member.user_id" class="member-item">
              <span>{{ member.username }}</span>
              <el-button @click="showConfirmationDialog(member)" type="danger" size="small">Remove Member</el-button>
            </li>
          </ul>
        </el-form-item>
      </div>
      <div v-else>No members found.</div>
  
      <!-- 确认对话框 -->
      <el-dialog v-model="dialogVisible" title="Confirm" width="30%">
        Are you sure you want to remove this member?
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="confirmKickMember">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script lang="ts" name="teamKickuser" setup>
  import { useTeamkickuser, type KickUserRequest } from '@/hooks/Team/useTeamkickuser';
  import { onMounted, ref, type Ref } from 'vue';
  import { useTeamProfile, type ModelsMember, type TeamInfo } from '@/hooks/Team/useTeamprofile';
  import { ElMessage } from 'element-plus';
  
  const { loading, teamInfo, fetchTeamInfo } = useTeamProfile();
  onMounted(() => {
    fetchTeamInfo();
  });
// let teamInfo : TeamInfo = ref({
//     avatar: '',
//     bio: '',
//     captainName: '',
//     inviteToken: '',
//     members: [
//         {
//             user_id :0 ,
//             username: 'test1'
//         },
//         {   
//             user_id :1 ,
//             username: 'test2'
//         }
//     ],
//     team_id: 0,
//     team_name: ''
// });
  let requestdata: Ref<KickUserRequest> = ref({});
  const dialogVisible = ref(false); // 控制对话框的显示状态
  let selectedMember: Ref<ModelsMember | null> = ref(null); // 保存待删除的成员
  
  const showConfirmationDialog = (member: ModelsMember) => {
    selectedMember.value = member;
    dialogVisible.value = true;
  };
  
  const confirmKickMember = async () => {
    try {
      if (selectedMember.value) {
        requestdata.value.teamID = teamInfo.team_id;
        requestdata.value.userID = selectedMember.value.user_id;
        const response = await useTeamkickuser(requestdata.value);
        if (response.statusCode === 200) {
          ElMessage.success(response.success);
          dialogVisible.value = false; // 关闭对话框
          fetchTeamInfo();
        } else {
          ElMessage.error(response.error);
        }
      }
    } catch (error) {
      ElMessage.error('未知错误');
    }
  };
  
  </script>
  
  <style scoped>
  /* 添加样式 */
  .members-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 靠左对齐 */
    gap: 10px; /* 成员之间的间隙 */
    width: 100%; /* 填满宽度 */
  }
  
  .member-item {
    display: flex;
    justify-content: space-between; /* 内容两端对齐 */
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%; /* 固定宽度 */
  }
  
  .member-item span {
    flex-grow: 1; /* 占据剩余空间 */
    margin-right: 10px;
  }
  
  /* 调整按钮样式 */
  .el-button--small {
    padding: 5px 10px; /* 调整内边距 */
    font-size: 12px; /* 调整字体大小 */
  }
  </style>