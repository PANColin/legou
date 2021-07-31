<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="广告详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="top">
      <div class="img">
        <van-image width="100%" :src="topData.new_pic_url" />
        <h3>{{ topData.name }}</h3>
      </div>
      <p class="dec">{{ topData.simple_desc }}</p>
    </div>
    <good-show-no-head :list="list"></good-show-no-head>
  </div>
</template>

<script>
import { detailaction } from "@/api/home/brand/index.js";
// import CommonHead from "@/components/CommonHead.vue";
import GoodShowNoHead from "@/components/GoodShowNoHead.vue";
export default {
  name: "Branddetail",

  components: { GoodShowNoHead },

  data() {
    return {
      list: [],
      topData: {},
    };
  },

  mounted() {
    // console.log(this.$route.query.id);
    detailaction({ id: this.$route.query.id }).then((res) => {
      // console.log(res);
      this.list = res.data.goodsList;
      this.topData = res.data.data;
    });
    // listaction({ page: 2 }).then((res) => {
    //   // console.log(res);
    // });
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
.top {
  margin-bottom: 6px;
  .img {
    position: relative;
    .van-image {
      vertical-align: middle;
    }

    h3 {
      position: absolute;
      top: 50%;
      left: 50%;
      color: rgb(185, 179, 179);
      font-size: 20px;
      transform: translate(-50%, -50%);
      border-bottom: 3px solid rgb(185, 179, 179);
    }
  }
  .dec {
    font-size: 16px;
    text-align: center;
    padding: 6px 10px;
    background-color: #fff;
    color: #ccc;
  }
}
</style>
