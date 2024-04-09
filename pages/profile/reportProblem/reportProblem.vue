<template>
    <div class="archive-page">
        <!-- 返回按钮 -->
        <div class="header">
            <!-- 返回按钮 -->
            <div class="back-button" @click="goBack">
                <img src="/static/fanhui.png" class="back-icon" />
            </div>
            <div class="archive-title">
                问题反馈
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

const records = ref([]); // 动物档案数据
const router = useRouter();

// 实现加载动物档案数据的逻辑
function loadRecords() {
    // 逻辑实现部分
}

// 实现返回上一页

function goBack() {
    uni.navigateBack();
}

// 实现跳转到搜索页
function goToSearch() {
    router.push('/search');
}

// 根据顶部分区导航过滤档案
function filterCategory(category) {
    // 过滤逻辑
}

// 根据侧边栏学部分区过滤档案
function filterDepartment(department) {
    // 过滤逻辑
}

// 查看动物详细信息
function viewDetails(record) {
    router.push(`/detail/${record.id}`);
}

onMounted(() => {
    loadRecords();
});
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
