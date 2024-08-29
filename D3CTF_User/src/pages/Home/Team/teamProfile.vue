<template>
    <div class="team-info">
      <div v-if="loading">加载中...</div>
      <div v-else-if="!teamInfo">当前没有队伍信息,请确认是否加入或创建队伍</div>
      <div v-else>
        <div class="team-details">
          <p class="info-item">Team ID: {{ teamInfo.team_id }}</p>
          <p class="info-item">Team Name: {{ teamInfo.team_name }}</p>
          <p class="info-item">Description: {{ teamInfo.bio }}</p>
          <p class="info-item">captainName: {{ teamInfo.captainName }}</p>
          <p class="info-item">inviteToken: {{ teamInfo.inviteToken }}</p>
          <img v-if="teamInfo.avatar" :src="teamInfo.avatar" alt="Team Avatar" />
        </div>
        <button @click="toggleMembers" class="text-button">成员列表</button>
        <transition name="fade-slide">
          <div v-show="showMembers" class="members-list">
            <ul>
              <li v-for="(member, index) in teamInfo.members" :key="index" class="info-item">
                <span class="user-info">UseroId: {{ member.user_id }}, Username: {{ member.username }}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
</template>

<script setup name="teamProfile" lang="ts">
import { onMounted, ref } from 'vue';
import { useTeamProfile } from '@/hooks/Team/useTeamprofile';

const { loading, teamInfo, fetchTeamInfo } = useTeamProfile();

// 控制成员列表是否显示
const showMembers = ref(false);

// 切换成员列表的显示状态
function toggleMembers() {
  showMembers.value = !showMembers.value;
}

//在组件挂载时调用 fetchTeamInfo 方法
onMounted(() => {
  fetchTeamInfo();
});
</script>

<style scoped>
/* 添加一些样式以美化组件 */

.team-info {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: hsl(0, 20%, 91%);
}

.team-details {
  margin-bottom: 20px;
}

.info-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 40px;
}

.team-details img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.text-button {
  /* 设置按钮样式以匹配文本框 */
  display: inline-block;
  padding: 8px 12px; /* 调整内边距以匹配文本框 */
  font-size: 14px; /* 调整字体大小 */
  color: #333; /* 文字颜色 */
  background-color: hsl(0, 20%, 91%); /* 背景颜色 */
  border: 1px solid #ccc; /* 边框样式 */
  border-radius: 4px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停时的指针样式 */
  transition: background-color 0.3s ease; /* 背景颜色过渡效果 */
}

.text-button:hover {
  background-color: #e0e0e0; /* 鼠标悬停时的背景颜色 */
}

.members-list {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
.user-info {
  display: block;
  font-weight: bold; /* 可以调整字体粗细 */
  font-size: 16px; /* 可以调整字体大小 */
  color: #333; /* 可以调整文字颜色 */
}

.members-list ul {
  list-style-type: none;
  padding: 0;
}

.members-list li {
  margin-bottom: 5px;
}

/* 过渡动画样式 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>