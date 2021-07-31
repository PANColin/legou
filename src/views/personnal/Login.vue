<template>
  <div>
    <common-head><template #title>模拟登录/注册</template></common-head>
    <van-form>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="openId"
        type="password"
        name="openId"
        label="openId"
        placeholder="唯一标识"
        :rules="[{ required: true, message: '请填写唯一标识' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" @click="onLogin">登录</van-button>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" @click="onSubmit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import CommonHead from "@/components/CommonHead.vue";
export default {
  name: "Login",

  components: { CommonHead },

  data() {
    return {
      username: "",
      openId: "",
    };
  },
  created() {},
  mounted() {},

  methods: {
    onLogin() {
      const openIdG = localStorage.getItem("openId");
      const userInfoG = localStorage.getItem("userInfo");
    //   console.log(openIdG, JSON.parse(userInfoG));
      if (
        this.openId == openIdG &&
        this.username == JSON.parse(userInfoG).username
      ) {
        Toast("登陆成功");
        this.$router.push("/home");
      } else {
        Toast("登陆失败");
        this.openId = "";
        this.username = "";
      }
    },
    onSubmit() {
      if (this.openId && this.username) {
        var userInfo = {
          openId: this.openId,

          username: this.username,

          avatarUrl: "https://img01.yzcdn.cn/vant/cat.jpeg",
        };

        var openId = userInfo.openId;

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        localStorage.setItem("openId", openId);
        Toast("注册成功");
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
