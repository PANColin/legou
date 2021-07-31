<template>
  <div>
    <van-search v-model="iptVal" placeholder="请输入搜索关键词" />
    <van-list>
      <van-cell
        @click="showCity(item)"
        v-for="item in list"
        :key="item.id"
        :title="item.name"
      />
    </van-list>
    <div class="wrapper">
      <slot name="weather"></slot>
      <p>显示详情 <button @click="showWeather" v-if="show">显示天气</button></p>
      <div id="container"></div>
    </div>
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=96c6193557ab4b7fd474fb962d295afd"
></script>
<script>
export default {
  name: "City",

  components: {},

  data() {
    return {
      iptVal: "",
      city: "",
      list: [],
      show: true,
    };
  },
  watch: {
    iptVal() {
      var _this = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(_this.iptVal, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          _this.list = result.tips;
        });
      });
    },
  },
  mounted() {
    // console.log(this.list);
    var searchResult = this.$store.state.searchResult;
    if (searchResult.name) {
      // 点击的中心点及添加对应的地图标记
      var map = new AMap.Map("container", {
        center: [searchResult.location.lng, searchResult.location.lat],
        zoom: 16,
        pitch: 75, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: "3D", // 地图模式
      });
      var marker = new AMap.Marker({
        position: [searchResult.location.lng, searchResult.location.lat], //位置
      });
      //实时路况图层
      var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10,
      });
      map.add(trafficLayer); //添加图层到地图
      map.add(marker); //添加到地图
      return;
    }
    var map = new AMap.Map("container");
    var _this = this;
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          console.log(result);
          _this.city = result.city;
        }
      });
    });
    // this.$nextTick(function () {
    //   console.log(this.city);
    // });
  },

  methods: {
    showWeather() {
      // 默认显示一次
      this.show = false;
      this.$emit("show", this.city);
    },
    showCity(city) {
      this.$store.commit("upt", city);
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 20px;
  #container {
    width: 100%;
    height: 180px;
  }
}
.van-cell {
  z-index: 99;
}
</style>
