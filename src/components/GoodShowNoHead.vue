<template>
  <div>
    <slot name="title"></slot>
    <van-grid :border="false" :column-num="2" :gutter="4">
      <van-grid-item v-for="item in list" :key="item.id" @click="refresh(item)">
        <!-- :to="'/gooddetail?id=' + item.id" -->
        <van-image :src="item.list_pic_url" />
        <div class="text">
          <p>{{ item.name }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Goodshownohead",

  components: {},
  props: ["list"],
  data() {
    return {};
  },

  mounted() {},

  methods: {
    refresh(i) {
      // console.log(i);
      this.$router.push({ path: "/gooddetail", query: { id: i.id } });
      // 为了防止在本页面路由时不刷新的问题
      if (this.$route.path == "/gooddetail") {
        this.$router.go(0);
      }
      console.log(this.$route.path == "/gooddetail");
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 98%;
  margin: 0 auto;
  margin-top: 20px;
  hr {
    width: 25%;
    height: 0.5px;
    background-color: rgb(158, 154, 154);
  }
}
</style>
