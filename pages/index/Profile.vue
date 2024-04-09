<template>
  <view class="archive-page">
    <view class="bar" :style="{ 'margin-top': statusBarHeight + 'px', 'height': navBarHeight + 'px' }">
      <view class="back-button" @click="goBack">
        <image src="/static/fanhui.png" class="back-icon" />
      </view>
      <view class="search-bar" @click="goToSearch">
        <uni-search-bar v-model="keyword" placeholder="搜索" radius="15" clearbutton="none"></uni-search-bar>
      </view>
    </view>
    <view class="top-nav">
      <view class="nav-item" @click="filterCategory('onCampus')">
        <image src="../../static/weizhi.png" class="img"></image>
        <text :class="activeNav == 'onCampus' ? 'active' : ''">在校</text>
      </view>
      <view class="nav-item" @click="filterCategory('adopted')">
        <image src="../../static/103.png" class="img"></image>
        <text :class="activeNav == 'adopted' ? 'active' : ''">领养</text>
      </view>
      <view class="nav-item" @click="filterCategory('starCats')">
        <image src="../../static/104.png" class="img"></image>
        <text :class="activeNav == 'starCats' ? 'active' : ''">喵星</text>
      </view>
    </view>
    <view class="main-content">
      <view class="sidebar">
        <view class="department-item" @click="filterDepartment('liberalArts')">
          <image src="/static/weizhi.png" class="department-icon" />
          <text :class="activeName == 'liberalArts' ? 'active' : ''">文理学部</text>
        </view>
        <view class="department-item" @click="filterDepartment('informatics')">
          <image src="/static/weizhi.png" class="department-icon" />
          <text :class="activeName == 'informatics' ? 'active' : ''">信息学部</text>
        </view>
        <view class="department-item" @click="filterDepartment('engineering')">
          <image src="/static/weizhi.png" class="department-icon" />
          <text :class="activeName == 'engineering' ? 'active' : ''">工学部</text>
        </view>
        <view class="department-item" @click="filterDepartment('medical')">
          <image src="/static/weizhi.png" class="department-icon" />
          <text :class="activeName == 'medical' ? 'active' : ''">医学部</text>
        </view>
      </view>
      <scroll-view class="record-list" scroll-y="true">
        <view class="animal-list-container">
          <view class="animal-card" v-for="(animal, index) in animals" :key="index">
            <view class="icons"></view>
            <view class="image-container">
              <image :src="animal.image" class="animal-image" />
              <text class="animal-name">{{ animal.name }}</text>
            </view>
            <view class="details-button" @click="viewDetails(animal)">
              <text>查看详情 ></text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>


<script setup>
  import {
    onShow
  } from '@dcloudio/uni-app';
  import {
    ref,
    onMounted
  } from 'vue';

  const statusBarHeight = ref(0);
  const navBarHeight = ref(0);
  const activeName = ref('liberalArts');
  const activeNav = ref('onCampus');
  const keyword = ref('');
  const animals = ref([]);
  const animals_arr = ref([{
      id: 1,
      name: '蛋白',
      gender: '♀',
      breed: 'XXXX',
      status: ['已绝育', '已免疫', '已驱虫'],
      conditionName: '在校',
      condition: 'onCampus',
      positionName: '信息学部',
      position: 'informatics',
      feature: '头顶一缕刘海是灰色的，其他毛毛都是白色',
      range: '信息学部XXX楼附近',
      personality: '有点怕陌生人',
      sterilization: '否',
      health: '健康状况良好',
      social: '通常会与另外两位小伙伴一起出现玩耍',
      other: 'XXX',
      image: '/static/蛋白.png',
      date: '2021-10-01',
      applications: 1,
      requirements: ['有宠物经验', '有时间陪伴', '有责任心']
    },
    {
      id: 2,
      name: '新鲜哥',
      gender: '♂',
      breed: 'XXXX',
      status: ['未绝育', '已免疫', '已驱虫'],
      conditionName: '喵星',
      condition: 'starCats',
      positionName: '文理学部',
      position: 'liberalArts',
      feature: '梅狸猫',
      range: '文理学部XXX楼附近',
      personality: '偷吃外卖',
      sterilization: '否',
      health: '健康状况良好',
      social: '喜欢打架，只吃新鲜猫粮',
      other: 'XXX',
      image: '/static/新鲜哥.jpg',
      date: '2021-10-02',
      applications: 0,
      requirements: ['无']
    },
    {
      id: 3,
      name: '苹果猫',
      gender: '♀',
      breed: 'XXXX',
      status: ['未绝育', '已免疫', '未驱虫'],
      conditionName: '在校',
      condition: 'onCampus',
      positionName: '工学部',
      position: 'engineering',
      feature: '小猫咪',
      range: '工学部树下面',
      personality: '喜欢靠着苹果睡觉',
      sterilization: '否',
      health: '健康状况良好',
      social: '喜欢和朋友一起睡觉',
      other: 'XXX',
      image: '/static/苹果猫.jpg',
      date: '2021-10-03',
      applications: 2,
      requirements: ['有宠物经验', '有时间陪伴', '有责任心']
    },
    {
      id: 4,
      name: '妙妙',
      gender: '♂',
      breed: 'XXXX',
      status: ['已绝育', '已免疫', '未驱虫'],
      conditionName: '领养',
      condition: 'adopted',
      positionName: '医学部',
      position: 'medical',
      feature: '大海参',
      range: '到处溜达',
      personality: '讨厌刺挠',
      sterilization: '否',
      health: '健康状况良好',
      social: '喜欢和白猫打架',
      other: 'XXX',
      image: '/static/妙妙.jpg',
      date: '2021-10-04',
      applications: 3,
      requirements: ['有宠物经验', '有时间陪伴', '有责任心']
    },
    {
      id: 5,
      name: '卷宝',
      gender: '♂',
      breed: 'XXXX',
      status: ['已绝育', '已免疫', '已驱虫'],
      conditionName: '领养',
      condition: 'adopted',
      positionName: '信息学部',
      position: 'informatics',
      feature: '可爱狸花猫',
      range: '图书馆附近出没',
      personality: '性格温和',
      sterilization: '是',
      health: '健康状况良好',
      social: '喜欢和人类玩耍',
      other: 'XXX',
      image: '/static/卷宝.jpg',
      date: '2021-10-05',
      applications: 4,
      requirements: ['有宠物经验', '有时间陪伴', '有责任心']
    },
    {
      id: 6,
      name: '雪花',
      gender: '♀',
      breed: 'XXXX',
      status: ['已绝育', '已免疫', '已驱虫'],
      conditionName: '在校',
      condition: 'onCampus',
      positionName: '文理学部',
      position: 'liberalArts',
      feature: '可爱大猫',
      range: '到处溜达',
      personality: '性格温和',
      sterilization: '是',
      health: '健康状况良好',
      social: '喜欢和人类玩耍',
      other: 'XXX',
      image: '/static/雪花.png',
    },

    // ...其他动物数据
  ]);
  onShow(() => {
    getFilter()
  })
  const getFilter = () => {
    animals.value = animals_arr.value.filter(v => v.condition == activeNav.value && v.position == activeName.value)
  }
  /* const animals=ref([]); */
  /*const apiUrl='https://api.strayanimals.temp.ziqiang.net.cn/pets/pets';

  async function request(url, method='GET',data=null)
  {
    try{
      const options={
        url,
        method,
      };
      if(data)
      {
        options.data=data;
      }
      const response=await axios(options);
      return response.data;
    }catch(error){
      console.error(`Error ${method} ${url}:`,error);
      throw error;
    }
  }
  async function getAnimals()
  {
    animals.value=await request(`${apiUrl}/animals`);
  }
  async function updateAnimalDetail(id, newData)
  {
    return await request(`${apiUrl}/animals/${id}`,'PUT',newData);
  }
  async function deleteAnimal(id)
  {
    return await request(`${apiUrl}/animals/${id}`,'DELETE');
  }*/
  function goBack() {
    uni.navigateBack(); // 实现返回上一页
  }

  function goToSearch() {
    uni.navigateTo({
      url: '/pages/index/Profile/search',
    }); // 实现跳转到搜索页
  }


  function filterCategory(category) {
    activeNav.value = category;
    getFilter()
  }

  function filterDepartment(department) {
    activeName.value = department;
    getFilter()
  }

  function viewDetails(item) {
    /* uni.navigateTo({
      url: `/pages/index/Profile/detail1?id=${animalId}`,
    }); */
    // 由于item是一个对象 不能直接传递到下一页 所以这里需要转成json字符串，如果后续对接了后端只需要传id即可就不需要转json字符串了
    uni.navigateTo({
      url: `/pages/index/Profile/detail1?item=${JSON.stringify(item)}`,
    });
  }

  onMounted(async () => {
    try {
      if (uni.canIUse('getMenuButtonBoundingClientRect')) {
        const sysInfo = uni.getSystemInfoSync();
        statusBarHeight.value = sysInfo.statusBarHeight;
        const rect = uni.getMenuButtonBoundingClientRect();
        navBarHeight.value = (rect.top - sysInfo.statusBarHeight) * 2 + rect.height;
      } else {
        uni.showToast({
          title: '您的微信版本过低，界面可能会显示不正常',
          icon: 'none',
          duration: 4000,
        });
      }

    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  });
</script>


<style scoped lang="scss">
  .archive-page {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #fceec5;
    /* 页面背景色 */

    .bar {
      display: flex;
      align-items: center;
      background: #fceec5;
      padding-bottom: 10rpx;
    }

    .search-bar {
      width: 65%;

    }

    .back-button {
      width: 10%;
    }
  }

  .back-icon {
    width: 30px;
    height: 30px;

  }

  .search-input {
    width: 100%;
    border-radius: 15px;
    border: none;
    padding: 10px;
    font-size: 16px;
  }

  .top-nav {
    display: flex;
    justify-content: space-around;
    background-color: #FBDE95;
    /* 导航栏背景色 */
    padding: 10px 0;
    top: 20vh;
  }

  .nav-item {
    color: #604500;
    /* 文字颜色 */
    font-weight: bold;
    display: flex;
    align-items: center;

    .img {
      margin-right: 8rpx;
      width: 30rpx;
      height: 30rpx;
    }
  }

  .main-content {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    // flex: 0 0 20vw;
    width: 22vw;
    background-color: #fefbed;
    /* 侧边栏背景色 */
    padding: 20px 10px;
  }

  .department-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    /* 间隔 */
  }

  .department-icon {
    width: 20px;
    height: 20px;
    margin-left: 0vw;
  }

  .record-list {
    flex: 1;
    padding: 10px;
  }

  .record-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 20px;
  }

  .animal-list-container {
    display: flex;
    flex-wrap: wrap;
  }

  .animal-card {
    width: calc((100vw - 22vw - 40px - 2vw) / 2);
    margin-right: 2vw;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 40px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    padding: 15rpx 0;
    position: relative;

    &:nth-child(2n) {
      margin-right: 0;
    }

    .icons {
      position: absolute;
      width: 16rpx;
      height: 16rpx;
      background: #FFDE8A;
      border-radius: 50%;
      left: 10px;
    }
  }

  .image-container {
    // background: url(image.png);
    width: 30vw;
    height: 30vw;
    margin-top: 0vw;
    border-radius: 50%;
    position: relative;
  }

  .animal-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .animal-name {
    position: absolute;
    background: #FFDE8A;
    border-radius: 0px 12px 12px 0px;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-weight: bold;
    width: 150rpx;
    overflow: hidden;
    line-height: 50rpx;
    text-align: center;
    color: #604500;
    bottom: -30rpx;
    left: -10rpx;
    /* Adjust as needed */
    z-index: 10;
  }

  .details-button {
    font-family: SimHei;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #604500;
    margin: 46rpx -10vw 0 0;
    /* Adjust as needed */
    cursor: pointer;
  }

  .active {
    color: #f19747;
  }
</style>