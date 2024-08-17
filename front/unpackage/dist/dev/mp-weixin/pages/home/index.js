"use strict";
const common_vendor = require("../../common/vendor.js");
const api_notice = require("../../api/notice.js");
const api_go = require("../../api/go.js");
const api_center = require("../../api/center.js");
const store_student = require("../../store/student.js");
if (!Array) {
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  const _easycom_up_notice_bar2 = common_vendor.resolveComponent("up-notice-bar");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  const _easycom_up_subsection2 = common_vendor.resolveComponent("up-subsection");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  (_easycom_up_swiper2 + _easycom_up_notice_bar2 + _easycom_up_button2 + _easycom_up_popup2 + _easycom_up_subsection2 + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_form2)();
}
const _easycom_up_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_notice_bar = () => "../../uni_modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_up_subsection = () => "../../uni_modules/uview-plus/components/u-subsection/u-subsection.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (_easycom_up_swiper + _easycom_up_notice_bar + _easycom_up_button + _easycom_up_popup + _easycom_up_subsection + _easycom_up_input + _easycom_up_form_item + _easycom_up_form + TabBar)();
}
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let swiperList = common_vendor.ref([
      "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      "https://cdn.uviewui.com/uview/swiper/swiper3.png"
    ]);
    let subsectionList = common_vendor.ref(["出校申请", "返校申请"]);
    let applyForm = common_vendor.ref({
      reason: "",
      username: ""
    });
    let noticeText = common_vendor.ref([]);
    let show = common_vendor.ref(false);
    let message = common_vendor.ref();
    let subsectionIndex = common_vendor.ref("0");
    const getData = async () => {
      const res = await api_notice.getNotice();
      console.log(res);
      res.data.records.forEach((item) => {
        noticeText.value.push(item.content);
      });
      console.log(noticeText.value);
      applyForm.value.username = store_student.useStudentStore().student.username;
    };
    common_vendor.onShow(() => {
      getData();
    });
    const open = (index) => {
      message.value = noticeText.value[index];
      show.value = true;
      console.log(message.value);
    };
    const close = () => {
      show.value = false;
    };
    const subsectionChange = (index) => {
      applyForm.value.reason = "";
      subsectionIndex.value = index;
    };
    const submitApply = async () => {
      console.log("123");
      console.log(subsectionIndex.value);
      if (subsectionIndex.value == "0") {
        let form = {
          username: applyForm.value.username,
          reason: applyForm.value.reason
        };
        const res = await api_go.addGo(form);
        console.log(res);
      } else if (subsectionIndex.value == "1") {
        let form = {
          username: applyForm.value.username,
          reject: applyForm.value.reason
        };
        const res = await api_center.addEnter(form);
        console.log(res);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: common_vendor.unref(swiperList),
          autoplay: true,
          circular: true,
          displayMultipleItems: "1"
        }),
        b: common_vendor.o(open),
        c: common_vendor.p({
          direction: "column",
          text: common_vendor.unref(noticeText)
        }),
        d: common_vendor.t(common_vendor.unref(message)),
        e: common_vendor.o(close),
        f: common_vendor.p({
          type: "primary",
          text: "确定"
        }),
        g: common_vendor.p({
          show: common_vendor.unref(show),
          mode: "top"
        }),
        h: common_vendor.o(subsectionChange),
        i: common_vendor.p({
          list: common_vendor.unref(subsectionList)
        }),
        j: common_vendor.o(($event) => common_vendor.unref(applyForm).reason = $event),
        k: common_vendor.p({
          border: "none",
          modelValue: common_vendor.unref(applyForm).reason
        }),
        l: common_vendor.p({
          label: "申请理由：",
          prop: "reason",
          borderBottom: true
        }),
        m: common_vendor.o(submitApply),
        n: common_vendor.p({
          type: "primary",
          text: "确定"
        }),
        o: common_vendor.p({
          borderBottom: true
        }),
        p: common_vendor.p({
          model: common_vendor.unref(applyForm)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "D:/Leave-registration-management/front/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
