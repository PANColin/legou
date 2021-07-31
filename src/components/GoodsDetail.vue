<template>
  <div>
    <div class="goods-detail-index">
      <van-sticky>
        <van-nav-bar
          title="乐购"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </van-sticky>
      <!-- 头部轮播 懒加载方式 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="item in data.gallery" :key="item.id">
          <img v-lazy="item.img_url" width="100%" />
        </van-swipe-item>
      </van-swipe>
      <div class="wuyou">
        <p><span></span> 30天无忧退货</p>
        <p><span></span> 48小时快速退款</p>
        <p><span></span> 满88元免邮费</p>
      </div>
      <div class="dec">
        <div class="dec-top">
          <h2>{{ info.name }}</h2>
          <p class="des">{{ info.goods_brief }}</p>
          <p class="price">￥{{ info.retail_price }}</p>
        </div>
        <van-cell title="请选择规格数量" is-link @click="show = !show" />
        <van-action-sheet v-model="show" title="请选择规格数量">
          <div class="content">
            <van-image width="100" height="100" :src="info.primary_pic_url" />
            <div class="right">
              <p class="price">价格 ￥{{ info.retail_price }}</p>
              <p>当前库存数{{ info.goods_number }}</p>
            </div>
          </div>
          <p>请选择数量：{{ num }}</p>
          <van-stepper v-model="num" min="1" :max="info.goods_number" integer />
        </van-action-sheet>
      </div>
      <!-- 商品参数 -->
      <div class="attribute">
        <h2>商品参数</h2>
        <ul>
          <li v-for="item in data.attribute" :key="item.id">
            <span>{{ item.name }}: </span><span>{{ item.value }}</span>
          </li>
        </ul>
      </div>
      <!-- 商品详情 -->
      <div class="detail" v-html="info.goods_desc"></div>
      <!-- 常见问题 -->
      <div class="issue">
        <div class="top">
          <hr />
          常见问题
          <hr />
        </div>
        <ul class="issue-ul">
          <li v-for="item in data.issue" :key="item.id">
            <p><span></span>{{ item.question }}</p>
            <p>{{ item.answer }}</p>
          </li>
        </ul>
      </div>
      <!-- 大家都在看 -->
      <good-show-no-head :list="data.productList">
        <template v-slot:title>
          <div class="top">
            <hr />
            大家都在看
            <hr />
          </div>
        </template>
      </good-show-no-head>
      <!-- 底部购物车按钮功能 -->
      <van-goods-action>
        <!-- <van-goods-action-icon icon="chat-o" text="客服" /> -->
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="data.allnumber"
          :to="'/shopcart'"
        />
        <van-goods-action-icon
          icon="star"
          text="已收藏"
          color="#ff5000"
          v-if="collect"
          @click="addcollect"
        />
        <van-goods-action-icon
          icon="star-o"
          text="收藏"
          v-else
          @click="addcollect"
        />
        <van-goods-action-button
          color="#be99ff"
          type="warning"
          text="加入购物车"
          @click="onClickAddCart"
        />
        <van-goods-action-button
          color="#7232dd"
          type="danger"
          text="立即购买"
          @click="onClickBuyImm"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { detailaction } from "@/api/goods/index.js";
import { submitAction } from "@/api/order/index.js";
import { addCart } from "@/api/cart/index.js";
import { addcollect } from "@/api/cart/collect/index.js";
import GoodShowNoHead from "@/components/GoodShowNoHead";

import { Toast } from "vant";
export default {
  name: "Goodsdetail",

  components: { GoodShowNoHead },

  data() {
    return {
      imgs: [],
      info: {},
      data: {},
      show: false,
      num: 0,
      collect: false, //默认显示非收藏图标
    };
  },
  mounted() {
    // 初始化数据
    this.init();
  },
  computed: {},
  methods: {
    // 初始化数据
    init() {
      detailaction({
        id: this.$route.query.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res);
        this.imgs = res.data.gallery;
        this.info = res.data.info;
        this.data = res.data;
        this.collect = res.data.collected;
      });
    },
    // 添加收藏
    addcollect() {
      addcollect({
        goodsId: this.info.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res);
        // 如果添加成功改变收藏图标样式
        // 发送的数据的请求头类型为x-www-form-urlencoded，第二次点击将会取消商品收藏
        if (res.data.data !== "success") return Toast("添加收藏失败");
        // this.collect = true//所以这里进行取反操作 直接为true不太对
        this.collect = !this.collect; //所以这里进行取反操作
        if (!this.collect) {
          Toast("取消收藏成功");
        } else {
          Toast("添加收藏成功");
        }
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    // 加入购物车
    onClickAddCart() {
      // this.show = true;
      if (this.show) {
        addCart({
          goodsId: this.info.id,
          number: this.num,
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          // console.log(res);
          if (res.data.data !== "success") return Toast("添加购物车失败");
          Toast("添加购物车成功");
          // 初始化数据
          this.init();
        });
      } else {
        this.show = true;
      }
      // cartList({ openId: "66" }).then((res) => {
      //   console.log(res);
      // });
    },
    //立即购买
    onClickBuyImm() {
      if (this.show) {
        submitAction({
          allPrise: this.num * this.info.retail_price,
          goodsId: this.info.id,
          openId: localStorage.getItem("openId"),
        }).then((res) => {
          // console.log(res);
          if (!res.data.data) return Toast("购买失败");
          // detailAction({ openId: localStorage.getItem("openId") }).then((res) => {
          //   console.log(res, "============");
          // });
          this.$router.push("/order");
        });
      } else {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.goods-detail-index {
  margin-bottom: 55px;
}
.wuyou {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid red;
    background-color: #fff;
  }
}
.dec {
  background-color: #fff;
  // 弹出的绘画面板样式
  .van-popup--bottom {
    bottom: 48px;
    left: 0;
    width: 100%;
  }
  .dec-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    .price {
      color: #e00;
    }
    .des {
      color: #837e7e;
    }
  }
  .content {
    display: flex;
    align-items: center;
    .right {
      margin-left: 20px;
      .price {
        color: #e00;
      }
    }
  }
}
// 商品参数样式
.attribute {
  padding: 0 20px;
}
// 商品详情样式
/deep/ .detail {
  margin-top: 16px;
  * {
    margin: 0;
    padding: 0;
  }
  img {
    width: 100%;
    vertical-align: middle;
  }
}
//常见问题
.issue {
  .top {
    display: flex;
    align-items: center;
    hr {
      width: 25%;
      height: 0.5px;
      background-color: rgb(158, 154, 154);
    }
  }
  .issue-ul {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    span {
      display: inline-block;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      vertical-align: middle;
      border: 1px solid red;
      background-color: #fff;
      margin-right: 10px;
    }
  }
}
// 底部购物车样式
.van-goods-action {
  z-index: 9999;
}
</style>
