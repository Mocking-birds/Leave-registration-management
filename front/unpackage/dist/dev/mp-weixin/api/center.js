"use strict";
const common_vendor = require("../common/vendor.js");
const store_student = require("../store/student.js");
const baseUrl = "http://localhost:8080/enter";
const addEnter = (form) => {
  return new Promise((reslove, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/add`,
      method: "post",
      data: form,
      header: {
        "Authorization": store_student.useStudentStore().token
      },
      success: (res) => {
        reslove(res.data);
      }
    });
  });
};
exports.addEnter = addEnter;
