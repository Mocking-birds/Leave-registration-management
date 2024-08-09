"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://localhost:8080/student";
const studentLogin = (form) => {
  return new Promise((reslove, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/login`,
      method: "post",
      data: form,
      success: (res) => {
        console.log(res);
        reslove(res.data);
      }
    });
  });
};
const studentRegister = (form) => {
  return new Promise((reslove, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/register`,
      method: "post",
      data: form,
      success: (res) => {
        console.log(res);
        reslove(res.data);
      }
    });
  });
};
exports.studentLogin = studentLogin;
exports.studentRegister = studentRegister;
