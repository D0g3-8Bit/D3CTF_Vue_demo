<template>
    <div class="centered">
      <el-input v-model="id" placeholder="请输入用户ID"></el-input>
      <el-button @click="handleDelete">删除用户</el-button>
    </div>
  </template>
  
  <script lang="ts" name="DeleteUser" setup>
  import { useDeleteUser } from '@/hooks/User/useDeleteuser';
  import { ElMessage } from 'element-plus';
import { ref } from 'vue';
  
  // 使用自定义钩子
  const deleteUser = useDeleteUser();
  const id = ref<number>();
  // 删除处理函数
  const handleDelete = async () => {
    try {
        await deleteUser(id.value as number);
        ElMessage.success('删除成功');
    } catch (error) {
      ElMessage.error('删除失败');
    }
  };
  </script>


<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* 这里假设父容器高度已设置 */
}
</style>