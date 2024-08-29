<template>
    <div class="team-join-container">
      <el-form :model="request" label-width="100px" class="demo-ruleForm">
        <el-form-item label="InviteToken">
          <el-input v-model="request.inviteToken" placeholder="请输入邀请码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onJoinTeamClick">Join</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>


<script lang="ts" name="teamJoin" setup>
import { JoinRequest, type TeamJoinRequest } from '@/hooks/Team/useTeamjoin';
import { ElMessage } from 'element-plus';
import {ref, type Ref} from 'vue';
let request: Ref<TeamJoinRequest> =ref({
    inviteToken: ''
})

async function onJoinTeamClick(){
    const result = await JoinRequest(request.value);
    if(result.statusCode === 200){
        ElMessage.success(result.success)
    }
    else{
        ElMessage.error(result.error)
    }
}

</script>


<style scoped>
.team-join-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-ruleForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.el-form-item {
  width: 100%;
  margin-bottom: 15px;
}

.el-input {
  width: 100%;
}

.el-button {
  width: 100%;
}
</style>