<template>
  <div>
    <common-head><template #title>分类详情</template></common-head>
    <div class="top" v-html="currentData.content"></div>
    <div class="recommendList" v-for="item in recommendList" :key="item.id">
      <van-image width="100%" :src="item.scene_pic_url" />
      <div class="text">
        <h3 class="title">{{ item.title }}</h3>
        <p class="subtitle">{{ item.subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { detailaction } from "@/api/topic/index.js";
import CommonHead from "@/components/CommonHead.vue";
export default {
  name: "Topicdetail",

  components: { CommonHead },

  data() {
    return {
      currentData: {},
      recommendList: [],
    };
  },

  mounted() {
    detailaction({ id: this.$route.query.id }).then((res) => {
      // console.log(res);
      this.currentData = res.data.data;
      this.recommendList = res.data.recommendList;
    });
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.top {
  // sass和less的样式穿透 使用 /deep/ stylus的样式穿透 使用 >>>
  /deep/ img {
    display: block;
    width: 100%;
  }
}
.recommendList {
  margin: 16px 0;
  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
  }
}
</style>
