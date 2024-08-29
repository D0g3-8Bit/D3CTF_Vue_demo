<template>
    <div>
      <!-- 搜索框 -->
      <el-input v-model="searchInput" placeholder="请输入搜索关键词" @keyup.enter="onSearch">
        <template #append>
          <el-button @click="onSearch">搜索</el-button>
        </template>
      </el-input>
  
      <!-- 用户列表 -->
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="email" label="Email" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="username" label="Username" width="180"></el-table-column>
        <el-table-column prop="phone" label="Phone" width="180"></el-table-column>
      </el-table>
  
      <!-- 分页控件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @prev-click="prevPage"
        @next-click="nextPage"
      >
      </el-pagination>
    </div>
  </template>
  
  <script setup name="Users" lang="ts">
  import { ref, computed } from 'vue';
  import { useGetUser } from '@/hooks/User/useGetuser';
  
  const { users, total, currentPage, pageSize, search, totalPages, fetchUsers,fetchUsersbySearch, prevPage, nextPage } = useGetUser();
  const searchInput = ref('');
  const onSearch = () => {
  fetchUsersbySearch(searchInput.value);
};

  </script>
  
  <style scoped>
  .pagination {
    margin-top: 10px;
  }
  </style>