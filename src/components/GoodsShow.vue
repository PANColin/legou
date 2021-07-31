<template>
  <div>
    <div class="goods-show">
      <van-dropdown-menu>
        <van-dropdown-item
          @change="changeDevelop"
          v-model="value1"
          :options="option1"
        />
        <van-dropdown-item
          @change="changeDevelop"
          v-model="value2"
          :options="option2"
        />
      </van-dropdown-menu>
      <van-grid :border="false" :column-num="2"  :gutter="4">
        <van-grid-item
          v-for="item in currentGoods.length ? currentGoods : goodsList"
          :key="item.id"
          :to="'/gooddetail?id=' + item.id"
        >
          <van-image :src="item.list_pic_url" />
          <div class="text">
            <p>{{ item.name }}</p>
            <p class="price">￥{{ item.retail_price }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: "Goodsshow",

  components: {},
  props: {
    goodsList: {
      type: Array,
      required: true,
      //   default: [],
    },
    currentGoods: {
      type: Array,
      required: false,
      //   default: {},
    },
  },
  data() {
    return {
      value1: 0,
      value2: "",
      current: "",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: "" },
        { text: "价格降序", value: "desc" },
        { text: "价格升序", value: "asc" },
      ],
    };
  },

  mounted() {
    // console.log(this.$refs)
  },

  methods: {
    changeDevelop(i) {
      // console.log(i);
      this.current = i;
      this.$emit("changeDef", i);
    },
  },
  created() {
    // console.log(this.$props.goodsList);
    // console.log(this.$props.currentGood);
  },
};
</script>

<style lang="less" scoped>
.van-grid-item {
  // border-right: 1px solid gray;
  // border-bottom: 1px solid gray;
  margin-top: 5px;
  text-align: center;
  .text .price {
    color: #f00;
  }
}
</style>
