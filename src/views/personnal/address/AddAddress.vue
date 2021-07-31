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
    <van-address-edit
      :area-list="areaList"
      :address-info="AddressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import {
  deleteAction,
  detailAction,
  saveAction,
  getListAction,
} from "@/api/address/index.js";
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
// import CommonHead from "@/components/CommonHead.vue";
import { getAreaCode } from "@/tools/getAreaCode.js";
// console.log(getAreaCode);
// console.log(getAreaCode(areaList.county_list, "息县"));
export default {
  name: "Addaddress",

  components: {},

  data() {
    return {
      id: "",
      areaList,
      searchResult: [],
      areaCode: "",
      AddressInfo: {
        //收货人信息初始值
        name: "", //姓名
        tel: "", //电话
        province: "", //省份
        city: "", //城市
        country: "", //区县
        areaCode: "", //地址code：ID
        addressDetail: "", //详细地址
        postalCode: "5203344", //邮政编码
        isDefault: false, //是否选择默认
      },
    };
  },
  mounted() {
    // this.areaCode = this.$route.query.areaCode;

    deleteAction, getListAction;
    // 如果存在才发送请求
    if (this.$route.query.id) {
      detailAction({ id: this.$route.query.id }).then((res) => {
        // console.log(res, "地址详情");
        // console.log(
        //   this.getAreaCode(this.areaList.province_list, res.data.data.address)
        // );

        // console.log(this.$route.query.areaCode);
        this.AddressInfo.areaCode = Object.keys(
          getAreaCode(this.areaList.county_list, res.data.data.address)
        )[0];
        this.AddressInfo.tel = res.data.data.mobile;
        this.AddressInfo.name = res.data.data.name;
        this.AddressInfo.isDefault = Boolean(res.data.data.is_default);
        this.AddressInfo.addressDetail = res.data.data.address_detail;
        this.id = res.data.data.id;
      });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
      //   console.log(this.areaCode);
      //   this.$router.push({
      //     path: "/address",
      //     query: { areaCode: this.areaCode },
      //   });
    },
    onSave(val) {
      // console.log(this.areaList);
      // console.log(val);
      this.areaCode = val.areaCode;
      // console.log(this.AddressInfo);
      //   Toast("save");
      saveAction({
        address: val.province + val.city + val.county,
        addressId: this.id,
        checked: val.isDefault,
        detailadress: val.addressDetail,
        openId: localStorage.getItem("openId"),
        telNumber: val.tel,
        userName: val.name,
      }).then((res) => {
        console.log(res);
        if (!res.data.data) return Toast("保存失败");
        Toast("保存成功");
        this.$router.replace({
          path: "/address",
          // query: { tel: val.tel, areaCode: this.areaCode },
        });
      });
    },
    onDelete(val) {
      console.log(val);
      deleteAction({ id: this.id }).then((res) => {
        // console.log(res, "删除收货地址");
        if (!res.data.data) return Toast("删除失败");
        Toast("删除成功");
        this.$router.replace({
          path: "/address",
          query: { id: this.id },
        });
        console.log(this.id);
      });
    },
    onChangeDetail(val) {
      //   console.log(val);
      if (val) {
        this.searchResult = [
          {
            name: val,
            // address: val,
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
