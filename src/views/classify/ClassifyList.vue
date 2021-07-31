<template>
  <div class="wrapper-classify-index">
    <common-head></common-head>
    <van-tabs v-model="active" @change="currentGoods">
      <van-tab v-for="item in navData" :title="String(item.id)" :key="item.id">
        <template #title>{{ item.name }}</template>
        <div class="top">
          <p class="name">{{ item.name }}</p>
          <p class="front_name">{{ item.front_name }}</p>
        </div>
        <!-- <van-grid :border="false" :column-num="2" :gutter="4">
          <van-grid-item
            v-for="item in currentData"
            :key="item.id"
            @click="goodsDetail(item)"
            :to="'/gooddetail?id='+item.id"
          >
            <van-image :src="item.list_pic_url" />
            <div class="text">
              <p>{{ item.name }}</p>
              <p class="price">￥{{ item.retail_price }}</p>
            </div>
          </van-grid-item>
        </van-grid> -->
        <good-show-no-head :list="currentData"></good-show-no-head>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { categoryNav, goodsList } from "@/api/classify/index.js";
import CommonHead from "@/components/CommonHead.vue";
import GoodShowNoHead from "@/components/GoodShowNoHead.vue";
export default {
  name: "Classifylist",

  components: { CommonHead, GoodShowNoHead },
  data() {
    return {
      active: "",
      msgFormSon: "",
      id: "",
      navData: [],
      currentData: [],
    };
  },

  mounted() {
    // console.log(this.$route.query);
    // console.log(this.$route.query.url.split("?")[1].split("="));
    // console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    this.init();
  },

  methods: {
    //   点击导航栏从新获取id
    currentGoods(index, id) {
      // console.log(index, id);
      this.id = id;
      this.$nextTick(() => {
        this.active = index;
      });
      this.init();
    },
    init() {
      // let id = this.$route.query.url.split("?")[1].split("=")[1];
      // 展示分类详情页
      categoryNav({ id: this.id }).then((res) => {
        // console.log(res, "categoryNav");
        this.navData = res.data.navData;
        for (let i = 0; i < res.data.navData.length; i++) {
          const id = res.data.navData[i].id;
          if (id == res.data.currentNav.id) {
            this.active = i;
          }
        }
      });
      goodsList({ categoryId: this.id }).then((res) => {
        // console.log(res);
        this.currentData = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper-classify-index {
  width: 100%;
  overflow: hidden;
  .van-tabs {
    .top {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      margin: 5px 0;
      .name {
        font-size: 18px;
      }
      .front_name {
        font-size: 16px;
        color: #a89696;
      }
    }
    .van-grid {
      .van-grid-item {
        width: 50%;
      }
    }
  }
}
</style>
