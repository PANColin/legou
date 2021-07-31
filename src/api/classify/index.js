import request from "@/api/request";
// 分类导航数据获取
function indexaction(data) {
  return request({
    url: "/category/indexaction",
    method: "get",
    data,
  });
}
// 通过分类的id来查询分类列表数据
function currentaction(data) {
  return request({
    url: "/category/currentaction",
    method: "get",
    data,
  });
}

// 分类页子页接口存放目录
// 获取分类商品列表
function goodsList(data) {
    return request({
      url: "/goods/goodsList",
      method: "get",
      data,
    });
  }
//   获取导航数据
  function categoryNav(data) {
    return request({
      url: "/category/categoryNav",
      method: "get",
      data,
    });
  }

export { indexaction, currentaction,goodsList,categoryNav };
