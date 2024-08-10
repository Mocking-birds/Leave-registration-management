"use strict";
const uni_modules_uviewPlus_components_uList_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
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
require("../../libs/function/test.js");
require("../../libs/util/route.js");
require("../../libs/function/digit.js");
const _sfc_main = {
  name: "u-list",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uList_props.props],
  watch: {
    scrollIntoView(n) {
      this.scrollIntoViewById(n);
    }
  },
  data() {
    return {
      // 记录内部滚动的距离
      innerScrollTop: 0,
      // vue下，scroll-view在上拉加载时的偏移值
      offset: 0,
      sys: uni_modules_uviewPlus_libs_function_index.sys()
    };
  },
  computed: {
    listStyle() {
      const style = {};
      if (this.width != 0)
        style.width = uni_modules_uviewPlus_libs_function_index.addUnit(this.width);
      if (this.height != 0)
        style.height = uni_modules_uviewPlus_libs_function_index.addUnit(this.height);
      if (!style.height)
        style.height = uni_modules_uviewPlus_libs_function_index.addUnit(this.sys.windowHeight, "px");
      return uni_modules_uviewPlus_libs_function_index.deepMerge(style, uni_modules_uviewPlus_libs_function_index.addStyle(this.customStyle));
    }
  },
  provide() {
    return {
      uList: this
    };
  },
  created() {
    this.refs = [];
    this.children = [];
    this.anchors = [];
  },
  mounted() {
  },
  emits: [
    "scroll",
    "scrolltolower",
    "scrolltoupper",
    "refresherpulling",
    "refresherrefresh",
    "refresherrestore",
    "refresherabort"
  ],
  methods: {
    updateOffsetFromChild(top) {
      this.offset = top;
    },
    onScroll(e) {
      let scrollTop = 0;
      scrollTop = e.detail.scrollTop;
      this.innerScrollTop = scrollTop;
      this.$emit("scroll", Math.abs(scrollTop));
    },
    scrollIntoViewById(id) {
    },
    // 滚动到底部触发事件
    scrolltolower(e) {
      uni_modules_uviewPlus_libs_function_index.sleep(30).then(() => {
        this.$emit("scrolltolower");
      });
    },
    // 滚动到底部时触发，非nvue有效
    scrolltoupper(e) {
      uni_modules_uviewPlus_libs_function_index.sleep(30).then(() => {
        this.$emit("scrolltoupper");
        this.offset = 0;
      });
    },
    refresherpulling(e) {
      this.$emit("refresherpulling", e);
    },
    refresherrefresh(e) {
      this.$emit("refresherrefresh", e);
    },
    refresherrestore(e) {
      this.$emit("refresherrestore", e);
    },
    refresherabort(e) {
      this.$emit("refresherabort", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.scrollIntoView,
    b: common_vendor.s($options.listStyle),
    c: _ctx.scrollable,
    d: Number(_ctx.scrollTop),
    e: Number(_ctx.lowerThreshold),
    f: Number(_ctx.upperThreshold),
    g: _ctx.showScrollbar,
    h: _ctx.enableBackToTop,
    i: _ctx.scrollWithAnimation,
    j: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args)),
    k: common_vendor.o((...args) => $options.scrolltolower && $options.scrolltolower(...args)),
    l: common_vendor.o((...args) => $options.scrolltoupper && $options.scrolltoupper(...args)),
    m: _ctx.refresherEnabled,
    n: _ctx.refresherThreshold,
    o: _ctx.refresherDefaultStyle,
    p: _ctx.refresherBackground,
    q: _ctx.refresherTriggered,
    r: common_vendor.o((...args) => $options.refresherpulling && $options.refresherpulling(...args)),
    s: common_vendor.o((...args) => $options.refresherrefresh && $options.refresherrefresh(...args)),
    t: common_vendor.o((...args) => $options.refresherrestore && $options.refresherrestore(...args)),
    v: common_vendor.o((...args) => $options.refresherabort && $options.refresherabort(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a7e78647"], ["__file", "D:/Leave-registration-management/front/uni_modules/uview-plus/components/u-list/u-list.vue"]]);
wx.createComponent(Component);
