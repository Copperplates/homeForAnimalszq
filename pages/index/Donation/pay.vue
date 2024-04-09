<template>
    <view class="success-page">
        <view class="back-button" @click="goBack">
            <image src="/static/fanhui.png" class="back-icon" />
        </view>
        <view class="text">长按二维码付款</view>
        <image class="picture" src="/static/QRcode.png" />
        <view class="input-container">
            <input class="donation-input" type="number" model:value="捐款金额：" 
                placeholder="请输入捐款金额" />
            
        </view>
        <button class="donate-button" @click="sendDonation">确认捐款</button>
    </view>
</template>

<script setup>
import { ref } from 'vue';

const donationAmount = ref(0); // 使用ref创建响应式变量

const goBack = () => {
    uni.navigateBack(); // 实现返回上一页
};

const sendDonation = async () => {
    /* if (donationAmount.value <= 0) {
        uni.showToast({
            title: '请输入有效的捐款金额',
            icon: 'none',
        });
        return;
    } */
    // 替换成你的后端API URL和需要的数据结构
    const apiUrl = 'https://api.strayanimals.temp.ziqiang.net.cn/pets';
    try {
        const [error, response] = await uni.request({
            url: apiUrl,
            method: 'POST',
            data: {
                amount: donationAmount.value,
            },
        });
        if (!error && response.statusCode === 200) {
            uni.showToast({
                title: '捐款成功，感谢您的支持！',
                icon: 'success',
            });
            // 可以在这里添加额外的逻辑，如清除输入或跳转到感谢页面
            donationAmount.value = 0; // 可选：捐款成功后清空输入
        } else {
            // 处理不成功的情况
            uni.showToast({
                title: '捐款失败，请稍后再试',
                icon: 'none',
            });
        }
    } catch (error) {
        console.error('捐款请求失败:', error);
        uni.showToast({
            title: '捐款失败，请检查网络后再试',
            icon: 'none',
        });
    }
};
</script>

<style>
.success-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #fffbf0;
}

.text{
    font-family:SimHei;
    font-weight:600;
    font-size:25px;
    line-height:35px;
    color:#FF9900;
    margin-bottom:5vw;
}

.picture{
    width:50vw;
    height:50vw;
}

.success-icon {
    width: 35vw;
    /* 根据实际图标大小调整 */
    height: 35vw;
    /* 根据实际图标大小调整 */
    display: flex;
    margin-left: 10vw;
    margin-top: -10vh;
    margin-bottom: 2vh;
}

.message {
    display: flex;
    align-items: center;
    justify-content: center;
}

.detail {
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-container {
    width: 100%;
    margin: 10px 10px;
}

.donation-input {
    width: 90%;
    padding: 15px;
    border: 1px solid #f7e8bc;
    border-radius: 5px;
    font-size: 20px;
    color:#FF9900;
    font-family:SimHei;
    margin-left:0vw;
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
.success-message {
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 40px;
    color: #FF9900;
    margin-bottom: 2vh;
    align-items: center;
    justify-content: center;
}

.success-detail {
    font-family: 'PingFang SC';
    font-size: 20px;
    color: #979797;
    margin-bottom: 40px;
}

.button {
    width: 228px;
    height: 48.95px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.2));
}

.confirm-button {
    background: #1CC600;
    color: #FFFFFF;
    font-size: 25px;
}

.cancel-button {
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #D8D8D8;
    font-size: 25px;
}
.donate-button {
    background-color: #fff;
    border-radius: 10%;
    color:#ff8000;
    font-size:20px;
    font-family:SimHei;
}
</style>