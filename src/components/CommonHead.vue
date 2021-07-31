<template>
  <div>
    <van-sticky>
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <slot slot="title" name="title">乐购</slot>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script>
export default {
  name: "Commonhead",

  components: {},

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    onClickLeft() {
      const path = this.$route.query.fromRouter;
      //   console.log(path, path.indexOf("/classifyList"), this.$route.query);
      this.$router.replace(path);
      //   this.$router.replace({path,query:{id:this.$route.query.id}});
      // this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  box-shadow: 1px 1px 3px #8c9bae;
}
</style>
