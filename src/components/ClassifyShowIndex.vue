<template>
  <!-- 分类商品展示 -->
  <div class="goods-show">
    <!-- {{ newCategoryList }} -->
    <div v-for="item in newCategoryList" :key="item.id">
      <p class="title">{{ item.name }}好物</p>
      <van-grid :border="false" :column-num="2" :gutter="4">
        <van-grid-item
          v-for="goods in item.goodsList"
          :key="goods.id"
          :to="'/gooddetail?id=' + goods.id"
        >
          <van-image :src="goods.list_pic_url" width="151.07" height="151.07" />
          <h3 class="van-ellipsis">{{ goods.name }}</h3>
          <p class="van-ellipsis retail_price">￥{{ goods.retail_price }}</p>
        </van-grid-item>
        <van-grid-item :to="'/classifyList?id=' + item.id">
          <van-cell class="more">{{ item.name }}好物</van-cell>
          <van-icon class="more" name="more-o" />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ClassifyShowIndex",

  components: {},
  computed: {
    ...mapState(["newCategoryList"]),
  },
  data() {
    return {
      list: [],
    };
  },

  mounted() {
    // console.log(this.$store.state);
    this.list = this.$store.state.newCategoryList;
  },

  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/base.css";
.goods-show {
  // overflow: hidden;
  .title {
    text-align: center;
    font-size: 18px;
    line-height: 18px;
  }
  .van-grid-item {
    width: 50%;
    text-align: left;
    .more {
      font-size: 26px;
      .van-cell__value--alone {
        text-align: center;
        font-size: 16px;
      }
    }
    h3,
    p {
      width: 100%;
    }
    .retail_price {
      color: #f00;
    }
  }
}
</style>
