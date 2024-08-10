"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 用于滚动到指定item
    anchor: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.listItem.anchor
    }
  }
});
exports.props = props;
