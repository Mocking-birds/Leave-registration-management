"use strict";
const common_vendor = require("../common/vendor.js");
const useStudentStore = common_vendor.defineStore("student", () => {
  let token = common_vendor.ref("");
  let student = common_vendor.ref();
  const setToken = (newToken) => {
    token.value = newToken;
  };
  const setStudent = (newStudent) => {
    student.value = newStudent;
  };
  return { token, student, setToken, setStudent };
});
exports.useStudentStore = useStudentStore;
