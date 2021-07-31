<template>
  <div class="wrapper-classify">
    <!-- 搜索组件 -->
    <search></search>
    <div class="box">
      <!-- 	左边导航栏 -->
      <van-sidebar v-model="active" class="slideNav">
        <van-sidebar-item
          @click="showSub(item)"
          :title="item.name"
          v-for="item in tabsList"
          :key="item.id"
        />
      </van-sidebar>

      <div class="content">
        <!-- 	图片展示 -->
        <van-row style="margin: 15px 0">
          <van-col :span="24">
            <img :src="bannerUrl" width="100%" height="100" />
          </van-col>
        </van-row>

        <van-row type="flex" justify="space-between">
          <van-col
            span="7"
            v-for="(item, i) in list"
            :key="i"
            @click="stepNav(item)"
          >
            <van-image :src="item.wap_banner_url" show-loading>
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <!-- 用vant内置的类van-ellipsis 但是标签必须是块元素 -->
            <p class="van-ellipsis">{{ item.name }}</p>
          </van-col>
          <van-col span="7"></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/Search.vue";
import { indexaction, currentaction } from "@/api/classify/index.js";
export default {
  components: {
    search,
  },
  data() {
    return {
      id: 1005000, //默认查找子项的id为居家
      active: 0,
      tabsList: [],
      bannerUrl: "",
      list: [],
    };
  },
  mounted() {
    indexaction().then((res) => {
      // console.log(res);
      this.tabsList = res.data.categoryList;
    });
    // 初始化显示数据子项
    this.init();
    // goodsList({ categoryId: 1005000 }).then((res) => {
    //   console.log(res);
    // });
    // categoryNav({ id: 1005000 }).then((res) => {
    //   console.log(res);
    // });
  },

  methods: {
    stepNav(i) {
      // console.log(i);
      this.$router.push({ path: "/classifyList", query: { id: i.id } });
    },
    showSub(sub) {
      // console.log(sub.id);
      this.id = sub.id;
      this.init();
    },
    init() {
      currentaction({ id: this.id }).then((res) => {
        // console.log(res);
        this.bannerUrl = res.data.data.currentOne.banner_url;
        this.list = res.data.data.currentOne.subList;
      });
    },
  },
};
</script>

<style scoped="scoped" lang="less">
.wrapper-classify {
  margin-bottom: 55px;
  .box {
    display: flex;
    .van-sidebar {
      .van-sidebar-item {
        background-color: #ececec;
      }
      .van-sidebar-item--select,
      .van-sidebar-item--select:active {
        color: #f00;
        font-size: 20px;
      }
    }
    .slideNav {
      width: 140px;
    }
    .content {
      width: 100%;
      padding: 20px 20px;
      text-align: center;
      .goods-imgs .van-col {
        margin-bottom: 10px;
      }
      .goods-imgs .van-col span {
        display: block;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
