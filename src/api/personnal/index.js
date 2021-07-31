import request from "@/api/request";
// 意见反馈
function submitAction(data) {
  return request({
    url: "/feedback/submitAction",
    method: "POST",
    data,
  });
}

export { submitAction };
