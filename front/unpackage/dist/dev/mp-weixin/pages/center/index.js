"use strict";
const common_vendor = require("../../common/vendor.js");
const api_go = require("../../api/go.js");
require("../../store/student.js");
if (!Array) {
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  const _easycom_up_sticky2 = common_vendor.resolveComponent("up-sticky");
  const _easycom_up_collapse_item2 = common_vendor.resolveComponent("up-collapse-item");
  const _easycom_up_list_item2 = common_vendor.resolveComponent("up-list-item");
  const _easycom_up_collapse2 = common_vendor.resolveComponent("up-collapse");
  (_easycom_up_tabs2 + _easycom_up_sticky2 + _easycom_up_collapse_item2 + _easycom_up_list_item2 + _easycom_up_collapse2)();
}
const _easycom_up_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_up_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
const _easycom_up_collapse_item = () => "../../uni_modules/uview-plus/components/u-collapse-item/u-collapse-item.js";
const _easycom_up_list_item = () => "../../uni_modules/uview-plus/components/u-list-item/u-list-item.js";
const _easycom_up_collapse = () => "../../uni_modules/uview-plus/components/u-collapse/u-collapse.js";
if (!Math) {
  (_easycom_up_tabs + _easycom_up_sticky + _easycom_up_collapse_item + _easycom_up_list_item + _easycom_up_collapse + TabBar)();
}
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let tabList = common_vendor.ref([
      { name: "全部" },
      { name: "请假申请" },
      { name: "返校申请" },
      { name: "未审核" },
      { name: "已通过" },
      { name: "已驳回" }
    ]);
    let pageNum = common_vendor.ref(1);
    let pageSize = common_vendor.ref(5);
    let allList = common_vendor.ref([]);
    let goList = common_vendor.ref([]);
    let enterList = common_vendor.ref([]);
    let noList = common_vendor.ref([]);
    let passList = common_vendor.ref([]);
    let noPassList = common_vendor.ref([]);
    let tabName = common_vendor.ref("全部");
    const changeTab = (index) => {
      tabName.value = index.name;
    };
    let getGoData = async () => {
      const res = await api_go.getGo(pageNum.value, pageSize.value);
      console.log(res);
      allList.value = res.data.records;
      allList.value.forEach((item) => item.time = item.time.replace("T", " "));
      goList.value = allList.value.filter((item) => item.type == "出校申请");
      enterList.value = allList.value.filter((item) => item.type == "返校申请");
      noList.value = allList.value.filter((item) => item.state == "未审核");
      passList.value = allList.value.filter((item) => item.state == "已审核");
      noPassList.value = allList.value.filter((item) => item.state == "已驳回");
    };
    getGoData();
    let replaceTab = () => {
      if (tabName.value == "全部") {
        return allList.value;
      } else if (tabName.value == "请假申请") {
        return goList.value;
      } else if (tabName.value == "返校申请") {
        return enterList.value;
      } else if (tabName.value == "未审核") {
        return noList.value;
      } else if (tabName.value == "已通过") {
        return passList.value;
      } else if (tabName.value == "已驳回") {
        return noPassList.value;
      }
    };
    let getText = (item) => {
      let text = {
        "姓名": item.username,
        "审核状态": item.state,
        "时间": item.time,
        "申请类型": item.type
      };
      if (item.reject) {
        text.驳回原因 = item.reject;
      }
      if (item.reason) {
        text.出校原因 = item.reason;
      }
      if (item.notes) {
        text.返校理由 = item.notes;
      }
      console.log(text);
      return Object.entries(text);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeTab),
        b: common_vendor.p({
          list: common_vendor.unref(tabList)
        }),
        c: common_vendor.p({
          bgColor: "#fff"
        }),
        d: common_vendor.f(common_vendor.unref(replaceTab)(), (item, index, i0) => {
          return {
            a: common_vendor.f(common_vendor.unref(getText)(item), (value, key, i1) => {
              return {
                a: common_vendor.t(value[0]),
                b: common_vendor.t(value[1]),
                c: key
              };
            }),
            b: common_vendor.o(_ctx.open, index),
            c: "52ff2a72-4-" + i0 + "," + ("52ff2a72-3-" + i0),
            d: common_vendor.p({
              title: `${item.type}----${item.state}----${item.time}`
            }),
            e: index,
            f: "52ff2a72-3-" + i0 + ",52ff2a72-2"
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Leave-registration-management/front/pages/center/index.vue"]]);
wx.createPage(MiniProgramPage);
