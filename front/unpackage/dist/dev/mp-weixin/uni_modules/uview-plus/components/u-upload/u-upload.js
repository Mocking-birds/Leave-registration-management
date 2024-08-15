"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uUpload_utils = require("./utils.js");
const uni_modules_uviewPlus_components_uUpload_mixin = require("./mixin.js");
const uni_modules_uviewPlus_components_uUpload_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
require("../../libs/vue.js");
require("../../libs/config/props.js");
require("../../libs/config/config.js");
require("../../libs/config/props/actionSheet.js");
require("../../libs/config/props/album.js");
require("../../libs/config/props/alert.js");
require("../../libs/config/props/avatar.js");
require("../../libs/config/props/avatarGroup.js");
require("../../libs/config/props/backtop.js");
require("../../libs/config/props/badge.js");
require("../../libs/config/props/button.js");
require("../../libs/config/props/calendar.js");
require("../../libs/config/props/carKeyboard.js");
require("../../libs/config/props/cell.js");
require("../../libs/config/props/cellGroup.js");
require("../../libs/config/props/checkbox.js");
require("../../libs/config/props/checkboxGroup.js");
require("../../libs/config/props/circleProgress.js");
require("../../libs/config/props/code.js");
require("../../libs/config/props/codeInput.js");
require("../../libs/config/props/col.js");
require("../../libs/config/props/collapse.js");
require("../../libs/config/props/collapseItem.js");
require("../../libs/config/props/columnNotice.js");
require("../../libs/config/props/countDown.js");
require("../../libs/config/props/countTo.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/divider.js");
require("../../libs/config/props/empty.js");
require("../../libs/config/props/form.js");
require("../../libs/config/props/formItem.js");
require("../../libs/config/props/gap.js");
require("../../libs/config/props/grid.js");
require("../../libs/config/props/gridItem.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/props/image.js");
require("../../libs/config/props/indexAnchor.js");
require("../../libs/config/props/indexList.js");
require("../../libs/config/props/input.js");
require("../../libs/config/props/keyboard.js");
require("../../libs/config/props/line.js");
require("../../libs/config/props/lineProgress.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/list.js");
require("../../libs/config/props/listItem.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/loadingPage.js");
require("../../libs/config/props/loadmore.js");
require("../../libs/config/props/modal.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/config/props/noNetwork.js");
require("../../libs/config/props/noticeBar.js");
require("../../libs/config/props/notify.js");
require("../../libs/config/props/numberBox.js");
require("../../libs/config/props/numberKeyboard.js");
require("../../libs/config/props/overlay.js");
require("../../libs/config/props/parse.js");
require("../../libs/config/props/picker.js");
require("../../libs/config/props/popup.js");
require("../../libs/config/props/radio.js");
require("../../libs/config/props/radioGroup.js");
require("../../libs/config/props/rate.js");
require("../../libs/config/props/readMore.js");
require("../../libs/config/props/row.js");
require("../../libs/config/props/rowNotice.js");
require("../../libs/config/props/scrollList.js");
require("../../libs/config/props/search.js");
require("../../libs/config/props/section.js");
require("../../libs/config/props/skeleton.js");
require("../../libs/config/props/slider.js");
require("../../libs/config/props/statusBar.js");
require("../../libs/config/props/steps.js");
require("../../libs/config/props/stepsItem.js");
require("../../libs/config/props/sticky.js");
require("../../libs/config/props/subsection.js");
require("../../libs/config/props/swipeAction.js");
require("../../libs/config/props/swipeActionItem.js");
require("../../libs/config/props/swiper.js");
require("../../libs/config/props/swipterIndicator.js");
require("../../libs/config/props/switch.js");
require("../../libs/config/props/tabbar.js");
require("../../libs/config/props/tabbarItem.js");
require("../../libs/config/props/tabs.js");
require("../../libs/config/props/tag.js");
require("../../libs/config/props/text.js");
require("../../libs/config/props/textarea.js");
require("../../libs/config/props/toast.js");
require("../../libs/config/props/toolbar.js");
require("../../libs/config/props/tooltip.js");
require("../../libs/config/props/transition.js");
require("../../libs/config/props/upload.js");
require("../../libs/util/route.js");
require("../../libs/function/digit.js");
const _sfc_main = {
  name: "u-upload",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uUpload_mixin.mixinUpload, uni_modules_uviewPlus_components_uUpload_props.props],
  data() {
    return {
      lists: [],
      isInCount: true
    };
  },
  watch: {
    // 监听文件列表的变化，重新整理内部数据
    fileList: {
      handler() {
        this.formatFileList();
      },
      immediate: true,
      deep: true
    },
    deletable(newVal) {
      this.formatFileList();
    },
    maxCount(newVal) {
      this.formatFileList();
    },
    accept(newVal) {
      this.formatFileList();
    }
  },
  emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    addStyle: uni_modules_uviewPlus_libs_function_index.addStyle,
    formatFileList() {
      const {
        fileList = [],
        maxCount
      } = this;
      const lists = fileList.map(
        (item) => Object.assign(Object.assign({}, item), {
          // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
          isImage: this.accept === "image" || uni_modules_uviewPlus_libs_function_test.test.image(item.url || item.thumb),
          isVideo: this.accept === "video" || uni_modules_uviewPlus_libs_function_test.test.video(item.url || item.thumb),
          deletable: typeof item.deletable === "boolean" ? item.deletable : this.deletable
        })
      );
      this.lists = lists;
      this.isInCount = lists.length < maxCount;
    },
    chooseFile() {
      const {
        maxCount,
        multiple,
        lists,
        disabled
      } = this;
      if (disabled)
        return;
      let capture;
      try {
        capture = uni_modules_uviewPlus_libs_function_test.test.array(this.capture) ? this.capture : this.capture.split(",");
      } catch (e) {
        capture = [];
      }
      uni_modules_uviewPlus_components_uUpload_utils.chooseFile(
        Object.assign({
          accept: this.accept,
          extension: this.extension,
          multiple: this.multiple,
          capture,
          compressed: this.compressed,
          maxDuration: this.maxDuration,
          sizeType: this.sizeType,
          camera: this.camera
        }, {
          maxCount: maxCount - lists.length
        })
      ).then((res) => {
        this.onBeforeRead(multiple ? res : res[0]);
      }).catch((error) => {
        this.$emit("error", error);
      });
    },
    // 文件读取之前
    onBeforeRead(file) {
      const {
        beforeRead,
        useBeforeRead
      } = this;
      let res = true;
      if (uni_modules_uviewPlus_libs_function_test.test.func(beforeRead)) {
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit(
            "beforeRead",
            Object.assign(Object.assign({
              file
            }, this.getDetail()), {
              callback: (ok) => {
                ok ? resolve() : reject();
              }
            })
          );
        });
      }
      if (!res) {
        return;
      }
      if (uni_modules_uviewPlus_libs_function_test.test.promise(res)) {
        res.then((data) => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },
    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index
      };
    },
    onAfterRead(file) {
      const {
        maxSize,
        afterRead
      } = this;
      const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
      if (oversize) {
        this.$emit("oversize", Object.assign({
          file
        }, this.getDetail()));
        return;
      }
      if (typeof afterRead === "function") {
        afterRead(file, this.getDetail());
      }
      this.$emit("afterRead", Object.assign({
        file
      }, this.getDetail()));
    },
    deleteItem(index) {
      this.$emit(
        "delete",
        Object.assign(Object.assign({}, this.getDetail(index)), {
          file: this.fileList[index]
        })
      );
    },
    // 预览图片
    onPreviewImage(item) {
      if (!item.isImage || !this.previewFullImage)
        return;
      common_vendor.index.previewImage({
        // 先filter找出为图片的item，再返回filter结果中的图片url
        urls: this.lists.filter((item2) => this.accept === "image" || uni_modules_uviewPlus_libs_function_test.test.image(item2.url || item2.thumb)).map((item2) => item2.url || item2.thumb),
        current: item.url || item.thumb,
        fail() {
          uni_modules_uviewPlus_libs_function_index.toast("预览图片失败");
        }
      });
    },
    onPreviewVideo(event) {
      if (!this.previewFullImage)
        return;
      const {
        index
      } = event.currentTarget.dataset;
      const {
        lists
      } = this.data;
      common_vendor.wx$1.previewMedia({
        sources: lists.filter((item) => isVideoFile(item)).map(
          (item) => Object.assign(Object.assign({}, item), {
            type: "video"
          })
        ),
        current: index,
        fail() {
          uni_modules_uviewPlus_libs_function_index.toast("预览视频失败");
        }
      });
    },
    onClickPreview(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const item = this.data.lists[index];
      if (!this.previewFullImage)
        return;
      switch (item.type) {
        case "video":
          this.onPreviewVideo(event);
          break;
      }
      this.$emit(
        "clickPreview",
        Object.assign(Object.assign({}, item), this.getDetail(index))
      );
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  (_easycom_u_icon2 + _easycom_u_loading_icon2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_loading_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.previewImage
  }, _ctx.previewImage ? {
    b: common_vendor.f($data.lists, (item, index, i0) => {
      return common_vendor.e({
        a: item.isImage || item.type && item.type === "image"
      }, item.isImage || item.type && item.type === "image" ? {
        b: item.thumb || item.url,
        c: _ctx.imageMode,
        d: common_vendor.o(($event) => $options.onPreviewImage(item), index),
        e: common_vendor.s({
          width: $options.addUnit(_ctx.width),
          height: $options.addUnit(_ctx.height)
        })
      } : {
        f: "c8491d64-0-" + i0,
        g: common_vendor.p({
          color: "#80CBF9",
          size: "26",
          name: item.isVideo || item.type && item.type === "video" ? "movie" : "folder"
        }),
        h: common_vendor.t(item.isVideo || item.type && item.type === "video" ? "视频" : "文件"),
        i: common_vendor.o(($event) => $options.onClickPreview($event, item), index)
      }, {
        j: item.status === "uploading" || item.status === "failed"
      }, item.status === "uploading" || item.status === "failed" ? common_vendor.e({
        k: item.status === "failed"
      }, item.status === "failed" ? {
        l: "c8491d64-1-" + i0,
        m: common_vendor.p({
          name: "close-circle",
          color: "#ffffff",
          size: "25"
        })
      } : {
        n: "c8491d64-2-" + i0,
        o: common_vendor.p({
          size: "22",
          mode: "circle",
          color: "#ffffff"
        })
      }, {
        p: item.message
      }, item.message ? {
        q: common_vendor.t(item.message)
      } : {}) : {}, {
        r: item.status !== "uploading" && (_ctx.deletable || item.deletable)
      }, item.status !== "uploading" && (_ctx.deletable || item.deletable) ? {
        s: "c8491d64-3-" + i0,
        t: common_vendor.p({
          name: "close",
          color: "#ffffff",
          size: "10"
        }),
        v: common_vendor.o(($event) => $options.deleteItem(index), index)
      } : {}, {
        w: item.status === "success"
      }, item.status === "success" ? {
        x: "c8491d64-4-" + i0,
        y: common_vendor.p({
          name: "checkmark",
          color: "#ffffff",
          size: "12"
        })
      } : {}, {
        z: index
      });
    })
  } : {}, {
    c: $data.isInCount
  }, $data.isInCount ? common_vendor.e({
    d: _ctx.$slots.trigger
  }, _ctx.$slots.trigger ? {
    e: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : !_ctx.$slots.trigger && (_ctx.$slots.default || _ctx.$slots.$default) ? {
    g: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : common_vendor.e({
    h: common_vendor.p({
      name: _ctx.uploadIcon,
      size: "26",
      color: _ctx.uploadIconColor
    }),
    i: _ctx.uploadText
  }, _ctx.uploadText ? {
    j: common_vendor.t(_ctx.uploadText)
  } : {}, {
    k: !_ctx.disabled ? "u-upload__button--hover" : "",
    l: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    m: common_vendor.n(_ctx.disabled && "u-upload__button--disabled"),
    n: common_vendor.s({
      width: $options.addUnit(_ctx.width),
      height: $options.addUnit(_ctx.height)
    })
  }), {
    f: !_ctx.$slots.trigger && (_ctx.$slots.default || _ctx.$slots.$default)
  }) : {}, {
    o: common_vendor.s($options.addStyle(_ctx.customStyle))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8491d64"], ["__file", "D:/Leave-registration-management/front/uni_modules/uview-plus/components/u-upload/u-upload.vue"]]);
wx.createComponent(Component);
