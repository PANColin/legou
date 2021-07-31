<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="乐购"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>

    <map-container @show="showW">
      <template v-slot:weather>
        <div class="weather" v-if="weather.city">
          <p>{{ weather.reportTime }}</p>
          <p>{{ weather.province + "" + weather.city }}</p>
          <p>
            {{
              "今天" +
              weather.weather +
              "天" +
              "气温" +
              weather.temperature +
              "°" +
              "湿度" +
              weather.humidity
            }}
          </p>
        </div>
      </template>
    </map-container>
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=96c6193557ab4b7fd474fb962d295afd"
></script>
<script>
import Map from "@/components/Map.vue";
export default {
  name: "City",
  components: { "map-container": Map },
  data() {
    return {
      weather: {},
    };
  },
  methods: {
    showW(val) {
      console.log(val);
      //加载天气查询插件
      AMap.plugin("AMap.Weather", () => {
        //创建天气查询实例
        var weather = new AMap.Weather();

        //执行实时天气信息查询
        weather.getLive(val, (err, data) => {
          console.log(err, data);
          console.log(this.city);
          console.log(err == "null");
          if (data !== "null") {
            this.weather = data;
          } else if (err !== "null") {
            this.weather = err;
          }
        });
      });
    },
    onClickLeft() {
      this.$router.replace("/home");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
#container {
  position: absolute;
  width: 100%;
  height: 180px;
  bottom: 0;
}
</style>
