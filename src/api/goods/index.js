import request from "@/api/request";

function goodsList(data) {
  return request({
    url: "/goods/goodsList",
    data,
  });
}
function detailaction(data) {
  return request({
    url: "goods/detailaction",
    data,
  });
}

export { goodsList, detailaction };
