<template>
  <div id="app">
    <!-- 可以通过 transition 组件使用内置的动画 -->
    <!-- <transition name="van-fade"></transition> -->

    <!-- 需要缓存的页面展示 -->
    <!-- <router-link to="/login">登录</router-link> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepActive" />
    </keep-alive>
    <!-- 不需要缓存的页面展示 -->
    <router-view v-if="!$route.meta.keepActive" />

    <van-tabbar route v-if="isShow">
      <van-tabbar-item
        replace
        :to="item.url"
        :icon="item.icon"
        v-for="(item, i) in tabbarList"
        :key="i"
        >{{ item.name }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      tabbarList: [
        {
          name: "首页",
          url: "/home",
          icon: "home-o",
        },
        {
          name: "专题",
          url: "/topic",
          icon: "bag-o",
        },
        {
          name: "分类",
          url: "/classify",
          icon: "apps-o",
        },
        {
          name: "购物车",
          url: "/shopcart",
          icon: "shopping-cart-o",
        },
        {
          name: "个人中心",
          url: "/personal",
          icon: "contact",
        },
      ],
    };
  },
  watch: {
    $route: function (to) {
      var arr = ["/home", "/topic", "/classify", "/shopcart", "/personal"]; // 白名单   /home/search
      if (arr.includes(to.path)) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      // console.log(to, form);
    },
  },
  created() {},
};
</script>

<style>
@import "~@/assets/css/base.css";
</style>
