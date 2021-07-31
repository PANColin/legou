<template>
  <div>
    <div class="top" @click="$router.push('/login')">
      <div class="img">
        <van-image round width="100px" height="100px" :src="avatarUrl" />
      </div>
      <div class="user">用户</div>
    </div>
    <van-grid>
      <van-grid-item icon="star-o" text="收藏" to="/collect" />
      <van-grid-item icon="shop-collect-o" text="订阅店铺" />
      <van-grid-item icon="service-o" text="人工客服" />
      <van-grid-item icon="setting-o" text="设置" />
    </van-grid>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(value, i) in gridList"
        :key="i"
        :icon="value.icon"
        :text="value.name"
        :to="value.url"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Shopcart",

  components: {},

  data() {
    return {
      avatarUrl: "",
      gridList: [
        {
          name: "意见反馈",
          url: "/envelop",
          icon: "envelop-o",
        },
        {
          name: "我的足迹",
          url: "/footprint",
          icon: "clock-o",
        },
        {
          name: "地址管理",
          url: "/address",
          icon: "apps-o",
        },
        {
          name: "帮助中心",
          url: "/help",
          icon: "question-o",
        },
        {
          name: "消息",
          url: "/message",
          icon: "comment-o",
        },
        {
          name: "VIP",
          url: "/vip",
          icon: "vip-card-o",
        },
      ],
    };
  },

  mounted() {
    this.avatarUrl = JSON.parse(localStorage.getItem("userInfo")).avatarUrl;
  },

  methods: {},
};
</script>

<style scoped lang="less">
.top {
  display: flex;
  align-items: center;
  background-color: rgba(24, 23, 23, 0.3);
  .img {
    padding: 20px;
  }
  .user {
    font-size: 20px;
  }
}
</style>
