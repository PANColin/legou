import request from "@/api/request";
// 删除收货地址
function deleteAction(data) {
  return request({
    url: "/address/deleteAction",
    method: "get",
    data,
  });
}
// 获取收货地址详情
function detailAction(data) {
  return request({
    url: "/address/detailAction",
    method: "get",
    data,
  });
}

//保存和跟添加收货地址
function saveAction(data) {
  return request({
    url: "/address/saveAction",
    method: "POST",
    data,
  });
}
//获取收货地址列表
function getListAction(data) {
  return request({
    url: "/address/getListAction",
    method: "get",
    data,
  });
}

export { deleteAction, detailAction, saveAction, getListAction };
