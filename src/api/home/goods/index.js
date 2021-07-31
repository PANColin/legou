import request from "@/api/request";

function goodsList(data) {
  return request({
    url: "/goods/goodsList",
    data,
  });
}

export { goodsList };
