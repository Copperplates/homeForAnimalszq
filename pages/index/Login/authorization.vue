<template>
  <view class="container">
    <view class="header">
      <image src="/static/onlylogo.png" class="logo"></image>
      <text class="title">萌物有珈 申请使用</text>
    </view>
    <view class="content">
      <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image class="avatar" :src="avatarUrl"></image>
      </button>
      <view class="nickname">
        <view style="width: 20%;">昵称</view>
        <input type="nickname" class="nickname-input" placeholder="请输入昵称" @change="onChange" />
      </view>

    </view>
    <button formType="submit" class="submit-btn" @click="onSubmit"><text class="textt">提交</text></button>
  </view>
</template>



<script setup>
  import {
    ref
  } from 'vue';

  const avatarUrl = ref('/static/denglu.png');
  const nickname = ref('');
  // const defaultAvatarUrl = '/static/denglu.png';

  const onChooseAvatar = (e) => {
    avatarUrl.value = e.detail.avatarUrl;
  };
  const onChange = (e) => {
    nickname.value = e.detail.value;
  }
  const onSubmit = () => {
    if (nickname.value == '') {
      uni.showToast({
        title: '昵称不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    uni.setStorageSync('userInfo', {
      avatarUrl: avatarUrl.value || defaultAvatarUrl,
      nickname: nickname.value,
    });
    wx.switchTab({
      url: '/pages/index/index'
    });
    // wx.login({
    //   success: (res) => {
    //     if (res.code) {
    //       console.log('登陆成功，获取到的code:', res.code);

    //       /* wx.request({

    //         url: 'https://api.weixin.qq.com/sns/jscode2session',
    //         method:'GET',
    //         data:{
    //           appid:'wx16afb46c6068a4dd',
    //           code:res.code
    //       },
    //       fail:(error)=>{
    //         console.log(error);
    //         wx.showToast({
    //           title: '登录失败',
    //           icon: 'none',
    //           duration: 2000
    //         })
    //       }
    //       }); */
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //       wx.showToast({
    //         title: '登录失败',
    //         icon: 'none',
    //         duration: 2000
    //       });
    //     }
    //   }
    // });
  }
</script>





<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-bottom: 20px;
    margin-left: 5vw;
    margin-top: 4vh;
  }

  .logo {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
  }

  .avatar-wrapper {
    margin-bottom: 20px;
    border-radius: 50%;
    /* width: 23vw; */
    background-color: #fff;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .nickname {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50rpx;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 20rpx 0;
  }

  .nickname-input {
    width: 70%;
    line-height: 1.5;
    font-size: 16px;
    padding: 10px;
    display: block;
    // text-align: center;

  }

  .submit-btn {
    width: 80%;
    height: 5.5vh;
    background-color: #1AAD19;
    color: white;
    padding: 0px;
    border-radius: 5px;
  }

  .submit-btn .textt {
    display: block;
    margin: 0;
    line-height: 5.5vh;
  }
</style>