"use strict";
const common_vendor = require("../../common/vendor.js");
const store_student = require("../../store/student.js");
const api_record = require("../../api/record.js");
const api_student = require("../../api/student.js");
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_list_item2 = common_vendor.resolveComponent("up-list-item");
  const _easycom_up_list2 = common_vendor.resolveComponent("up-list");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_upload2 = common_vendor.resolveComponent("up-upload");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  const _easycom_up_modal2 = common_vendor.resolveComponent("up-modal");
  (_easycom_up_avatar2 + _easycom_up_icon2 + _easycom_up_cell2 + _easycom_up_list_item2 + _easycom_up_list2 + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_upload2 + _easycom_up_form2 + _easycom_up_modal2)();
}
const _easycom_up_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_cell = () => "../../uni_modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_list_item = () => "../../uni_modules/uview-plus/components/u-list-item/u-list-item.js";
const _easycom_up_list = () => "../../uni_modules/uview-plus/components/u-list/u-list.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_upload = () => "../../uni_modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_up_icon + _easycom_up_cell + _easycom_up_list_item + _easycom_up_list + _easycom_up_input + _easycom_up_form_item + _easycom_up_upload + _easycom_up_form + _easycom_up_modal + TabBar)();
}
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let src = common_vendor.ref();
    let avatarList = common_vendor.ref();
    let username = common_vendor.ref();
    let allList = common_vendor.ref([]);
    let goList = common_vendor.ref([]);
    let enterList = common_vendor.ref([]);
    let passList = common_vendor.ref([]);
    let modifyList = ["修改基本信息", "退出登录"];
    let exitShow = common_vendor.ref(false);
    let informationShow = common_vendor.ref(false);
    let formData = common_vendor.ref({
      "password": "",
      "avatar": ""
    });
    const click = (item) => {
      console.log(item);
      if (item == "退出登录") {
        exitShow.value = true;
      } else if (item == "修改基本信息") {
        informationShow.value = true;
      }
    };
    const afterRead = (e) => {
      avatarList.value[0].url = e.file[0].url;
    };
    const getData = async () => {
      console.log(store_student.useStudentStore().student);
      if (store_student.useStudentStore().student.avatar) {
        src.value = "../../../../static/" + store_student.useStudentStore().student.avatar.split("\\").pop();
      }
      username.value = store_student.useStudentStore().student.username;
      formData.value = store_student.useStudentStore().student;
      formData.value.password = "";
      avatarList.value = [{ url: src.value }];
      let res = await api_record.getRecord(0, 0);
      allList.value = res.data;
      goList.value = allList.value.filter((item) => item.type == "出校申请");
      enterList.value = allList.value.filter((item) => item.type == "返校申请");
      passList.value = allList.value.filter((item) => item.type == "已通过");
    };
    common_vendor.onShow(() => {
      getData();
    });
    const cancel = () => {
      informationShow.value = false;
      getData();
    };
    const confirm = () => {
      exitShow.value = false;
      common_vendor.index.redirectTo({
        url: "/pages/login/index"
      });
    };
    const informationConfirm = () => {
      common_vendor.index.downloadFile({
        url: avatarList.value[0].url,
        success: (res) => {
          const tempFilePath = res.tempFilePath;
          common_vendor.index.uploadFile({
            url: "http://localhost:8080/student/avatar",
            filePath: tempFilePath,
            name: "file",
            formData: formData.value,
            success: async (res2) => {
              console.log(formData.value);
              const result = await api_student.studentInformation(formData.value.id);
              console.log(result);
              store_student.useStudentStore().setStudent(result.data);
              console.log(store_student.useStudentStore().student);
              cancel();
            },
            fail: (err) => {
              console.log(err);
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: common_vendor.unref(src),
          size: "90"
        }),
        b: common_vendor.t(common_vendor.unref(username)),
        c: common_vendor.p({
          name: "grid-fill",
          color: "rgb(0, 170, 255)"
        }),
        d: common_vendor.t(common_vendor.unref(goList).length),
        e: common_vendor.t(common_vendor.unref(enterList).length),
        f: common_vendor.t(common_vendor.unref(passList).length),
        g: common_vendor.f(common_vendor.unref(modifyList), (item, index, i0) => {
          return {
            a: "79e6a490-4-" + i0 + "," + ("79e6a490-3-" + i0),
            b: common_vendor.p({
              title: item
            }),
            c: "79e6a490-5-" + i0 + "," + ("79e6a490-3-" + i0),
            d: common_vendor.o(($event) => click(item), index),
            e: index,
            f: "79e6a490-3-" + i0 + ",79e6a490-2"
          };
        }),
        h: common_vendor.p({
          name: "arrow-right"
        }),
        i: common_vendor.o(($event) => common_vendor.unref(formData).password = $event),
        j: common_vendor.p({
          border: "none",
          modelValue: common_vendor.unref(formData).password
        }),
        k: common_vendor.p({
          label: "请输入新密码：",
          prop: "password",
          borderBottom: true
        }),
        l: common_vendor.o(afterRead),
        m: common_vendor.p({
          fileList: common_vendor.unref(avatarList),
          multiple: true,
          maxCount: 2,
          previewFullImage: true
        }),
        n: common_vendor.p({
          label: "更换头像",
          prop: "avatar",
          borderBottom: true
        }),
        o: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formData)
        }),
        p: common_vendor.o(cancel),
        q: common_vendor.o(informationConfirm),
        r: common_vendor.p({
          show: common_vendor.unref(informationShow),
          showCancelButton: "true",
          title: "修改个人信息"
        }),
        s: common_vendor.o(($event) => common_vendor.isRef(exitShow) ? exitShow.value = false : exitShow = false),
        t: common_vendor.o(confirm),
        v: common_vendor.p({
          show: common_vendor.unref(exitShow),
          showCancelButton: "true",
          content: "确定要退出登录吗？"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"], ["__file", "D:/Leave-registration-management/front/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
