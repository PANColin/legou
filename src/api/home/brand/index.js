import request from "@/api/request";

function detailaction(data) {
  return request({
    method: "get",
    url: "/brand/detailaction",
    data
  });
}
function listaction(data) {
  return request({
    method: "get",
    url: "/brand/listaction",
    data
  });
}

export { detailaction,listaction };
