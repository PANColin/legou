<template>
  <div>
    <!-- 公共部分 -->
    <div>
      <common-head></common-head>
      <form action="/">
        <van-search
          v-model.trim="value"
          show-action
          placeholder="请输入搜索关键词"
          @input="onSearch($event)"
          @keydown="onSearch($event)"
          @cancel="onCancel"
        />
      </form>
    </div>
    <!-- 历史记录 -->
    <div class="defalut">
      <div class="contain" v-if="current == 'defalut' && historyList.length">
        <p class="title">
          历史记录<van-icon
            color="#f00"
            size="20px"
            @click="clearHistory"
            name="delete-o"
          />
        </p>
        <ul class="title-word">
          <li
            v-for="item in historyList"
            :key="item.id"
            @click="historyClick(item, $event)"
          >
            {{ item.keyword }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="contain" v-if="current == 'defalut' && hotList.length">
      <p class="title">热门搜索</p>
      <ul class="title-word">
        <li
          v-for="item in hotList"
          :key="item.id"
          :class="item.is_hot ? 'active' : ''"
          @click="historyClick(item, $event)"
        >
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <!-- 搜索列表热词部分 -->
    <div class="goods-list" v-else-if="current == 'keywordList'">
      <van-list>
        <van-cell
          @click="showGoods(item, $event)"
          v-for="item in goodsList"
          :key="item.id"
          :title="item.name"
        />
      </van-list>
    </div>
    <!-- 商品列表部分 -->
    <goods-show
      @changeDef="getMsgFormSon"
      :goodsList="goodsList"
      :currentGoods="currentGoods"
      v-if="current == 'goodsList'"
    ></goods-show>
  </div>
</template>

<script>
import { throttle_now } from "@/tools/deboucneAndPlus.js";
import GoodsShow from "@/components/GoodsShow";
import CommonHead from "@/components/CommonHead";
import { Toast } from "vant";
import { Dialog } from "vant";
import {
  indexaction,
  helperaction,
  clearhistoryAction,
  addhistoryaction,
} from "@/api/home/search/index.js";
export default {
  data() {
    return {
      msgFormSon: "",
      value: "",
      hotList: [],
      historyList: [],
      timer: "",
      goodsList: [],
      currentGoods: [],
      // 默认展示的页面
      current: "defalut", //defalut keywordList goodsList
    };
  },
  components: { GoodsShow, CommonHead },
  created() {
    this.historyInit();
  },
  watch: {
    value(newVal) {
      // 判断有没有输入值没有就不发送搜索
      // 在500ms内输入 是不会触发请求
      if (newVal) {
        // throttle_now(this.init, 10);
        // 防抖
        // 清除计时器
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.init();
        }, 500);
      }
    },
  },
  methods: {
    historyInit() {
      // 历史记录
      indexaction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        // console.log(res);
        this.hotList = res.data.hotKeywordList;
        this.historyList = res.data.historyData;
      });
    },
    // 点击搜索记录的某一项
    historyClick(good) {
      // console.log(good, e);
      this.current = "goodsList";
      this.value = good.keyword;
      this.addhistory();
      this.init();
    },
    // 从子组件得到的数据，判断排序状态
    getMsgFormSon(data) {
      this.msgFormSon = data;
      // console.log(this.msgFormSon);
      this.init();
    },
    // 搜索提示接口
    init() {
      helperaction({
        keyword: this.value,
        order: this.msgFormSon,
      }).then((res) => {
        // console.log(res);
        this.goodsList = res.data.keywords;
      });
    },
    // 展示商品名称列表
    showGoods(good) {
      // console.log(e.target);
      // console.log(good);
      // 将输入框的值改变
      this.value = good.name;
      // 将数组置空才添加
      this.currentGoods = [];
      // 点击添加历史到库
      this.addhistory();
      this.currentGoods.push(good);
      if (this.value.length == 0) {
        this.current = "defalut";
      } else {
        this.current = "goodsList";
      }
    },
    // 添加搜索记录
    addhistory() {
      // 搜索的关键词添加到数据库
      // 如果数据不为空才加入  //不行和value绑定了按enter添加历史记录的问题可能
      // if (!this.value.trim().length) { }
      addhistoryaction({
        openId: localStorage.getItem("openId"),
        keyword: this.value,
      });
      // console.log(this.value.trim().length, "add+++++++++++++++++++");
    },
    // 清除历史记录
    clearHistory() {
      Dialog.confirm({
        title: "系统提示",
        message: "您确定要清除历史记录么？",
      })
        .then(() => {
          clearhistoryAction({ openId: localStorage.getItem("openId") }).then(
            (res) => {
              // console.log(res, "清除历史记录");
              if (res.data.data != "清除成功") return Toast("清除历史记录失败");
              this.historyList = [];
              Toast("清除历史记录成功");
            }
          );
        })
        .catch(() => {
          Toast("取消清除历史记录");
        });
    },
    onSearch(e) {
      // console.log(e);
      if (e.key == "Enter") {
        // 将数组置空才添加
        this.currentGoods = [];
        // 搜索的关键词添加到数据库
        //  if (!this.value.trim().length)
        this.addhistory();
        if (!this.value.length == 0 && this.current == "keywordList") {
          this.current = "goodsList";
        }
      } else {
        // 如果不是enter键就发一次查询数据的请求，保证实时
        throttle_now(this.init, 10); //不起效果，暂时不明白原因
        // console.log(throttle_now)
      }
      // 搜索关键字
      if (this.value.trim().length == 0) {
        this.current = "defalut";
        // 再次渲染历史记录及热词
        // throttle_now(this.historyInit, 500); //不起效果，暂时不明白原因
        e.key == "Enter" || this.historyInit();
      } else if (this.current == "defalut" && !this.value.length == 0) {
        this.init();
        this.current = "keywordList";
      }
    },
    onCancel() {
      Toast("取消");
      //
      const path = this.$route.query.fromRouter;
      this.$router.replace(path);
    },
  },
};
</script>

<style scoped="scoped" lang="less">
.contain {
  padding: 20px;
  background-color: #fff;
  margin: 10px 0;
  p {
    display: flex;
    justify-content: space-between;
  }
  .title-word {
    display: flex;
    flex-wrap: wrap;
  }
  .title-word li {
    margin-right: 10px;
    border: 1px solid #999;
    padding: 5px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .title-word .active {
    border: 1px solid red;
    color: red;
  }
}
</style>
