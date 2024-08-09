"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 到顶部的距离
    top: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.top
    },
    // 是否展示组件
    // show: {
    // 	type: Boolean,
    // 	default: () => defProps.notify.show
    // },
    // type主题，primary，success，warning，error
    type: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.type
    },
    // 字体颜色
    color: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.color
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.bgColor
    },
    // 展示的文字内容
    message: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.message
    },
    // 展示时长，为0时不消失，单位ms
    duration: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.duration
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.fontSize
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.notify.safeAreaInsetTop
    }
  }
});
exports.props = props;
