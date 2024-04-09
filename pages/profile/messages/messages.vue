<template>
  <div class="archive-page">
    <!-- 返回按钮 -->
    <div class="header">
      <!-- 返回按钮 -->
      <div class="back-button" @click="goBack">
        <img src="/static/fanhui.png" class="back-icon" />
      </div>
      <div class="archive-title">
        我的消息
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="box" hover-class="boxHover">
      <div class="inner" hover-class="innerHover">
        此区域还未开放
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const records = ref([]);

// 假定有一个加载动物档案数据的API
// 实际项目中，你需要根据你的API来调整这个方法
const loadRecords = () => {
  // 模拟异步请求数据
  setTimeout(() => {
    records.value = [{ id: 1, name: '动物1' }, { id: 2, name: '动物2' }];
  }, 1000);
};

const router = useRouter();


function goBack() {
    uni.navigateBack();
}

onMounted(() => {
  loadRecords();
});
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fbde95;
  height: 6vh;
  font-size: 22px;
  color: #4d3806;
}

.back-button {
  position: absolute;
  left: 10px;
  top: 1.7vh;
  z-index: 1000;
}

.back-icon {
  width: 30px;
  height: 30px;
}

.archive-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0vh;
  background-color: #fbde95;
  height: 6vh;
  font-size: 22px;
  color: #4d3806;
}

.archive-page {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffedbe;
  height: 95vh;
  top: 5vh;
}

.box {
  width: 60vw;
  height: 100px;
  position: absolute;
  top: 45%;
  left: 25vw;
  margin: 5px;
  font-size: 30px;
}
</style>
