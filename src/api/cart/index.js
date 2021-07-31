import request from "@/api/request";
// 购物车列表
function cartList(data) {
  return request({
    url: "/cart/cartList",
    method: "get",
    data,
  });
}
// 删除商品
function deleteAction(data) {
  return request({
    url: "/cart/deleteAction",
    method: "get",
    data,
  });
}

// 分类页子页接口存放目录
// 获取分类商品列表
function addCart(data) {
    return request({
      url: "/cart/addCart",
      method: "POST",
      data,
    });
  }

export { cartList, deleteAction,addCart};
