<template>
    <div class="archive-page">
        <!-- 返回按钮 -->
        <div class="header">
            <!-- 返回按钮 -->
            <div class="back-button" @click="goBack">
                <img src="/static/fanhui.png" class="back-icon" />
            </div>
            <div class="archive-title">
                我的志愿记录
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

const records = ref([]); // 动物档案数据

// 在组件挂载后加载数据
onMounted(() => {
    loadRecords();
});

// 实现加载动物档案数据的逻辑
function loadRecords() {
    // 模拟加载动物档案数据
}

function goBack() {
    uni.navigateBack();
}
</script>

<style scoped>
/* 样式保持不变 */
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
    top: 2.7vh;
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
