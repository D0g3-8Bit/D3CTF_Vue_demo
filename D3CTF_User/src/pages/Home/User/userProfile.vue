<template>
  <div class="container">
    <div class="user-profile">
      <!-- 头像，使用新的类进行居中 -->
      <div class="centered-avatar">
        <div class="avatar">
           <img :src="userProfile.avatar" alt="User Avatar" @click="selectFile" />
            <input type="file" ref="fileInput" accept="image/*" @change="onFileSelected" style="display: none;" />
        </div>
      </div>

      <!-- 用户信息，保持不变 -->
      <div class="info">
        <div class="info-item">
          <span>Username:</span>
          <span>{{ userProfile.username }}</span>
        </div>
        <div class="info-item">
          <span>Name:</span>
          <span>{{ userProfile.name }}</span>
        </div>
        <div class="info-item">
          <span>Email:</span>
          <span>{{ userProfile.email }}</span>
        </div>
        <div class="info-item">
          <span>Phone:</span>
          <span>{{ userProfile.phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="userProfile">
import { onMounted, ref} from 'vue';
import { uploadService } from '@/hooks/User/userUseravatar';
import useUserprofile from '@/hooks/User/useUserprofile';
import { ElMessage } from 'element-plus';
const { error,success, userProfile } = useUserprofile();
// setTimeout(()=>{
//   console.log(userProfile.value.avatar)
// },5000)

const fileInput = ref(null); // 用于引用文件输入框

// 触发文件选择框
const selectFile = () => {
  if (fileInput && fileInput.value) {
    (fileInput.value as HTMLInputElement).click();
} else {
  console.error('File input is not initialized properly.');
}
};

// 文件选择后处理
const onFileSelected = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    uploadService.uploadFile(file).then(() => {
      ElMessage.success("上传成功");
      // 这里可以更新 userProfile.avatar 的值
      // 例如从服务器获取新的头像 URL
    }).catch((error) => {
      ElMessage.error("上传失败");
    });
  }
};
</script>



<style scoped>
.container {
  background-color: #1b7272b8;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.centered-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 4px 6px #f12c2c1a;
  margin-top: -200px; 
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding-left: 10rem; /* 添加左侧内边距 */
}

.info-item {
  display: flex;
  width: 50%;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 1rem; /* 添加底部外边距 */
  border: 2px solid rgba(90, 192, 232, 0.697); /* 边框宽度、样式和颜色 */
  /* 为了美观，可以添加一些内边距 */
  padding: 10px;
  /* 为了确保边框不会影响到布局，可以使用 box-sizing */
  box-sizing: border-box;
  box-shadow: 0 4px 6px #f12c2c1a;
}

.info-item:last-child {
  margin-bottom: 0; /* 移除最后一项的底部外边距 */
}

.info-item span:first-child {
  font-weight: bold;
}

.avatar {
  position: relative;
}

.avatar input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>