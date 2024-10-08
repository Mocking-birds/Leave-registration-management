"use strict";
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_config_color = require("../../libs/config/color.js");
const uni_modules_uviewPlus_libs_function_colorGradient = require("../../libs/function/colorGradient.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../libs/vue.js");
require("../../libs/function/test.js");
require("../../libs/util/route.js");
require("../../libs/function/digit.js");
require("../../libs/config/config.js");
const _sfc_main = {
  name: "u-toast",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin],
  data() {
    return {
      isShow: false,
      timer: null,
      // 定时器
      config: {
        message: "",
        // 显示文本
        type: "",
        // 主题类型，primary，success，error，warning，black
        duration: 2e3,
        // 显示的时间，毫秒
        icon: true,
        // 显示的图标
        position: "center",
        // toast出现的位置
        complete: null,
        // 执行完后的回调函数
        overlay: true,
        // 是否防止触摸穿透
        loading: false
        // 是否加载中状态
      },
      tmpConfig: {}
      // 将用户配置和内置配置合并后的临时配置变量
    };
  },
  computed: {
    iconName() {
      if (!this.tmpConfig.icon || this.tmpConfig.icon == "none") {
        return "";
      }
      if (this.tmpConfig.icon === true) {
        if (["error", "warning", "success", "primary"].includes(this.tmpConfig.type)) {
          return uni_modules_uviewPlus_libs_function_index.type2icon(this.tmpConfig.type);
        } else {
          return "";
        }
      } else {
        return this.tmpConfig.icon;
      }
    },
    overlayStyle() {
      const style = {
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
      };
      style.backgroundColor = "rgba(0, 0, 0, 0)";
      return style;
    },
    iconStyle() {
      const style = {};
      style.marginRight = "4px";
      return style;
    },
    loadingIconColor() {
      let colorTmp = "rgb(255, 255, 255)";
      if (["error", "warning", "success", "primary"].includes(this.tmpConfig.type)) {
        colorTmp = uni_modules_uviewPlus_libs_function_colorGradient.hexToRgb(uni_modules_uviewPlus_libs_config_color.color[this.tmpConfig.type]);
      }
      return colorTmp;
    },
    // 内容盒子的样式
    contentStyle() {
      const windowHeight = uni_modules_uviewPlus_libs_function_index.sys().windowHeight, style = {};
      let value = 0;
      if (this.tmpConfig.position === "top") {
        value = -windowHeight * 0.25;
      } else if (this.tmpConfig.position === "bottom") {
        value = windowHeight * 0.25;
      }
      style.transform = `translateY(${value}px)`;
      return style;
    }
  },
  created() {
    ["primary", "success", "error", "warning", "default", "loading"].map((item) => {
      this[item] = (message) => this.show({
        type: item,
        message
      });
    });
  },
  methods: {
    // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
    show(options) {
      this.tmpConfig = uni_modules_uviewPlus_libs_function_index.deepMerge(this.config, options);
      this.clearTimer();
      this.isShow = true;
      this.timer = setTimeout(() => {
        this.clearTimer();
        typeof this.tmpConfig.complete === "function" && this.tmpConfig.complete();
      }, this.tmpConfig.duration);
    },
    // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
    hide() {
      this.clearTimer();
    },
    clearTimer() {
      this.isShow = false;
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  beforeUnmount() {
    this.clearTimer();
  }
};
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_gap2 = common_vendor.resolveComponent("u-gap");
  const _easycom_u_overlay2 = common_vendor.resolveComponent("u-overlay");
  (_easycom_u_loading_icon2 + _easycom_u_icon2 + _easycom_u_gap2 + _easycom_u_overlay2)();
}
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_gap = () => "../u-gap/u-gap.js";
const _easycom_u_overlay = () => "../u-overlay/u-overlay.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_icon + _easycom_u_gap + _easycom_u_overlay)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.tmpConfig.type === "loading"
  }, $data.tmpConfig.type === "loading" ? {
    b: common_vendor.p({
      mode: "circle",
      color: "rgb(255, 255, 255)",
      inactiveColor: "rgb(120, 120, 120)",
      size: "25"
    })
  } : $data.tmpConfig.type !== "defalut" && $options.iconName ? {
    d: common_vendor.p({
      name: $options.iconName,
      size: "17",
      color: $data.tmpConfig.type,
      customStyle: $options.iconStyle
    })
  } : {}, {
    c: $data.tmpConfig.type !== "defalut" && $options.iconName,
    e: $data.tmpConfig.type === "loading" || $data.tmpConfig.loading
  }, $data.tmpConfig.type === "loading" || $data.tmpConfig.loading ? {
    f: common_vendor.p({
      height: "12",
      bgColor: "transparent"
    })
  } : {}, {
    g: common_vendor.t($data.tmpConfig.message),
    h: common_vendor.n("u-toast__content__text--" + $data.tmpConfig.type),
    i: common_vendor.s($options.contentStyle),
    j: common_vendor.n("u-type-" + $data.tmpConfig.type),
    k: common_vendor.n($data.tmpConfig.type === "loading" || $data.tmpConfig.loading ? "u-toast__content--loading" : ""),
    l: common_vendor.p({
      show: $data.isShow,
      zIndex: $data.tmpConfig.overlay ? 10070 : -1,
      ["custom-style"]: $options.overlayStyle
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e61e8fb9"], ["__file", "D:/Leave-registration-management/front/uni_modules/uview-plus/components/u-toast/u-toast.vue"]]);
wx.createComponent(Component);
