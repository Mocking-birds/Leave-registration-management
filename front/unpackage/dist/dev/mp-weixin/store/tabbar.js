"use strict";
const common_vendor = require("../common/vendor.js");
const useTabbarStore = common_vendor.defineStore("tabbar", () => {
  let tabbar = common_vendor.ref("home");
  const changeTabbar = (newTabbar) => {
    tabbar.value = newTabbar;
  };
  return { tabbar, changeTabbar };
});
exports.useTabbarStore = useTabbarStore;
