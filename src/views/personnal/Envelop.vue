<template>
  <div>
    <common-head><template #title>意见反馈</template></common-head>
    <van-cell-group>
      <van-field
        left-icon="records"
        v-model.trim="message"
        rows="5"
        autosize
        label="留言"
        type="textarea"
        maxlength="500"
        placeholder="请输入留言"
        show-word-limit
        :error-message="error"
        required
        clearable
      />
      <van-field
        v-model.trim="tel"
        label="联系方式"
        left-icon="phone-o"
        right-icon="warning-o"
        placeholder="邮箱/手机号/微信号"
        :error-message="error"
        required
        clearable
      />
    </van-cell-group>
    <van-button type="primary" size="large" @click="submitFeedback"
      >提交</van-button
    >
  </div>
</template>

<script>
import CommonHead from "@/components/CommonHead.vue";
import { submitAction } from "@/api/personnal/index.js";
import { Toast } from "vant";
export default {
  name: "Envelop",

  components: { CommonHead },

  data() {
    return {
      message: "",
      tel: "",
      error: "",
    };
  },

  mounted() {},

  methods: {
    submitFeedback() {
      if (this.message && this.tel) {
        this.error = "";
        submitAction({
          content: this.message,
          name: JSON.parse(localStorage.getItem("userInfo")).username,
          openId: localStorage.getItem("openId"),
          phone: this.tel,
        }).then((res) => {
        //   console.log(res);
          if (!res.data.data) return Toast("不好意思，网络不通畅，提交失败");
          Toast("提交成功");
          //   清空输入框
          this.message = "";
          this.tel = "";
        });
      } else {
        this.error = "必填项不能为空";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-button {
  margin: 20px 0;
}
</style>
