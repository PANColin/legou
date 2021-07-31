import request from "@/api/request";
// 订单确认界面数据获取
function detailAction(data) {
  return request({
    url: "/order/detailAction",
    method: "get",
    data,
  });
}
//提交订单
function submitAction(data) {
  return request({
    url: "/order/submitAction",
    method: "POST",
    data,
  });
}

export { detailAction, submitAction };
