"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 标题
    title: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.title
    },
    // 标题右侧内容
    value: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.value
    },
    // 标题下方的描述信息
    label: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.label
    },
    // 是否禁用折叠面板
    disabled: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.disabled
    },
    // 是否展示右侧箭头并开启点击反馈
    isLink: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.isLink
    },
    // 是否开启点击反馈
    clickable: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.clickable
    },
    // 是否显示内边框
    border: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.border
    },
    // 标题的对齐方式
    align: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.align
    },
    // 唯一标识符
    name: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.name
    },
    // 标题左侧图片，可为绝对路径的图片或内置图标
    icon: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.icon
    },
    // 面板展开收起的过渡时间，单位ms
    duration: {
      type: Number,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.duration
    },
    // 显示右侧图标
    showRight: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.collapseItem.showRight
    }
  }
});
exports.props = props;
