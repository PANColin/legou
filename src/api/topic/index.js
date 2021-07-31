import request from "@/api/request";

function listaction(data) {
  return request({
    url: "/topic/listaction",
    method: "get",
    data,
  });
}

function goodsList(data) {
  return request({
    url: "/goods/goodsList",
    method: "get",
    data,
  });
}
function detailaction(data) {
  return request({
    url: "/topic/detailaction",
    method: "get",
    data,
  });
}

export { listaction, goodsList,detailaction };
