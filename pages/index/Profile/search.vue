<template>
    <view class="search-page">
        <view class="header">
            <view class="back-button" @click="goBack">
                <image src="/static/fanhui.png" class="back-icon" />
            </view>
            <view class="archive-title">
                <image src="/static/fangdajing.png" class="search-icon" />
                搜索
            </view>
        </view>
        <image src="/static/search1.png" class="background1" />
        <image src="/static/search2.png" class="background2" />
        <view class="search-container">
            <input v-model="keyword" type="text" placeholder="请输入名字/范围/品种" class="search-input"
                @keyup.enter="performSearch(keyword)" />
            <image src="/static/magnifyingglass.png" class="magnifyingglass" @click="performSearch(keyword)" />
        </view>
        <view class="history-box">
            <text class="history-title">历史记录</text>
            <view class="history-list">
                <view class="history-item" v-for="(item, index) in history" :key="index" @click="performSearch(item)">
                    <text>{{ item }}</text>
                </view>
            </view>
            <view class="more-history" @click="loadMoreHistory">
                <text>查看更多</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const keyword = ref('');
const history = ref(['信息学部','蛋白','在校']);

onMounted(() => {
    const historyData = uni.getStorageSync('historySearch');
    if (historyData) {
        try {
            history.value = JSON.parse(historyData);
        } catch (e) {
            console.error('解析历史记录失败:', e);
        }
    }
});


// 返回上一页
const goBack = () => {
    uni.navigateBack();
};

// 执行搜索
const performSearch = () => {
    const searchKeyword = keyword.value.trim();
    if (searchKeyword) {
        const index = history.value.indexOf(searchKeyword);
        if (index !== -1) {
            history.value.splice(index, 1);
        }
        history.value.unshift(searchKeyword);
        if (history.value.length > 10) {
            history.value.length = 10; // Keep only the latest 10 entries
        }
        uni.setStorageSync('historySearch', JSON.stringify(history.value));
        // Implement the search logic
    }
};


// 加载更多历史记录
const loadMoreHistory = () => {
    console.log('加载更多历史记录');
    // 可以根据需求实现，例如打开一个新页面展示所有历史记录
};
</script>


<style scoped>
.search-page {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #ffedbe;
}


.header {
    display: flex;
    flex-direction: column;
}

.back-button {
    position: absolute;
    left: 10px;
    top: 6.7vh;
    z-index: 1000;
}

.back-icon {
    width: 30px;
    height: 30px;
}

.search-icon {
    position: absolute;
    width: 22.12px;
    height: 26px;
    left: 37vw;
}



.archive-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;
    background-color: #fbde95;
    height: 6vh;
    font-size: 22px;
    color: #4d3806;

}

.background1{
    position: absolute;
    width: 70vw;
    height: 43.75vh;
    left: 15vw;
    top: 30vw;
    z-index: 1;
}

.background2{
    position: absolute;
    width: 40vw;
    height: 18vh;
    left: 30vw;
    top: 20vh;
    z-index: 1;
}

.search-container {
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: #FFFFFF;
    /* 设置搜索框背景颜色为白色 */
    position: absolute;
    width: 371px;
    height: 42.65px;
    left: calc(50% - 371px/2);
    /* 居中对齐 */
    top: 245px;
    z-index:2;
}

.search-input {
    flex: 1;
    border: none;
    padding-left: 10px;
    font-size: 16px;
    outline: none;
}


.magnifyingglass {
    width: 18px;
    height: 20px;
    position: absolute;
    top: 50%;
    right:0vw;
    transform:translate(-50%, -50%);
}

/* 历史记录框 */
    .history-box {
        position: absolute;
        width: 90vw;
        height: 400px;
        left:5vw; 
        top: 434px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 12px 12px 12px 12px;
        padding-top: 20px;
        padding-bottom: 20px; 
        overflow: auto; 
        opacity: 0.95;
        z-index:3;
    }

    /* 历史标题 */
    .history-title {
        font-size: 22px;
        color: #604500;
        text-align: center;
        margin-top: 5vh;
        margin-bottom: 20px;
        padding-left: 20px;
        padding-bottom: 20px;
        opacity:1;
        z-index:3;
    }

    /* 历史记录项目 */
    .history-item {
        background: #D9D9D9;
        border-radius: 4px;
        padding: 5px 10px; /* 根据需要调整 */
        margin-bottom: 10px; /* 根据需要调整 */
        font-size: 16px;
        color: #604500;
        text-align: center;
        display: inline-block; /* 使宽度根据内容自动调整 */
        margin-right: 30px; /* 根据需要调整 */
        opacity:1;
        z-index:3;
        font-family: SimHei;
    }
    .history-list {
        display: flex;
        flex-wrap: wrap;
        padding-left: 30px;
        padding-top: 20px;
        z-index:3;
    }

    .more-history {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        cursor: pointer;
        font-family: SimHei;
        font-size: 16px;
        color: #604500;
    }

    .down-arrow {
        width: 20px; /* 根据实际图片大小调整 */
        height: 20px; /* 根据实际图片大小调整 */
        margin-left: 5px; /* 间隔调整 */
    }
</style>
