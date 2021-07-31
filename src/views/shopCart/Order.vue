<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="wrapper-order">
      <div class="address" @click="$router.push('/address')">
        <ul class="address-nav">
          <li>
            <p>{{ address.name }}</p>
            <van-tag type="primary">{{
              address.is_default ? "默认" : ""
            }}</van-tag>
          </li>
          <li>
            <p>{{ address.address }}</p>
            <p>{{ address.mobile }}</p>
          </li>
          <li><van-icon name="arrow" /></li>
        </ul>
      </div>
      <ul class="detail">
        <li>
          <span>商品合计</span>
          <span>￥{{ allPrise }}</span>
        </li>
        <li><span>运费</span><span>免运费</span></li>
        <li><span>优惠券</span><span>暂无</span></li>
      </ul>
      <div class="goods" v-for="item in goodsList" :key="item.id">
        <van-card
          :num="item.number"
          :price="item.retail_price"
          :title="item.goods_name"
          class="goods-card"
          :thumb="item.list_pic_url"
        />
      </div>
    </div>
    <!-- 底部支付 -->
    <div class="wrapper">
      <div class="pay">
        <div class="left">实付:￥{{ allPrise }}</div>
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
          支付
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { detailAction } from "@/api/order/index.js";
export default {
  name: "Order",

  components: {},

  data() {
    return {
      address: {},
      allPrise: 0,
      id: "",
      goodsList: [],
    };
  },

  mounted() {
    // 获取地址信息
    this.id = this.$route.query.id;
    detailAction({
      openId: localStorage.getItem("openId"),
      addressId: this.id,
    }).then((res) => {
      // console.log(res, "============");
      this.address = res.data.address;
      this.allPrise = res.data.allPrise;
      this.goodsList = res.data.goodsList;
    });
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.wrapper-order {
  margin-bottom: 45px;
}
.address {
  background-color: #fff;
  height: 60px;
  line-height: 30px;
  .address-nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.detail {
  background-color: #fff;
  height: 150px;
  line-height: 50px;
  margin: 5px 0;
  padding: 6px 36px;
  li {
    border-bottom: 1px solid rgba(158, 155, 155, 0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
//
.van-card {
  padding: 0 20px;
  .van-card__content {
    justify-content: space-around;
  }
}
// 底部支付样式
.wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  .pay {
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    background-color: #fff;
    .left {
      padding-left: 20px;
    }
    .van-button {
      width: 20%;
    }
  }
}
</style>
