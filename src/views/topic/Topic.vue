<template>
  <div class="wrapper-topic">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
    <!--  -->
      <div v-for="item in list" :key="item.id" @click="stepDetail(item)">
        <img class="img" :src="item.scene_pic_url" alt="" />
        <div class="text">
          <h2>{{ item.title }}</h2>
          <p class="subtitle">{{ item.subtitle }}</p>
          <p class="price_info">{{ item.price_info }}元起</p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { listaction } from "@/api/topic/index";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      start: 1,
    };
  },
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    // 跳转到详情页
    stepDetail(topicD){
      // console.log(topicD)
      this.$router.push({path:"/topic/topicdetail",query:{id:topicD.id}})
    },
    init() {
      listaction({
        page: this.start,
      }).then((res) => {
        // console.log(res);
        // 合并原来的数组
        this.list.push(...res.data.data);
        this.start++;
        // 数据请求完毕  需要变更加载状态魏结束状态
        this.loading = false;
        // 总页数4 2
        if (this.start > res.data.total) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      // console.log("load事件触发了");
      this.init();
    },
  },
};
</script>

<style scoped lang="less">
.wrapper-topic {
  margin-bottom: 55px;
  .van-list {
    text-align: center;
    background-color: #fff;
    .img {
      width: 100%;
    }
    .text .subtitle {
      color: #c5c5c5;
    }
    .text .price_info {
      color: #f00;
      font-size: 16px;
    }
  }
}
</style>
