"use strict";
const common_vendor = require("../common/vendor.js");
const store_student = require("../store/student.js");
const baseUrl = "http://localhost:8080/record";
const getRecord = (pageNum, pageSize) => {
  return new Promise((reslove, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/get/student`,
      method: "get",
      data: {
        pageNum,
        pageSize,
        username: store_student.useStudentStore().student.username
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
exports.getRecord = getRecord;
