"use strict";
const common_vendor = require("../common/vendor.js");
const store_tabbar = require("../store/tabbar.js");
if (!Array) {
  const _easycom_up_tabbar_item2 = common_vendor.resolveComponent("up-tabbar-item");
  const _easycom_up_tabbar2 = common_vendor.resolveComponent("up-tabbar");
  (_easycom_up_tabbar_item2 + _easycom_up_tabbar2)();
}
const _easycom_up_tabbar_item = () => "../uni_modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_up_tabbar = () => "../uni_modules/uview-plus/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_up_tabbar_item + _easycom_up_tabbar)();
}
const _sfc_main = {
  __name: "TabBar",
  setup(__props) {
    const tabbarStore = store_tabbar.useTabbarStore();
    let goto = (name) => {
      tabbarStore.changeTabbar(name);
      common_vendor.index.switchTab({
        url: `/pages/${tabbarStore.tabbar}/index`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "首页",
          icon: "home-fill",
          name: "home"
        }),
        b: common_vendor.p({
          text: "申请信息",
          icon: "list-dot",
          name: "center"
        }),
        c: common_vendor.p({
          text: "个人中心",
          icon: "account-fill",
          name: "user"
        }),
        d: common_vendor.o(common_vendor.unref(goto)),
        e: common_vendor.p({
          value: common_vendor.unref(tabbarStore).tabbar,
          fixed: true,
          placeholder: true,
          activeColor: "#32B9FF",
          safeAreaInsetBottom: false
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Leave-registration-management/front/components/TabBar.vue"]]);
wx.createComponent(Component);
