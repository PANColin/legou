import request from "@/api/request";

// 关键词和搜索历史接口
function indexaction(data) {
  return request({
    url: "/search/indexaction",
    data,
  });
}
// 搜索提示接口
function helperaction(data) {
  return request({
    url: "/search/helperaction",
    data,
  });
}
// 清空搜索历史
function clearhistoryAction(data) {
  return request({
    url: "/search/clearhistoryAction",
    method: "post",
    data,
  });
}
// 搜索的关键词添加到数据库
function addhistoryaction(data) {
  return request({
    url: "search/addhistoryaction",
    method: "post",
    data,
  });
}

export { indexaction, helperaction, clearhistoryAction, addhistoryaction };
