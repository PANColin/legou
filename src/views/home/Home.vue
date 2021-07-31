<template>
  <div class="wrapper-index">
    <!-- 头部导航栏 -->
    <van-sticky>
      <van-row type="flex" justify="space-around" align="center">
        <van-col span="6">
          <van-cell class="van-ellipsis" type="default" to="/home/city">
            {{
              $store.state.searchResult.name
                ? $store.state.searchResult.name
                : city
            }}
          </van-cell>
        </van-col>
        <van-col span="18">
          <search></search>
        </van-col>
      </van-row>
    </van-sticky>
    <!-- 头部导航栏 -->

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="item in info.banner" :key="item.id">
        <img :src="item.image_url" width="100%" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图 -->

    <!-- Grid 宫格 -->
    <van-grid :column-num="5">
      <van-grid-item
        :to="'/classifyList?id=' + item.id"
        @click="showDetail(item)"
        v-for="item in info.channel"
        :key="item.id"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>

    <!-- Grid 宫格 -->

    <!-- 品牌制造商直供 -->
    <div class="wrapper-goods-title">
      <p>品牌制造商直供</p>
      <van-grid :border="false" :column-num="2">
        <van-grid-item
          v-for="item in info.brandList"
          :key="item.id"
          :to="'/home/branddetail?id=' + item.id"
        >
          <!-- @click="test(item)" -->
          <div class="text">
            <p>{{ item.name }}</p>
            <p>{{ item.floor_price }}起</p>
          </div>
          <van-image :src="item.new_pic_url" />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 新品首发 -->
    <div class="wrapper-Goods-card">
      <p>新品首发</p>
      <van-button
        plain
        hairline
        type="info"
        color="#8C9BAE"
        size="mini"
        to="/home/Goods?name=new"
        >查看全部</van-button
      >
    </div>
    <!-- newGoods的展示 -->
    <good-show-index :list="info.newGoods"></good-show-index>
    <!-- 热气推荐首发 -->
    <div class="wrapper-Goods-card hot">
      <p>人气推荐·好物精选</p>
      <van-button
        plain
        hairline
        type="info"
        color="#B4A57D"
        size="mini"
        to="/home/Goods?name=hot"
        >查看全部</van-button
      >
    </div>
    <!-- hotGoods的展示 -->
    <good-show-index :list="info.hotGoods"></good-show-index>
    <!-- hotGoods专题的展示 -->
    <div class="wrapper-topic">
      <van-cell to="/topic">专题精选<span>&gt;</span></van-cell>
      <div class="hot-goods-show">
        <van-grid :border="false" :column-num="4">
          <van-grid-item
            v-for="item in info.topicList"
            :key="item.id"
            @click="test(item)"
            :to="'/topic/topicdetail?id=' + item.id"
          >
            <van-image :src="item.item_pic_url" width="100%" height="160" />
            <div class="hot-text">
              <h3 class="van-ellipsis">{{ item.title }}</h3>
              <p class="van-ellipsis retail_price">{{ item.price_info }}元起</p>
            </div>
            <p class="van-ellipsis subtitle">{{ item.subtitle }}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- 分类商品展示 -->
    <classify-show-index></classify-show-index>
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=96c6193557ab4b7fd474fb962d295afd"
></script>
<script>
import { goodsList } from "@/api/home/goods/index";
import { categoryNav } from "@/api/classify/index.js";
import GoodShowIndex from "@/components/GoodShowIndex";
import ClassifyShowIndex from "@/components/ClassifyShowIndex";
import search from "@/components/Search.vue";
import { index } from "@/api/home/index.js";
export default {
  name: "Home",
  components: {
    search,
    GoodShowIndex,
    ClassifyShowIndex,
  },
  data() {
    return {
      active: 0,
      info: {},
      list: [],
      city: "",
      currentStatus: "",
      current: "default", // default up down
    };
  },
  mounted() {},
  methods: {
    // test(i) {
    //   console.log(i);
    // },
    // 展示分类详情页
    showDetail(category) {
      // console.log(category.id);
      categoryNav({ id: category.id }).then((res) => {
        // console.log(res);
        // 这个用vuex模拟了一下没有成功取到数据
        this.$store.commit("getNav", res.data);
      });
    },
    init() {
      goodsList({
        isHot: this.$route.query.name == "hot" ? 1 : "",
        isNew: this.$route.query.name == "new" ? 1 : "",
        order: this.currentStatus,
      }).then((res) => {
        // console.log(res, "===========");
        this.list = res.data.data;
      });
    },
  },
  created() {
    // 初始化页面数据
    index().then((res) => {
      // console.log(res);
      this.info = res.data;
      this.$store.commit("getNewCategoryList", res.data.newCategoryList);
    });
    this.init();
    // 如果vuex 当中存在搜索结果 优先使用vuex中的数据
    AMap.plugin("AMap.CitySearch", () => {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity((status, result) => {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          // console.log(result);
          // console.log(this,"------------------")
          this.city = result.city;
        }
      });
    });
  },
};
</script>

<style scoped="scoped" lang="less">
.wrapper-index {
  margin-bottom: 55px;
  .van-sticky {
    .van-row {
      box-shadow: 1px 1px 3px #8c9bae;
      padding: 10px 0;
      padding-top: 10px;
      text-align: center;
      background-color: #eee;
      .van-cell {
        background-color: #eee;
      }
      .van-cell .van-cell__value {
        position: relative;
        overflow: auto;
        // color: #969799;
        text-align: right;
        vertical-align: middle;
        word-wrap: break-word;
      }
    }
  }
  // 品牌直供商样式
  .content-img {
    padding: 10px;
    background: rgb(235, 237, 240);
    margin-bottom: 50px;
  }
  .van-grid-item .text {
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 20px;
  }
  .wrapper-goods-title {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    margin-top: 20px;
  }
  //  hotGoods专题的展示
  .wrapper-topic {
    .van-cell {
      text-align: center;
      width: 100%;
      background-color: #fff;
      margin-top: 6px;
      font-size: 14px;
      .van-cell__value {
        text-align: center;
      }
      span {
        border-radius: 50%;
        margin-left: 5px;
        border: grey solid 1px;
        color: grey;
      }
    }
    .hot-goods-show {
      // display: flex;
      width: 100%;
      // text-align: left;
      overflow: auto;
      .van-grid {
        flex-wrap: nowrap;
        .van-grid-item {
          width: 100%;
          .hot-text {
            display: flex;
            width: 100%;
            // align-items: center;
            text-align: center;
            justify-content: space-between;
            flex-direction: column;
          }
          h3,
          p {
            width: fit-content;
            text-align: justify;
          }
          .retail_price {
            color: #f00;
          }
          .subtitle {
            width: 100%;
          }
        }
      }
    }
  }

  /* 新品首发 和人气推荐 */
  .wrapper-Goods-card.hot {
    background-color: #fef7e3;
    color: #b4a57d;
  }
  .wrapper-Goods-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    // padding: 50px;
    background-color: #f1f7fd;
    color: #8c9bae;
    height: 122px;
    p {
      font-size: 16px;
    }
  }
}
</style>
