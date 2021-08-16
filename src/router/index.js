import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from "vant";

Vue.use(VueRouter);
const Home = () => import("@/views/home/Home.vue");
const BrandDetail = () => import("@/views/home/brand/BrandDetail.vue");
const Goods = () => import("@/views/home/goods/Goods.vue");
const City = () => import("@/views/home/city/City.vue");
// const HotGoods = () => import("@/views/home/goods/HotGoods.vue");

const Classify = () => import("@/views/classify/Classify.vue");
const ClassifyList = () => import("@/views/classify/ClassifyList.vue");
const ShopCart = () => import("@/views/shopCart/ShopCart.vue");
const Order = () => import("@/views/shopCart/Order.vue");
const Topic = () => import("@/views/topic/Topic.vue");
const TopicDetail = () => import("@/views/topic/TopicDetail.vue");
const Personal = () => import("@/views/personnal/Personal.vue");
const AddressSelect = () =>
  import("@/views/personnal/address/AddressSelect.vue");
const AddAddress = () => import("@/views/personnal/address/AddAddress.vue");
const Collect = () => import("@/views/personnal/Collect.vue");
const Envelop = () => import("@/views/personnal/Envelop.vue");
const Login = () => import("@/views/personnal/Login.vue");

const searchWord = () => import("@/components/searchWord.vue");
const GoodsDetail = () => import("@/components/GoodsDetail.vue");

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "首页",
      keepActive: false,
    },
  },
  {
    path: "/home/goods",
    name: "Goods",
    component: Goods,
    meta: {
      title: "商品",
      keepActive: false,
    },
  },
  {
    path: "/home/city",
    name: "City",
    component: City,
    meta: {
      title: "位置",
      keepActive: false,
    },
  },
  {
    path: "/home/branddetail",
    name: "BrandDetail",
    component: BrandDetail,
    meta: {
      title: "品牌详情",
      keepActive: false,
    },
  },
  {
    path: "/classify",
    name: "Classify",
    component: Classify,
    meta: {
      title: "分类",
      keepActive: true,
    },
  },
  {
    path: "/shopcart",
    name: "ShopCart",
    component: ShopCart,
    meta: {
      title: "购物车",
      keepActive: false,
    },
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: {
      title: "订单详情",
      keepActive: false,
    },
  },
  {
    path: "/topic",
    name: "Topic",
    component: Topic,
    meta: {
      title: "专题",
      keepActive: true,
    },
  },
  {
    path: "/topic/topicdetail",
    name: "TopicDetail",
    component: TopicDetail,
    meta: {
      title: "专题详情",
      keepActive: false,
    },
  },
  {
    path: "/personal",
    name: "Personal",
    component: Personal,
    meta: {
      title: "个人",
      keepActive: true,
    },
  },
  {
    path: "/address",
    name: "AddressSelect",
    component: AddressSelect,
    meta: {
      title: "地址管理",
      keepActive: false,
    },
    // beforeEnter: (to, from, next) => {
    //   //console.log(from)
    //   console.log({ to, from, next }, "<=====ooooooooooo");
    //   // 分类页面改变标记值的位置，返回到上一层而不是又回到了详情页
    //   if (from.path == "/addaddress") {
    //     to.query.fromRouter = "/order";
    //   }
    //   next();
    // },
  },
  {
    path: "/addaddress",
    name: "AddAddress",
    component: AddAddress,
    meta: {
      title: "添加地址",
      keepActive: false,
    },
  },
  {
    path: "/collect",
    name: "Collect",
    component: Collect,
    meta: {
      title: "收藏管理",
      keepActive: false,
    },
  },
  {
    path: "/envelop",
    name: "Envelop",
    component: Envelop,
    meta: {
      title: "意见反馈",
      keepActive: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      keepActive: false,
    },
  },
  {
    path: "/classifyList",
    name: "ClassifyList",
    component: ClassifyList,
    meta: {
      title: "导航",
      keepActive: false,
    },
    beforeEnter: (to, from, next) => {
      //console.log(from)
      // console.log({ to, from, next }, "<=====ooooooooooo");
      // 分类页面改变标记值的位置，返回到上一层而不是又回到了详情页
      if (from.path == "/gooddetail") {
        to.query.fromRouter = "/home";
      }
      next();
    },
  },
  {
    path: "/gooddetail",
    name: "GoodsDetail",
    component: GoodsDetail,
    meta: {
      title: "商品详情",
      keepActive: false,
    },
  },
  {
    path: "/searchword",
    name: "searchWord",
    component: searchWord,
    meta: {
      title: "搜索",
      keepActive: false,
    },
    // beforeEnter: (to, from, next) => {
    //   //console.log(from)
    //   // console.log({to,from,next})
    //   to.query.fromRouter = from.path;
    //   next();
    // },
  },
];

const router = new VueRouter({
  routes,
});
// router.beforeEach((to, from, next) => {
//   // console.log({ to, from, next });
//   document.title = to.meta.title;
//   to.query.fromRouter = from.path;
//   next();
// });
var toast;
router.beforeEach(async (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  if (!user.openId) {
    console.log(user,'===============');
    next();
    if (to.path === "/login") return;
    new Promise((resolve, reject) => {
      let second = 3;
      toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: `对不起，您还没有登录,倒计时  ${second} 秒跳转到登录页面`,
      });

      const timer = setInterval(() => {
        second--;
        if (second >= 0) {
          console.log(second);
          console.log(toast);
          toast.message = `倒计时  ${second} 秒跳转到登录页面`;
          // toast.duration = second * 1000;
        } else {
          // const nextFun = next({ path: "/login" });
          resolve(next);
          clearInterval(timer);
          console.log(second);
          // 手动清除 Toast
          Toast.clear();
        }
      }, 1000);
    }).then((res) => {
      res({ name: "Login" });
      // console.log(res);
      // router.push({ path: "/login" });
    });
  } else {
    document.title = to.meta.title;
    to.query.fromRouter = from.path;
    next();
  }
});

export default router;
