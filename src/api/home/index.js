import request from "@/api/request";

function index() {
  return request({
    method: "get",
    url: "/index/index",
  });
}

export { index };
