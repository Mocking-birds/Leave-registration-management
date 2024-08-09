"use strict";
const common_vendor = require("../../common/vendor.js");
const api_student = require("../../api/student.js");
if (!Array) {
  const _easycom_up_toast2 = common_vendor.resolveComponent("up-toast");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  (_easycom_up_toast2 + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_button2 + _easycom_up_form2)();
}
const _easycom_up_toast = () => "../../uni_modules/uview-plus/components/u-toast/u-toast.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (_easycom_up_toast + _easycom_up_input + _easycom_up_form_item + _easycom_up_button + _easycom_up_form)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let form = common_vendor.ref({});
    const uToastRef = common_vendor.ref(null);
    const toLogin = async () => {
      console.log(form.value);
      const res = await api_student.studentLogin(form.value);
      console.log(res);
      uToastRef.value.show({
        message: res.message,
        type: res.status == 1 ? "error" : "success"
      });
      if (res.status == 0) {
        common_vendor.index.switchTab({
          url: "/pages/home/index"
        });
      } else {
        form.value.username = "", form.value.password = "";
      }
    };
    const toRegister = async () => {
      const res = await api_student.studentRegister(form.value);
      uToastRef.value.show({
        message: res.message,
        type: res.status == 1 ? "error" : "success"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(uToastRef, "d08ef7d4-0", {
          "k": "uToastRef"
        }),
        b: common_vendor.o(($event) => common_vendor.unref(form).username = $event),
        c: common_vendor.p({
          placeholder: "请输入用户名",
          prefixIcon: "account-fill",
          modelValue: common_vendor.unref(form).username
        }),
        d: common_vendor.o(($event) => common_vendor.unref(form).password = $event),
        e: common_vendor.p({
          placeholder: "请输入密码",
          prefixIcon: "lock-fill",
          modelValue: common_vendor.unref(form).password
        }),
        f: common_vendor.o(toLogin),
        g: common_vendor.p({
          type: "primary",
          text: "确定"
        }),
        h: common_vendor.o(toRegister),
        i: common_vendor.p({
          type: "success",
          text: "确定"
        }),
        j: common_vendor.p({
          model: common_vendor.unref(form)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"], ["__file", "D:/Leave-registration-management/front/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
