<template>
    <el-form :model="updateUserData" :rules="formRules" ref="updateFormRef" label-width="80px">
      <el-form-item label="ID" prop="id">
        <el-input v-model="updateUserData.id" />
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="updateUserData.name" />
      </el-form-item>
      <el-form-item label="Username" prop="username">
        <el-input v-model="updateUserData.username" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="updateUserData.email" />
      </el-form-item>
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="updateUserData.phone" />
      </el-form-item>
      <el-form-item label="Role" prop="Role">
        <el-input v-model.number="updateUserData.Role" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Update User</el-button>
      </el-form-item>
    </el-form>
  </template>

<script lang="ts" name="updateUser" setup>
import {ref, type Ref} from 'vue'
import { useUpdateuser,type updateRequest } from '@/hooks/User/useUpdateuser';
import { ElMessage } from 'element-plus';

let updateUserData: Ref<updateRequest> = ref({
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  Role: 0
})

const formRules = {
  id: [{ required: true, message: 'ID is required', trigger: 'blur' }],
}
async function submitForm() {
  const result = await useUpdateuser(updateUserData.value)
  if(result.status === 200){
        ElMessage.success(result.success)
    }else{
        ElMessage.error(result.error)
    }
}

</script>


