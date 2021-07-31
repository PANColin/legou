<template>
  <div class="goods-show">
    <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="item in list" :key="item.id" :to="'/gooddetail?id=' + item.id">
        <van-image :src="item.list_pic_url" />
        <h3 class="van-ellipsis">{{ item.name }}</h3>
        <p class="van-ellipsis">{{ item.goods_brief }}</p>
        <p class="van-ellipsis retail_price">￥{{ item.retail_price }}</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Goodshowindex",

  components: {},

  data() {
    return {};
  },
  props: ["list"],

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
// newGoods首页数据的展示
.goods-show {
  // display: flex;
  width: 100%;
  overflow: auto;
  // text-align: center;
  .van-grid {
    flex-wrap: nowrap;
    .van-grid-item {
      width: 35%;

      h3,
      p {
        width: 100%;
      }
      .retail_price {
        color: #f00;
      }
    }
  }
}
</style>
