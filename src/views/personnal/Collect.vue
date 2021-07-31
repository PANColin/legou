<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="我的收藏"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <p class="title">收藏列表</p>
    <good-show-no-head :list="collectList"></good-show-no-head>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import GoodShowNoHead from "@/components/GoodShowNoHead.vue";
export default {
  name: "Collect",

  components: { GoodShowNoHead },

  data() {
    return {};
  },
  computed: {
    ...mapState(["collectList"]),
  },
  mounted() {
    this.$store.dispatch("asynGetCollects");
  },

  methods: {
    ...mapActions(["asynGetCollects"]),
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
.title {
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: center;
  background-color: #fff;
  font-size: 16px;
  margin-bottom: 6px;
}
</style>
