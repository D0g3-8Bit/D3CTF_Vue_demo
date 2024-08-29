<template>
  <div class="form-container">
    <h2 class="form-title">Create ur team </h2>
      <el-form ref="teamFormRef" :model="teamData" label-width="80px" class="center-form" :rules="formRules">
          <el-form-item label="团队名称" prop="name">
              <el-input class="input-name" v-model="teamData.name" required></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
              <el-input class="input-bio" type="textarea" v-model="teamData.bio" required></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onCreateTeamClick">创建队伍</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>


<script lang="ts" name = "teamCreate" setup>
import { useTeamCreate, type TeamCreateRequest  } from '@/hooks/Team/useTeamcreate';
import {reactive, ref, type Ref} from 'vue';
import { ElMessage } from 'element-plus';

const teamData : Ref<TeamCreateRequest> = ref({
  name: '',
  bio: ''
});

async function onCreateTeamClick() {
      try {
        const result = await useTeamCreate(teamData.value);
        if (result.statusCode === 200) {
          ElMessage.success(result.message);
        } else if (result.statusCode === 400) {
          ElMessage.error(result.message);
        } else if (result.statusCode === 401) {
          ElMessage.error(result.message);
        } else if (result.statusCode === 500) {
          ElMessage.error(result.message);
        } else {
          ElMessage.error('未知错误');
        }
      } catch (error) {
        console.error('创建队伍失败:', error);
      }
    }
    const formRules = reactive({
    name: [
        { required: true, message: '请输入团队名称', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入描述', trigger: 'blur' }
    ]
});
</script>


<style scoped>
.form-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    min-height: 100vh; 
    border-radius: 7px;
    flex-direction: column;
}

.center-form {
    height: 100%;
    width: 100%; /* 设置表单宽度 */
    display: flex;
    flex-direction: column; /* 设置为垂直排列 */
}

/* 使标签显示在文本框上方 */
.center-form .el-form-item__label {
    text-align: left; /* 标签左对齐 */
}
.input-bio{
  min-height: 300px; 
  border-radius: 7px;
}
.input-name{
  min-height: 50px;
  border-radius: 7px;
}
.form-title {
    text-align: center; /* 标题居中 */
    margin-bottom: 30px; /* 与表单之间的间距 */
}
</style>