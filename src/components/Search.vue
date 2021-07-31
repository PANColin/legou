<template>
  <!-- <div class="SearchVal" @click="target">搜索好物，一共有 {{ num }} 款好物</div> -->
  <van-cell-group border>
    <van-field
      label=""
      placeholder="搜索商品"
      autosize
      size="medium"
      left-icon="smile-o"
      @focus="target"
    />
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      // num: 2066,
    };
  },
  methods: {
    target() {
      this.$router.push("/searchword");
    },
  },
};
</script>

<style scoped="scoped" lang="less">
.van-cell-group {
  background-color: #ECECEC;
  .van-cell {
    text-align: center;
    width: 95%;
    margin: 5px auto;
    border: 0.3px solid gray;
    background-color: #eee;
    border-radius: 6px;
  }
}
</style>
