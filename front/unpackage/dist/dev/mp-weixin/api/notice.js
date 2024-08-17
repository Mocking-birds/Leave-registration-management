"use strict";
const common_vendor = require("../common/vendor.js");
const store_student = require("../store/student.js");
const baseUrl = "http://localhost:8080/notice";
const getNotice = () => {
  return new Promise((reslove, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/get`,
      method: "get",
      data: {
        pageNum: 1,
        pageSize: 5
      },
      header: {
        "Authorization": store_student.useStudentStore().token
      },
      success: (res) => {
        reslove(res.data);
      }
    });
  });
};
exports.getNotice = getNotice;
