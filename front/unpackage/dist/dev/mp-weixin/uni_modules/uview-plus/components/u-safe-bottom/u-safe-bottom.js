"use strict";
const uni_modules_uviewPlus_components_uSafeBottom_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../libs/vue.js");
require("../../libs/config/config.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/function/test.js");
require("../../libs/util/route.js");
require("../../libs/function/digit.js");
const _sfc_main = {
  name: "u-safe-bottom",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uSafeBottom_props.props],
  data() {
    return {
      safeAreaBottomHeight: 0,
      isNvue: false
    };
  },
  computed: {
    style() {
      const style = {};
      return uni_modules_uviewPlus_libs_function_index.deepMerge(style, uni_modules_uviewPlus_libs_function_index.addStyle(this.customStyle));
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.style),
    b: common_vendor.n(!$data.isNvue && "u-safe-area-inset-bottom")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f3d22cfe"], ["__file", "D:/Leave-registration-management/front/uni_modules/uview-plus/components/u-safe-bottom/u-safe-bottom.vue"]]);
wx.createComponent(Component);
