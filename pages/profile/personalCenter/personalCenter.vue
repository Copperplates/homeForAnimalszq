<template>
  <template>
    <view class="archive-page">
      <view class="header">
        <!-- 返回按钮 -->
        <view class="back-button" @click="goBack">
          <image src="/static/fanhui.png" class="back-icon" />
        </view>
        <view class="archive-title">个人信息</view>
      </view>

      <!-- 主体内容 -->
      <view class="main-content">
        <uni-list>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">头像</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <view style="width: 70px;">
                <uni-file-picker limit="1" :del-icon="false" disable-preview :imageStyles="imageStyles"
                  return-type="object" file-mediatype="image" @select="select" v-model="form.fileLists">
                  <image :src="userAvatar" style="width: 100%;height: 100%;" mode="aspectFit"></image>
                </uni-file-picker>
              </view>
            </template>
          </uni-list-item>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">昵称</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <input class="input-field" type="text" placeholder="请输入" :value="form.nickName" :disabled="isEditing" />
            </template>
          </uni-list-item>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">真实姓名</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <input class="input-field" type="text" placeholder="请输入" :value="form.name" :disabled="isEditing" />
            </template>
          </uni-list-item>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">性别</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <picker @change="bindPickerChange" :value="form.sex" :range="array" :disabled="isEditing">
                <view class="input-field">{{ form.sex ? array[form.sex] : '请选择' }}</view>
              </picker>
            </template>
          </uni-list-item>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">身份证</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <input class="input-field" type="text" placeholder="请输入" :value="form.idCard" :disabled="isEditing" />
            </template>
          </uni-list-item>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">手机</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <input class="input-field" type="text" placeholder="请输入" :value="form.phone" :disabled="isEditing" />
            </template>
          </uni-list-item>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">邮箱</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <input class="input-field" type="text" placeholder="请输入" :value="form.email" :disabled="isEditing" />
            </template>
          </uni-list-item>
          <uni-list-item :showArrow="!isEditing">
            <!-- 自定义 header -->
            <template v-slot:header>
              <view class="slot-box">
                <text class="input-label">个性签名</text>
              </view>
            </template>
            <!-- 自定义 footer-->
            <template v-slot:footer>
              <input class="input-field" type="text" placeholder="请输入" :value="form.personalSignature"
                :disabled="isEditing" />
            </template>
          </uni-list-item>
        </uni-list>
      </view>

      <view class="apply-button" @click="toggleEdit">{{ isEditing ? '编辑' : '保存' }}</view>
    </view>
  </template>
</template>


<script setup>
  import {
    ref,
    onMounted,
    reactive
  } from 'vue';
  const isEditing = ref(false);
  const array = ['男', '女'];
  const userAvatar = ref('/static/photo.png')
  const imageStyles = reactive({
    width: 64,
    height: 64,
    border: {
      radius: '50%'
    }
  })
  // 使用ref创建响应式数据
  const form = ref({
    nickName: '',
    name: '',
    sex: '',
    idCard: '',
    phone: '',
    email: '',
    personalSignature: '',
    fileLists: [],
  });

  // 在组件挂载后获取用户信息
  onMounted(() => {
    const userInfo = uni.getStorageSync('userInfo');
    form.value.nickName = userInfo.nickname;
    userAvatar.value = userInfo.avatarUrl;
    isEditing.value = false; // 根据实际情况设置是否为编辑模式
  });

  const bindPickerChange = (e) => {
    form.value.sex = e.detail.value;
  };

  const goBack = () => {
    uni.navigateBack();
  };
  // 获取上传状态
  const select = (e) => {
    console.log('选择文件：', e)
  };
  // 添加或修改其他方法

  const toggleEdit = () => {
    isEditing.value = !isEditing.value;
    // 如果结束编辑，则保存更改
    if (!isEditing.value) {
      uni.setStorageSync('userInfo', JSON.stringify(form.value));
    }
  };
</script>


<style scoped lang="scss">
  .slot-box {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
  }

  .slot-image {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    margin-right: 0px;
    width: 100px;
    height: 2vh;
  }

  .slot-text {
    flex: 1;
    font-size: 14px;
    color: #4cd964;
    margin-right: 10px;
  }

  .archive-page {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #FFFAF0;
    padding-top: 50px;
    height: calc(100vh - 50px);

  }

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
    top: 6.7vh;
    z-index: 1000;
  }

  .back-icon {
    width: 30px;
    height: 30px;
  }

  .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .input-label {
    font-family: 'PingFang SC';
    font-size: 18px;
    color: #604500;
    margin-right: 10px;
  }

  .input-field {
    /* 减小宽度以适应标签 */
    height: 60rpx;
    line-height: 60rpx;
    text-align: right;
    color: #808080;
  }

  :deep(.uni-list-item) {
    background: #fefbf1 !important;
  }



  .main-content {
    padding: 0 20rpx;
  }

  .submit-button {
    position: fixed;
    width: 152px;
    height: 52px;
    bottom: 0;
    background: #FF9900;
    border-radius: 5px;
    font-family: 'PingFang SC';
    font-size: 24px;
    line-height: 52px;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;
  }

  .submit-confirmation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .confirmation-box {
    background: #FFFFFF;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    width: 70vw;
    height: 40vw;
    display: flex;
    padding-top: 5vw;
    flex-direction: column;
  }

  .confirmation-title {
    font-family: 'PingFang SC';
    font-size: 25px;
    color: #000000;
    text-align: center;
    margin-bottom: 15px;
    font-family: SimHei;
  }

  .confirmation-message {
    font-family: 'SimHei';
    font-size: 22px;
    padding-left: 7vw;
    padding-right: 7vw;
    color: #979797;
    text-align: center;
    margin-bottom: 20px;
  }

  .confirmation-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 5vw;
  }

  .button {
    padding: 0px 0px;
    border-radius: 0px;
    width: 50%;
    height: 14vw;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 22px;
  }

  .cancel-button {
    background-color: #fff;
    border: 1px solid #D8D8D8;
    color: #000000;

  }

  .apply-button {
    width: 100%;
    height: 55px;
    position: fixed;
    background: #FF9900;
    color: #FFFFFF;
    text-align: center;
    line-height: 49px;
    border-radius: 0;
    font-size: 23px;
    margin-top: 20px;
    bottom: 30rpx;
    font-family: SimHei;
  }

  :deep(.file-picker__progress) {
    display: none;
  }
</style>