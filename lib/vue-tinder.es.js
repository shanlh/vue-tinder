import { openBlock, createElementBlock, normalizeStyle, renderSlot, createVNode, Transition, withCtx, createCommentVNode, resolveComponent, createBlock, TransitionGroup, Fragment, renderList, createElementVNode } from "vue";
var initStatus = function initStatus2(revert) {
  return {
    status: revert ? 3 : 0,
    touchId: null,
    start: {},
    move: {},
    startPoint: 1,
    result: null
  };
};
var STATUS = {
  NORMAL: 0,
  MOVING: 1,
  LEAVING: 2,
  REVERT: 3,
  REWINDING: 4
};
var TinderCard_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var _sfc_main$1 = {
  name: "TinderCard",
  emits: ["reverted"],
  props: {
    tinderMounted: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    ready: {
      type: Boolean,
      default: false
    },
    state: {
      type: Object,
      required: true
    },
    ratio: {
      type: Number,
      default: 0
    },
    rewind: {
      type: [Number, Boolean],
      default: false
    },
    scaleStep: {
      type: Number,
      required: true
    },
    offsetY: {
      type: Number,
      required: true
    },
    offsetUnit: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      inited: false,
      scopedRewind: false,
      willDestory: false
    };
  },
  computed: {
    curScale: function curScale() {
      return this.scaleStep * this.index;
    },
    isCur: function isCur() {
      return this.index === 0;
    },
    style: function style() {
      if (!this.inited) {
        return {};
      }
      var status2 = this.state.status;
      if (status2 === STATUS.MOVING) {
        return this.movingStyle;
      } else {
        return this.normalStyle;
      }
    },
    normalStyle: function normalStyle() {
      if (this.isCur) {
        return {
          opacity: 1,
          transform: "translate3d(0,0,0) rotate(0) scale3d(1,1,1)",
          transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0s"
        };
      }
      return {
        opacity: this.ready ? 0 : 1,
        transform: this.getTransform(),
        transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) ".concat(this.scopedRewind ? this.scopedRewind * 80 : 0, "ms, z-index 0s")
      };
    },
    movingStyle: function movingStyle() {
      var style2 = {
        transition: "none"
      };
      if (this.isCur) {
        var state = this.state;
        var start2 = state.start, move2 = state.move, startPoint = state.startPoint;
        var x = move2.x - start2.x || 0;
        var y = move2.y - start2.y || 0;
        var rotate = 10 * this.ratio * startPoint;
        style2["transform"] = "translate3d(".concat(x, "px,").concat(y, "px,0) rotate(").concat(rotate, "deg)");
      } else {
        var ratio2 = Math.abs(this.ratio);
        if (ratio2 > 1) {
          ratio2 = 1;
        }
        if (this.ready) {
          style2["opacity"] = ratio2 * 1;
        }
        style2["transform"] = this.getTransform(ratio2);
      }
      return style2;
    }
  },
  watch: {
    index: function index(val, oldVal) {
      if (val < oldVal) {
        this.scopedRewind = false;
      }
    }
  },
  created: function created() {
    this.scopedRewind = this.rewind;
    if (!this.tinderMounted) {
      this.inited = true;
    }
  },
  mounted: function mounted() {
    var _this = this;
    requestAnimationFrame(function() {
      _this.inited = true;
    });
  },
  methods: {
    transitionEnd: function transitionEnd(e) {
      if (e.target === e.currentTarget && e.propertyName === "transform") {
        this.scopedRewind = false;
        if (this.isCur) {
          var status2 = this.state.status;
          if (status2 === STATUS.REVERT || status2 === STATUS.REWINDING) {
            this.$emit("reverted");
          }
        }
      }
    },
    getTransform: function getTransform(ratio2) {
      var index2 = this.index;
      var translateY = 0;
      var scale = 1 - this.scaleStep * index2;
      if (ratio2) {
        scale += ratio2 * this.scaleStep;
      }
      if (this.offsetY) {
        var inverse = this.offsetY < 0;
        var offsetY = Math.abs(this.offsetY);
        var y = index2 * offsetY;
        var offsetScale = (1 - scale) / 2 * 100;
        if (ratio2) {
          y -= ratio2 * offsetY;
        }
        if (inverse) {
          y *= -1;
          offsetScale *= -1;
        }
        translateY = "calc(".concat(offsetScale, "% + ").concat(y).concat(this.offsetUnit, ")");
      }
      return "translate3d(0,".concat(translateY, ",0) scale3d(").concat(scale, ",").concat(scale, ",1)");
    }
  }
};
var _hoisted_1$1 = ["data-index"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "data-index": $props.index,
    class: "tinder-card",
    style: normalizeStyle([{
      zIndex: 100 - $props.index
    }, $options.style]),
    onTransitionend: _cache[0] || (_cache[0] = function() {
      return $options.transitionEnd && $options.transitionEnd.apply($options, arguments);
    })
  }, [renderSlot(_ctx.$slots, "default", {}, void 0, true), renderSlot(_ctx.$slots, "nope", {}, void 0, true), renderSlot(_ctx.$slots, "like", {}, void 0, true), renderSlot(_ctx.$slots, "super", {}, void 0, true), renderSlot(_ctx.$slots, "down", {}, void 0, true), createVNode(Transition, {
    name: "tinder-rewind"
  }, {
    default: withCtx(function() {
      return [_ctx.scopedRewind !== false ? renderSlot(_ctx.$slots, "rewind", {
        key: 0
      }, void 0, true) : createCommentVNode("", true)];
    }),
    _: 3
  })], 44, _hoisted_1$1);
}
var TinderCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-7d6ecee4"]]);
var difference = function difference2(array, exclude) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (exclude.indexOf(array[i]) > -1) {
      break;
    }
    result.push(array[i]);
  }
  return result;
};
var queueHandle = {
  data: function data2() {
    return {
      leavingKeys: [],
      onceRewindCount: 0
    };
  },
  methods: {
    diff: function diff(list, old) {
      var keyName = this.keyName;
      var add = difference(list, old);
      var onceRewindCount = 0;
      if (add.length) {
        for (var i = 0; i < add.length; i++) {
          var item = this.queue[i];
          if (item[keyName] && add[i] === item[keyName]) {
            onceRewindCount++;
            var id = item[keyName];
            var newVueTinderkey = id + Math.random();
            if (this.leavingKeys.indexOf(item.$vtKey) > -1 || this.leavingKeys.indexOf(id) > -1 || this.rewindKeys.indexOf(item.$vtKey) > -1 || this.rewindKeys.indexOf(id) > -1) {
              item.$vtKey = newVueTinderkey;
              var rewindIndex = Math.max(this.rewindKeys.indexOf(item.$vtKey), this.rewindKeys.indexOf(id));
              if (rewindIndex > -1) {
                this.rewindKeys[rewindIndex] = newVueTinderkey;
                this.state.status = STATUS.REWINDING;
              }
            }
          } else {
            break;
          }
        }
      }
      this.onceRewindCount = onceRewindCount;
      var remove = difference(old, list);
      if (remove.length) {
        this.leavingKeys.push(this.list[0].$vtKey || this.list[0][keyName]);
        for (var _i = this.max + 1; _i < this.max + 1 + remove.length; _i++) {
          var _item = this.list[_i];
          if (_item) {
            if (this.leavingKeys.indexOf(_item[keyName]) > -1 || this.hidingKeys.indexOf(_item[keyName]) > -1) {
              _item.$vtKey = _item[keyName] + Math.random();
            }
          }
        }
      }
      this.list = this.queue.slice(0);
    }
  }
};
var touchEvent = {
  methods: {
    start: function start(e) {
      if (this.disableTouch) {
        return;
      }
      var state = this.state;
      if (state.touchId !== null || this.status === STATUS.LEAVING || this.status === STATUS.REVERT || this.status === STATUS.REWINDING) {
        return;
      }
      var pageX, pageY;
      if (e.type === "touchstart") {
        pageX = e.changedTouches[0].pageX;
        pageY = e.changedTouches[0].pageY;
      } else {
        pageX = e.clientX;
        pageY = e.clientY;
      }
      var top = this.size.top;
      var height = this.size.height;
      var centerY = top + height / 2;
      var startPoint = pageY > centerY ? -1 : 1;
      this.state = {
        status: STATUS.MOVING,
        touchId: e.type === "touchstart" ? e.changedTouches[0].identifier : "mouse",
        start: {
          x: pageX,
          y: pageY
        },
        move: /* @__PURE__ */ Object.create(null),
        startPoint,
        result: null
      };
    },
    move: function move(e) {
      if (this.disableTouch) {
        return;
      }
      e.preventDefault();
      var state = this.state;
      if (state.touchId === null || this.status === STATUS.LEAVING || this.status === STATUS.REVERT || this.status === STATUS.REWINDING || e.type === "touchmove" && state.touchId !== e.changedTouches[0].identifier) {
        return;
      }
      var pageX, pageY;
      if (e.type === "touchmove") {
        pageX = e.changedTouches[0].pageX;
        pageY = e.changedTouches[0].pageY;
      } else {
        pageX = e.clientX;
        pageY = e.clientY;
      }
      state.move = {
        x: pageX,
        y: pageY
      };
    },
    end: function end(e) {
      if (this.disableTouch) {
        return;
      }
      if (e.type === "touchstart" && this.state.touchId !== e.changedTouches[0].identifier) {
        return;
      }
      if (this.status === STATUS.LEAVING || this.status === STATUS.REVERT || this.status === STATUS.REWINDING) {
        return;
      }
      if (Math.abs(this.pointerOpacity) >= 1 || this.superOpacity >= 1 || this.downOpacity >= 1) {
        var result = this.superOpacity >= 1 ? "super" : this.downOpacity >= 1 ? "down" : this.pointerOpacity > 0 ? "like" : "nope";
        this.shiftCard(result);
      } else if (this.status === STATUS.MOVING) {
        this.state = initStatus("reverted");
      }
    }
  }
};
var transitionEvent = {
  data: function data3() {
    return {
      leavedCount: 0,
      hideIndex: 50,
      lastHideIndex: 50,
      hidingKeys: []
    };
  },
  methods: {
    beforeEnter: function beforeEnter(el) {
      var beforeIndex = el.dataset.index - 0 + 1;
      el.style.opacity = 0;
      el.style.transform = this.getTransform(beforeIndex);
      if (this.rewindKeys.indexOf(el.dataset.id) > -1) {
        var x = -1;
        x += this.size.width * (x < 0 ? -0.5 : 0.5);
        var ratio2 = x / (this.size.width * 0.5);
        var rotate = ratio2 / (0.8 / 0.5) * 15 * 1;
        el.style.transform = "translate3d(".concat(x, "px, 0, 0) rotate(").concat(rotate, "deg)");
      }
      el.style.transition = "all 0s";
    },
    leave: function leave(el, done) {
      var _this = this;
      var state = this.state;
      var start2 = state.start, move2 = state.move, startPoint = state.startPoint;
      var x = move2.x - start2.x || 0;
      var y = move2.y - start2.y || 0;
      if (state.result === "super") {
        y -= this.size.width;
      } else if (state.result === "down") {
        y += this.size.width;
      } else {
        x += this.size.width * (x < 0 ? -0.5 : 0.5);
        y *= x / (move2.x - start2.x);
      }
      var ratio2 = x / (this.size.width * 0.5);
      var rotate = ratio2 / (0.8 / 0.5) * 15 * startPoint;
      var duration = state.touchId === null || state.result === "super" || state.result === "down" ? 800 : 300;
      el.style.opacity = 0;
      el.style["pointer-events"] = "none";
      if (this.leavingKeys.indexOf(el.dataset.id) > -1) {
        el.className += " ".concat(state.result);
        el.style.transform = "translate3d(".concat(x, "px,").concat(y, "px,0) rotate(").concat(rotate, "deg)");
        el.style.zIndex = 1e6 - this.leavedCount++;
      } else {
        this.hidingKeys.push(el.dataset.id);
        duration = 500;
        var index2 = Math.min(this.max, this.onceRewindCount) + (el.dataset.index - 0);
        el.style.transform = this.getTransform(index2);
        el.style.zIndex = this.getHideIndex(el.dataset.index - 0);
      }
      el.style.transition = "all ".concat(duration, "ms ").concat(duration === 500 ? "cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "ease", ",z-index 0s");
      el.addEventListener("transitionend", function(e) {
        if (e.propertyName === "transform") {
          if (_this.lastHideIndex === el.style.zIndex - 0) {
            _this.lastHideIndex = 50;
            _this.hideIndex = 50;
          }
          if (_this.sync && (_this.status === STATUS.NORMAL || _this.status === STATUS.LEAVING)) {
            _this.resetStatus();
          }
          done();
        }
      });
      if (!this.sync && el.dataset.index - 0 === 0 && this.status !== STATUS.REWINDING) {
        this.resetStatus();
      }
    },
    getHideIndex: function getHideIndex(index2) {
      var max = this.max;
      var cur;
      if (index2 === max) {
        if (this.lastHideIndex > this.hideIndex) {
          cur = this.hideIndex;
          this.hideIndex += 1 + max;
        } else {
          cur = this.hideIndex++;
        }
      } else {
        cur = this.hideIndex + max - index2;
      }
      this.lastHideIndex = cur;
      return cur;
    },
    getTransform: function getTransform2(index2) {
      var scale = 1 - this.scaleStep * index2;
      var translateY = 0;
      if (this.offsetY) {
        var inverse = this.offsetY < 0;
        var offsetY = Math.abs(this.offsetY);
        var y = index2 * offsetY;
        var offsetScale = (1 - scale) / 2 * 100;
        if (inverse) {
          y *= -1;
          offsetScale *= -1;
        }
        translateY = "calc(".concat(offsetScale, "% + ").concat(y).concat(this.offsetUnit, ")");
      }
      return "translate3d(0,".concat(translateY, ",0) scale3d(").concat(scale, ",").concat(scale, ",1)");
    }
  }
};
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
var openMethods = {
  data: function data4() {
    return {
      rewindKeys: []
    };
  },
  methods: {
    decide: function decide(type) {
      if (this.state.touchId || this.status !== STATUS.NORMAL || !this.queue.length) {
        return;
      }
      this.state.start = {
        x: 0,
        y: 0
      };
      this.state.move = {
        x: type === "super" || type === "down" ? 0 : type === "like" ? 1 : -1,
        y: type === "super" ? -1 : type === "down" ? 1 : 0
      };
      this.state.startPoint = 1;
      this.shiftCard(type);
    },
    rewind: function rewind(list) {
      var _this$queue;
      var keyName = this.keyName;
      var _iterator = _createForOfIteratorHelper(list), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          this.rewindKeys.push(item[keyName] + "");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      (_this$queue = this.queue).unshift.apply(_this$queue, _toConsumableArray(list));
      this.$emit("update:queue", this.queue.slice(0));
    },
    shiftCard: function shiftCard(type) {
      this.state.status = STATUS.LEAVING;
      this.state.result = type;
      var item = this.queue.shift();
      this.$emit("update:queue", this.queue.slice(0));
      this.submitDecide(type, item);
    },
    submitDecide: function submitDecide(type, item) {
      this.$emit("submit", {
        type,
        key: item[this.keyName],
        item
      });
    }
  }
};
var Tinder_vue_vue_type_style_index_0_scoped_true_lang = "";
var resizeTimer;
var _sfc_main = {
  name: "Tinder",
  emits: ["update:queue", "submit"],
  mixins: [queueHandle, touchEvent, transitionEvent, openMethods],
  components: {
    TinderCard
  },
  props: {
    allowSuper: {
      type: Boolean,
      default: true
    },
    allowDown: {
      type: Boolean,
      default: false
    },
    queue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    keyName: {
      type: String,
      default: "key"
    },
    pointerThreshold: {
      type: Number,
      default: 0.5
    },
    superThreshold: {
      type: Number,
      default: 0.5
    },
    downThreshold: {
      type: Number,
      default: 0.5
    },
    sync: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 3
    },
    scaleStep: {
      type: Number,
      default: 0.05
    },
    offsetY: {
      type: Number,
      default: 0
    },
    offsetUnit: {
      type: String,
      default: "px"
    },
    disableTouch: {
      type: Boolean,
      default: false
    }
  },
  data: function data5() {
    return {
      size: {
        top: 0,
        width: 0,
        height: 0
      },
      state: initStatus(),
      list: [],
      tinderMounted: false
    };
  },
  computed: {
    status: function status() {
      return this.state.status;
    },
    ratio: function ratio() {
      if (this.size.width) {
        var _this$state = this.state, start2 = _this$state.start, move2 = _this$state.move;
        var x = move2.x - start2.x || 0;
        var ratio2 = x / (this.size.width * 0.5);
        return ratio2;
      }
      return 0;
    },
    pointerOpacity: function pointerOpacity() {
      return this.ratio / this.pointerThreshold;
    },
    disY: function disY() {
      if (this.allowSuper || this.allowDown) {
        return this.state.move.y - this.state.start.y;
      }
      return 0;
    },
    superOpacity: function superOpacity() {
      if (!this.allowSuper) {
        return 0;
      }
      var ratio2 = this.disY / (-this.superThreshold * this.size.height);
      var pointerOpacity2 = Math.abs(this.pointerOpacity);
      return ratio2 > pointerOpacity2 ? ratio2 : 0;
    },
    downOpacity: function downOpacity() {
      if (!this.allowDown) {
        return 0;
      }
      var ratio2 = this.disY / (this.downThreshold * this.size.height);
      var pointerOpacity2 = Math.abs(this.pointerOpacity);
      return ratio2 > pointerOpacity2 ? ratio2 : 0;
    },
    likeOpacity: function likeOpacity() {
      if (this.superOpacity || this.downOpacity) {
        return 0;
      }
      return this.pointerOpacity;
    },
    nopeOpacity: function nopeOpacity() {
      return -this.likeOpacity;
    }
  },
  watch: {
    queue: function queue(val) {
      var keyName = this.keyName;
      var newKeys = val.map(function(item) {
        return item[keyName];
      });
      var oldKeys = this.list.map(function(item) {
        return item[keyName];
      });
      this.diff(newKeys, oldKeys);
    }
  },
  mounted: function mounted2() {
    if (!this.$el.offsetWidth || !this.$el.offsetHeight) {
      console.error("\u8BF7\u8BBE\u7F6Evue-tinder\u7684\u5BBD\u9AD8");
      return;
    }
    this.size = {
      top: this.$el.offsetTop,
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };
    window.onresize = this.getSize;
    this.tinderMounted = true;
  },
  created: function created2() {
    this.list = this.queue.slice(0);
  },
  unmounted: function unmounted() {
    window.removeEventListener("onresize", this.getSize);
  },
  methods: {
    getSize: function getSize() {
      var _this = this;
      clearInterval(resizeTimer);
      resizeTimer = setTimeout(function() {
        _this.size = {
          top: _this.$el.offsetTop,
          width: _this.$el.offsetWidth,
          height: _this.$el.offsetHeight
        };
      }, 300);
    },
    resetStatus: function resetStatus() {
      this.state = initStatus();
    }
  }
};
var _hoisted_1 = {
  key: 1,
  slot: "rewind",
  class: "pointer-wrap rewind-pointer-wrap"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TinderCard = resolveComponent("TinderCard");
  return openBlock(), createBlock(TransitionGroup, {
    class: "vue-tinder",
    tag: "div",
    css: false,
    onBeforeEnter: _ctx.beforeEnter,
    onLeave: _ctx.leave,
    onTouchstart: _ctx.start,
    onTouchmove: _ctx.move,
    onTouchend: _ctx.end,
    onTouchcancel: _ctx.end,
    onMousedown: _ctx.start,
    onMousemove: _ctx.move,
    onMouseup: _ctx.end
  }, {
    default: withCtx(function() {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, function(item, index2) {
        return openBlock(), createElementBlock(Fragment, null, [index2 < $props.max + 1 ? (openBlock(), createBlock(_component_TinderCard, {
          ready: index2 === $props.max,
          key: item.$vtKey || item[$props.keyName],
          "data-id": item.$vtKey || item[$props.keyName],
          index: index2,
          state: _ctx.state,
          ratio: $options.ratio,
          rewind: _ctx.rewindKeys.indexOf(item.$vtKey || item[$props.keyName]) > -1 ? index2 : false,
          "tinder-mounted": _ctx.tinderMounted,
          "scale-step": $props.scaleStep,
          "offset-y": $props.offsetY,
          "offset-unit": $props.offsetUnit,
          onReverted: $options.resetStatus
        }, {
          default: withCtx(function() {
            return [renderSlot(_ctx.$slots, "default", {
              data: item,
              index: index2,
              status: $options.status
            }, void 0, true), index2 === 0 && $options.status !== 2 ? (openBlock(), createElementBlock(Fragment, {
              key: 0
            }, [createElementVNode("span", {
              slot: "nope",
              class: "pointer-wrap nope-pointer-wrap",
              style: normalizeStyle({
                opacity: $options.nopeOpacity
              })
            }, [renderSlot(_ctx.$slots, "nope", {
              opacity: $options.nopeOpacity
            }, void 0, true)], 4), createElementVNode("span", {
              slot: "like",
              class: "pointer-wrap like-pointer-wrap",
              style: normalizeStyle({
                opacity: $options.likeOpacity
              })
            }, [renderSlot(_ctx.$slots, "like", {
              opacity: $options.likeOpacity
            }, void 0, true)], 4), $props.allowSuper ? (openBlock(), createElementBlock("span", {
              key: 0,
              slot: "super",
              class: "pointer-wrap super-pointer-wrap",
              style: normalizeStyle({
                opacity: $options.superOpacity
              })
            }, [renderSlot(_ctx.$slots, "super", {
              opacity: $options.superOpacity
            }, void 0, true)], 4)) : createCommentVNode("", true), $props.allowDown ? (openBlock(), createElementBlock("span", {
              key: 1,
              slot: "down",
              class: "pointer-wrap down-pointer-wrap",
              style: normalizeStyle({
                opacity: $options.downOpacity
              })
            }, [renderSlot(_ctx.$slots, "down", {
              opacity: $options.downOpacity
            }, void 0, true)], 4)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), _ctx.state.status === 4 ? (openBlock(), createElementBlock("span", _hoisted_1, [renderSlot(_ctx.$slots, "rewind", {}, void 0, true)])) : createCommentVNode("", true)];
          }),
          _: 2
        }, 1032, ["ready", "data-id", "index", "state", "ratio", "rewind", "tinder-mounted", "scale-step", "offset-y", "offset-unit", "onReverted"])) : createCommentVNode("", true)], 64);
      }), 256))];
    }),
    _: 3
  }, 8, ["onBeforeEnter", "onLeave", "onTouchstart", "onTouchmove", "onTouchend", "onTouchcancel", "onMousedown", "onMousemove", "onMouseup"]);
}
var Tinder = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3acd8220"]]);
Tinder.install = function(Vue) {
  Vue.component("VueTinder", Tinder);
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component("tinder", Tinder);
}
export { Tinder as default };
