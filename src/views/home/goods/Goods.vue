<template>
  <div>
    <van-nav-bar
      title="乐购"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <goods-show
      @changeDef="getMsgFormSon"
      ref="menu"
      :goodsList="list"
      :currentGoods="list"
    ></goods-show>
  </div>
</template>

<script>
import { goodsList } from "@/api/home/goods/index";
import GoodsShow from "@/components/GoodsShow";
export default {
  data() {
    return {
      msgFormSon: "",
      list: [],
      currentStatus: "",
      current: "default", // default up down
    };
  },
  computed: {},
  components: { GoodsShow },
  created() {
    // console.log(this.$route.query.name);
    // if(this.$route.query.name == "hot"){

    // }
    this.init();
  },
  mounted() {
    // console.log(this.$refs);
    // console.log(this.$refs.menu.current);
    // console.log(this.$refs.menu);
  },
  updated() {
    //   this.init();
  },
  methods: {
    getMsgFormSon(data) {
      this.msgFormSon = data;
      // console.log(this.msgFormSon);
      this.init();
    },
    onClickLeft() {
      this.$router.push("/home");
    },
    init() {
      goodsList({
        isHot: this.$route.query.name == "hot" ? 1 : "",
        isNew: this.$route.query.name == "new" ? 1 : "",
        order: this.msgFormSon,
      }).then((res) => {
        // console.log(res);
        this.list = res.data.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.goods {
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    .iconBox {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  .van-grid-item {
    // border-right: 0.5px solid gray;
    // border-bottom: 0.5px solid gray;
    width: 100%;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    text-align: center;
    .van-image {
      width: 145.5px;
      height: 145.5px;
    }
    .text .price {
      color: #f00;
    }
    .text .goods-name {
      width: 100%;
      //    white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
