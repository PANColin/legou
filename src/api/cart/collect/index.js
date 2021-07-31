import request from "@/api/request";
// 获取收藏列表
function listAction(data) {
  return request({
    url: "/collect/listAction",
    method: "get",
    data,
  });
}
// 添加收藏
function addcollect(data) {
  return request({
    url: "/collect/addcollect",
    method: "POST",
    data,
  });
}

export { listAction, addcollect };
