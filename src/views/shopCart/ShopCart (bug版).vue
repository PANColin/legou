<template>
  <div>
    <van-sticky>
      <div class="wuyou">
        <p><span></span> 30天无忧退货</p>
        <p><span></span> 48小时快速退款</p>
        <p><span></span> 满88元免邮费</p>
      </div>
    </van-sticky>
    <van-row type="flex" justify="space-around">
      <van-col span="24">
        <van-swipe-cell v-for="item in cartList" :key="item.id">
          <!-- <template #left>
            <van-button square type="primary" text="选择" />
          </template> -->
          <van-checkbox-group
            v-model="result"
            ref="checkboxGroup"
            @change="allC"
          >
            <!-- @click="allC(item)" -->
            <!-- v-model="item.isChecked" -->
            <van-checkbox
              :name="item"
              :style="{
                position: 'relative',
              }"
            >
              <div class="left">
                <img
                  :src="item.list_pic_url"
                  alt=""
                  width="100"
                  height="100%"
                />
              </div>
              <div
                class="right"
                :style="{
                  position: 'absolute',
                  left: '60%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                }"
              >
                <p>{{ item.goods_name }}</p>
                <p
                  class="price"
                  :style="{
                    color: '#f00',
                  }"
                >
                  ￥{{ item.retail_price }}
                </p>
                <span
                  class="dec"
                  :style="{
                    color: '#f00',
                  }"
                  >据加入降价￥{{ item.retail_price / 100 }}</span
                >
              </div>
              <p
                class="number"
                :style="{
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  transform: 'translate(0,-50%)',
                }"
              >
                x{{ item.number }}
              </p>
            </van-checkbox>
          </van-checkbox-group>
          <template #right>
            <van-button
              square
              type="danger"
              text="删除"
              @click="delGoodCart(item)"
            />
            <van-button
              square
              type="primary"
              text="收藏"
              @click="addcollect(item)"
            />
          </template>
        </van-swipe-cell>
      </van-col>
      <!-- price里面封装的应该是后两位是小数，所以这里乘以100 -->
      <van-submit-bar
        :price="total * 100"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @change="onAll">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template>
      </van-submit-bar>
    </van-row>
  </div>
</template>

<script>
import { cartList, deleteAction } from "@/api/cart/index.js";
import { addcollect } from "@/api/cart/collect/index.js";
import { Toast } from "vant";
import { Dialog } from "vant";
import { submitAction } from "@/api/order/index.js";
export default {
  name: "Shopcart",

  components: {},

  data() {
    return {
      checked: false,
      cartList: [],
      result: [],
    };
  },
  computed: {
    total() {
      return this.result.reduce((cur, val) => {
        return cur + val.number * val.retail_price;
      }, 0);
    },
    // allChecked: {
    //   get() {
    //     return this.cartList.every((el) => el.isChecked);
    //   },
    //   set(val) {
    //     return this.cartList.forEach((el) => (el.isChecked = val));
    //   },
    // },
  },
  mounted() {
    //初始化购物车列表
    this.init();
    // console.log(this.$refs)
  },

  methods: {
    // 上面商品改变选择的判断是否全选
    allC() {
      if (this.cartList.length == this.result.length) {
        this.checked = true;
      } else {
        // 这一步逻辑有点小问题，因为框架封装的原因 多选框组
        this.checked = false;
        // this.result = this.cartList;
        // console.log(this.cartList)
      }
      // i.isChecked = !i.isChecked;
      // console.log(i);
    },
    //初始化购物车列表
    init() {
      cartList({ openId: localStorage.getItem("openId") }).then((res) => {
        res.data.data.forEach((el) => {
          el.isChecked = false;
        });
        // console.log(res.data.data);
        this.cartList = res.data.data;
      });
    },
    // 删除购物车当前商品
    delGoodCart(good) {
      Dialog.confirm({
        title: "系统提示",
        message: "您确定要清除当前商品么，亲？",
      })
        .then(() => {
          deleteAction({ id: good.id }).then((res) => {
            // console.log(res);
            if (!res.data.data) return Toast("删除失败");
            Toast("删除成功");
            //初始化购物车列表
            this.init();
          });
        })
        .catch(() => {
          Toast("取消删除");
        });
    },
    // 全选
    onAll() {
      // console.log(this.allChecked)
      if (this.checked) {
        //把购物车里面的数据都推到result里
        this.result = this.cartList;
      } else {
        this.result = [];
      }
    },
    // 添加收藏
    addcollect(good) {
      addcollect({
        goodsId: good.id,
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
    onChangeTop(goodObj) {
      console.log(goodObj);
    },

    onSubmit() {
      // console.log(this.result);
      const goodsId = [];
      // 将所有选中的id取出来
      for (let item of this.result) {
        console.log(item);
        goodsId.push(item.goods_id);
      }
      // console.log(goodsId);
      let goodsIdStr = goodsId.join(",");
      // console.log(goodsIdStr);
      submitAction({
        allPrise: this.total,
        goodsId: goodsIdStr,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res);
        if (!res.data.data || !this.result.length)
          return Toast("请至少选中一件商品");
        // detailAction({ openId: localStorage.getItem("openId") }).then((res) => {
        //   console.log(res, "============");
        // });
        this.$router.push("/order");
      });
    },
    onClickEditAddress() {
      console.log(222);
    },
    onChange() {
      console.log(111);
    },
  },
};
</script>

<style lang="less" scoped>
.wuyou {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid red;
    background-color: #fff;
  }
}
// .van-swipe-cell {
//   .van-swipe-cell__wrapper {
//     div.van-swipe-cell__right {
//       right: -57px;
//       display: flex;
//     }
//   }
// }
.van-col {
  background: #fff;
  padding: 0 16px;
  margin-bottom: 135px;
  overflow: auto;
  height: 100%;
}
.van-submit-bar {
  bottom: 49px;
}
</style>
