<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="地址管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-address-list
      @select="choose"
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
// import { Toast } from "vant";
import { getListAction } from "@/api/address/index.js";
export default {
  name: "Addressselect",

  components: {},
  data() {
    return {
      chosenAddressId: "0",
      list: [],
      areaCode: "",
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  mounted() {
    // this.areaCode = this.$route.query.areaCode;
    getListAction({ openId: localStorage.getItem("openId") }).then((res) => {
      // console.log(
      //   res.data.data.filter((el) => el.mobile == this.$route.query.tel)
      // );
      // 根据电话号码的唯一性找到当前的数据，把地址编码赋值
      // res.data.data.filter(
      //   (el) => el.mobile == this.$route.query.tel
      // ).areaCode = this.$route.query.areaCode; //返回的是新数组对原数组没有影响
      // 改变里面的属性
      let listObj = {};
      res.data.data.map((el) => {
        // console.log(el);
        // 根据电话号码的唯一性找到当前的数据，把地址编码赋值
        // if (el.mobile == this.$route.query.tel) {
        //   el.areaCode = this.$route.query.areaCode;
        // }
        // el.areaCode = this.$route.query.areaCode;
        listObj = {
          id: el.id,
          name: el.name,
          isDefault: el.is_default,
          tel: el.mobile,
          address: el.address + el.address_detail,
          // areaCode: el.areaCode,
        };
        // 默认选中的id
        if (el.is_default) {
          this.chosenAddressId = el.id;
        }
        // console.log(this.$route);
        // console.log(listObj);
        this.list.push(listObj);
      });
      // console.log(res);
      // console.log(this.list);
    });
  },
  methods: {
    // 订单切换地址
    choose(item) {
      // console.log(this.$route);
      if (this.$route.query.fromRouter == "/personal") {
        this.$router.back();
      } else {
        this.$router.replace({ path: "/order", query: { id: item.id } });
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    onAdd() {
      // Toast("新增地址");
      this.$router.replace("/addaddress");
    },
    onEdit(item) {
      console.log(item);
      this.$router.replace({
        path: "/addaddress",
        query: {
          id: item.id,
          // areaCode: item.areaCode
        },
      });
      // Toast("编辑地址:" + index);
    },
  },
};
</script>

<style lang="less" scoped></style>
