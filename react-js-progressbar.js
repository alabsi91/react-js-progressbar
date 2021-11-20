"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Progressbar;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _requestAnimationNumber = require("request-animation-number");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Progressbar(props) {
  var _props$size, _props$clockwise, _props$dashed, _props$dashesSize, _props$dashesGap, _props$pathWidth, _props$trailWidth, _props$customText, _props$textPosition$x, _props$textPosition, _props$textPosition$y, _props$textPosition2, _props$animateText, _props$animation$dura, _props$animation, _props$animation$dela, _props$animation2, _props$animation3, _props$animateOnMount, _props$animateOnInput, _strokeShadow$split;

  const pathRef = (0, _react.useRef)();
  const pathGradiantRef = (0, _react.useRef)();
  const textRef = (0, _react.useRef)();
  const trailRef = (0, _react.useRef)();
  const trailGradiantRef = (0, _react.useRef)();
  const backgroundColorRef = (0, _react.useRef)();
  const backgroundColorGradiantRef = (0, _react.useRef)();
  const [oldProgressValue, setoldProgressValue] = (0, _react.useState)(null);
  const [oldTextValue, setoldTextValue] = (0, _react.useState)(null);
  const [svgId] = (0, _react.useState)(Math.random() * 1000);
  let input = props.input;
  input = Math.min(Math.max(input, 0), 100);
  const type = props.shape || 'full circle'; // 'semi circle' | 'full circle' | 'arc'

  const size = (_props$size = props.size) !== null && _props$size !== void 0 ? _props$size : '100%';
  const clockwise = (_props$clockwise = props.clockwise) !== null && _props$clockwise !== void 0 ? _props$clockwise : true;
  const dashed = (_props$dashed = props.dashed) !== null && _props$dashed !== void 0 ? _props$dashed : false;
  const dashesSize = (_props$dashesSize = props.dashesSize) !== null && _props$dashesSize !== void 0 ? _props$dashesSize : 15;
  const dashesGap = (_props$dashesGap = props.dashesGap) !== null && _props$dashesGap !== void 0 ? _props$dashesGap : 2;
  const strokeWidth = (_props$pathWidth = props.pathWidth) !== null && _props$pathWidth !== void 0 ? _props$pathWidth : 12;
  const strokeColor = props.pathColor || ['#f4314a', '#fa5813'];
  const strokeLinecap = props.pathLinecap || (type === 'arc' ? 'none' : 'round'); // 'butt' | 'round' | 'square' | 'none'

  const strokeShadow = dashed ? 'none' : props.pathShadow && props.pathShadow !== 'none' ? "drop-shadow(".concat(props.pathShadow, ")") : props.pathShadow === 'none' ? 'none' : 'drop-shadow(0px 0px 2px #00000080)';
  const trailWidth = (_props$trailWidth = props.trailWidth) !== null && _props$trailWidth !== void 0 ? _props$trailWidth : 5;
  const trailColor = props.trailColor || 'lightgray';
  const backgroundColor = props.backgroundColor || 'none';
  const textValue = (_props$customText = props.customText) !== null && _props$customText !== void 0 ? _props$customText : (oldTextValue ? oldTextValue.toFixed(0) : input.toFixed(0)) + '%';
  const textPositionX = (_props$textPosition$x = (_props$textPosition = props.textPosition) === null || _props$textPosition === void 0 ? void 0 : _props$textPosition.x) !== null && _props$textPosition$x !== void 0 ? _props$textPosition$x : '50%';
  const textPositionY = (_props$textPosition$y = (_props$textPosition2 = props.textPosition) === null || _props$textPosition2 === void 0 ? void 0 : _props$textPosition2.y) !== null && _props$textPosition$y !== void 0 ? _props$textPosition$y : type === 'arc' ? '40%' : '50%';
  const textPosition = {
    x: textPositionX,
    y: textPositionY
  };

  const textStyle = _objectSpread({
    fontSize: '50px',
    fill: 'black'
  }, props.textStyle);

  const animateText = (_props$animateText = props.animateText) !== null && _props$animateText !== void 0 ? _props$animateText : true;
  const animationDuration = (_props$animation$dura = (_props$animation = props.animation) === null || _props$animation === void 0 ? void 0 : _props$animation.duration) !== null && _props$animation$dura !== void 0 ? _props$animation$dura : 500;
  const animationDelay = (_props$animation$dela = (_props$animation2 = props.animation) === null || _props$animation2 === void 0 ? void 0 : _props$animation2.delay) !== null && _props$animation$dela !== void 0 ? _props$animation$dela : 0;
  const animationEase = ((_props$animation3 = props.animation) === null || _props$animation3 === void 0 ? void 0 : _props$animation3.ease) || 'easeOutBack';
  const animateOnMount = (_props$animateOnMount = props.animateOnMount) !== null && _props$animateOnMount !== void 0 ? _props$animateOnMount : true;
  const animateOnInputChange = (_props$animateOnInput = props.animateOnInputChange) !== null && _props$animateOnInput !== void 0 ? _props$animateOnInput : true;
  const animation = {
    duration: animationDuration,
    delay: animationDelay,
    ease: animationEase,
    animateOnMount,
    animateOnInputChange
  };

  const checkTypes = () => {
    if (typeof input !== 'number' || input < 0) console.error('react-js-ProgressBar: props.input has invalid value.');
    if (!new Set(['full circle', 'semi circle', 'full circle', 'arc']).has(type)) console.error('react-js-ProgressBar: props.shape has invalid value.');
    if (typeof size !== 'number' && typeof size !== 'string') console.error('react-js-ProgressBar: props.size has invalid value.');
    if (typeof clockwise !== 'boolean') console.error('react-js-ProgressBar: props.clockwise has invalid value.');
    if (typeof dashed !== 'boolean') console.error('react-js-ProgressBar: props.dashed has invalid value.');
    if (typeof dashesSize !== 'number' || dashesSize < 0) console.error('react-js-ProgressBar: props.dashesSize has invalid value.');
    if (typeof dashesGap !== 'number' || dashesGap < 0) console.error('react-js-ProgressBar: props.dashesGap has invalid value.');
    if (typeof strokeWidth !== 'number' || strokeWidth < 0) console.error('react-js-ProgressBar: props.pathWidth has invalid value.');
    if (typeof strokeColor !== 'string' && typeof strokeColor !== 'object') console.error('react-js-ProgressBar: props.pathColor has invalid value.');
    if (!new Set(['butt', 'round', 'square', 'none']).has(strokeLinecap)) console.error('react-js-ProgressBar: props.pathLinecap has invalid value.');
    if (typeof strokeShadow !== 'string') console.error('react-js-ProgressBar: props.pathShadow has invalid value.');
    if (typeof trailWidth !== 'number' || trailWidth < 0) console.error('react-js-ProgressBar: props.trailWidth has invalid value.');
    if (typeof trailColor !== 'string' && typeof trailColor !== 'object') console.error('react-js-ProgressBar: props.trailColor has invalid value.');
    if (typeof backgroundColor !== 'string' && typeof backgroundColor !== 'object') console.error('react-js-ProgressBar: props.backgroundColor has invalid value.');
    if (typeof textPositionX !== 'number' && typeof textPositionX !== 'string') console.error('react-js-ProgressBar: props.textPosition.x has invalid value.');
    if (typeof textPositionY !== 'number' && typeof textPositionY !== 'string') console.error('react-js-ProgressBar: props.textPosition.y has invalid value.');
    if (typeof textPosition !== 'object') console.error('react-js-ProgressBar: props.textPosition has invalid value.');
    if (typeof textStyle !== 'object') console.error('react-js-ProgressBar: props.textStyle has invalid value.');
    if (typeof animateText !== 'boolean') console.error('react-js-ProgressBar: props.animateText has invalid value.');
    if (typeof animationDuration !== 'number' || animationDuration < 0) console.error('react-js-ProgressBar: props.animation.duration has invalid value.');
    if (typeof animationDelay !== 'number' || animationDelay < 0) console.error('react-js-ProgressBar: props.animation.delay has invalid value.');
    if (!new Set(['linear', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']).has(animationEase) && typeof animationEase === 'string' || typeof animationEase !== 'string' && typeof animationEase !== 'function') console.error('react-js-ProgressBar: props.animation.ease has invalid value.');
    if (typeof animateOnMount !== 'boolean') console.error('react-js-ProgressBar: props.animation.animateOnMount has invalid value.');
    if (typeof animateOnInputChange !== 'boolean') console.error('react-js-ProgressBar: props.animation.animateOnInputChange has invalid value.');
    if (typeof animation !== 'object') console.error('react-js-ProgressBar: props.animation has invalid value.');
  };

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') checkTypes();
  const R = 100;
  const circumference = type === 'full circle' ? 2 * Math.PI * R : type === 'arc' ? 2 * Math.PI * 100 / 2 : type === 'semi circle' ? 2 * Math.PI * R / 1.329 : 0;
  const calcProgress = (circumference - input * circumference / 100) * (clockwise ? 1 : -1);
  const pathShadowBlur = strokeShadow !== 'none' ? parseInt(strokeShadow === null || strokeShadow === void 0 ? void 0 : (_strokeShadow$split = strokeShadow.split(' ')) === null || _strokeShadow$split === void 0 ? void 0 : _strokeShadow$split[2]) : 0;
  const trailShadowBlur = Math.abs(pathShadowBlur - (trailWidth - strokeWidth));
  const viewBoxExpand = trailWidth > strokeWidth ? "".concat(-(trailWidth / 2 + trailShadowBlur), " ").concat(trailWidth / 2 + trailShadowBlur, " ").concat(200 + trailWidth + trailShadowBlur, " ").concat(200 + trailWidth + trailShadowBlur) : "".concat(-(strokeWidth / 2 + pathShadowBlur), " ").concat(strokeWidth / 2 + pathShadowBlur, " ").concat(200 + strokeWidth + pathShadowBlur, " ").concat(200 + strokeWidth + pathShadowBlur);
  const maskCord = trailWidth > strokeWidth ? -trailWidth / 2 : -strokeWidth / 2;
  const Gradiant = /*#__PURE__*/(0, _react.forwardRef)((options, ref) => {
    return /*#__PURE__*/_react.default.createElement("linearGradient", {
      ref: ref,
      id: options.id + svgId,
      x: "0%",
      x2: "0%",
      y1: "0%",
      y2: "100%"
    }, /*#__PURE__*/_react.default.createElement("stop", {
      offset: "0%",
      stopColor: options.stop1
    }), /*#__PURE__*/_react.default.createElement("stop", {
      offset: "90%",
      stopColor: options.stop2
    }));
  });
  const [isFirstMount, setIsFirstMount] = (0, _react.useState)(true);
  const SemiCircle = (0, _react.useCallback)(() => {
    const translateY = trailWidth > strokeWidth ? trailWidth + trailShadowBlur : strokeWidth + pathShadowBlur;
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;
    return /*#__PURE__*/_react.default.createElement("svg", {
      width: size,
      height: size,
      viewBox: viewBoxExpand,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, typeof backgroundColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: backgroundColorGradiantRef,
      id: "react-js-progrssBar-background",
      stop1: backgroundColor[0],
      stop2: backgroundColor[1]
    }) : null, backgroundColor !== 'none' ? /*#__PURE__*/_react.default.createElement("circle", {
      ref: backgroundColorRef,
      cx: "100",
      cy: "100",
      r: R - strokeWidth / 2 + 0.5,
      transform: "rotate(270)",
      fill: typeof backgroundColor === 'object' ? "url(#react-js-progrssBar-background".concat(svgId, ")") : backgroundColor,
      style: {
        transformOrigin: 'center'
      }
    }) : null, typeof trailColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: trailGradiantRef,
      id: "react-js-progrssBar-trail",
      stop1: trailColor[0],
      stop2: trailColor[1]
    }) : null, trailColor === 'none' || trailWidth === 0 ? null : /*#__PURE__*/_react.default.createElement("path", {
      d: "M170.063 171.353C188.54 153.208 200 127.942 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 127.942 11.4604 153.208 29.9371 171.353",
      ref: trailRef,
      strokeWidth: trailWidth + 'px',
      stroke: typeof trailColor === 'object' ? "url(#react-js-progrssBar-trail".concat(svgId, ")") : trailColor,
      strokeLinecap: strokeLinecap,
      style: {
        transform: "translateY(".concat(translateY, "px)")
      }
    }), typeof strokeColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: pathGradiantRef,
      id: "react-js-progrssBar-path",
      stop1: strokeColor[0],
      stop2: strokeColor[1]
    }) : null, /*#__PURE__*/_react.default.createElement("path", {
      d: "M170.063 171.353C188.54 153.208 200 127.942 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 127.942 11.4604 153.208 29.9371 171.353",
      ref: pathRef,
      strokeWidth: strokeWidth + 'px',
      stroke: typeof strokeColor === 'object' ? "url(#react-js-progrssBar-path".concat(svgId, ")") : strokeColor,
      strokeDashoffset: oldProgressValue !== null ? oldProgressValue : circumference + 'px',
      strokeDasharray: circumference + 'px',
      strokeLinecap: strokeLinecap,
      mask: dashed ? "url(#react-js-progrssBar-dashes".concat(svgId, ")") : null,
      style: {
        transform: "translateY(".concat(translateY, "px)"),
        filter: strokeShadow
      }
    }), dashed ? /*#__PURE__*/_react.default.createElement("mask", {
      maskUnits: "userSpaceOnUse",
      x: maskCord,
      y: maskCord,
      id: 'react-js-progrssBar-dashes' + svgId
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M170.063 171.353C188.54 153.208 200 127.942 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 127.942 11.4604 153.208 29.9371 171.353",
      stroke: "white",
      strokeWidth: strokeWidth + 'px',
      strokeDasharray: "".concat(dashesSize, "px ").concat(dashesGap, "px")
    })) : null, props.customText === '' ? null : /*#__PURE__*/_react.default.createElement("text", {
      ref: textRef,
      x: textPosition.x,
      y: textPosition.y,
      dy: textShift,
      dx: -textShift,
      textAnchor: "middle",
      dominantBaseline: "central",
      style: _objectSpread({}, textStyle)
    }, textValue), props.children ? /*#__PURE__*/_react.default.createElement("foreignObject", {
      x: trailWidth > strokeWidth ? -trailWidth / 2 : -strokeWidth / 2,
      y: trailWidth > strokeWidth ? trailWidth / 2 : strokeWidth / 2,
      width: "100%",
      height: "100%"
    }, props.children) : null); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);
  const Arc = (0, _react.useCallback)(() => {
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;
    const translateY = trailWidth > strokeWidth ? trailWidth + trailShadowBlur : strokeWidth + pathShadowBlur;
    const hs = strokeWidth / 2;
    return /*#__PURE__*/_react.default.createElement("svg", {
      width: size,
      height: size,
      viewBox: viewBoxExpand,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, typeof backgroundColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: backgroundColorGradiantRef,
      id: "react-js-progrssBar-background",
      stop1: backgroundColor[0],
      stop2: backgroundColor[1]
    }) : null, backgroundColor !== 'none' ? /*#__PURE__*/_react.default.createElement("path", {
      ref: backgroundColorRef,
      d: "M".concat(200.5 - hs, " 100 C").concat(200.5 - hs, " 45 ").concat(155.5 - hs, " ").concat(hs - 0.5, " 100 ").concat(hs - 0.5, " C45 ").concat(hs, " ").concat(hs, " ").concat(45 + hs, " ").concat(hs, " 100"),
      fill: typeof backgroundColor === 'object' ? "url(#react-js-progrssBar-background".concat(svgId, ")") : backgroundColor,
      style: {
        transform: "translateY(".concat(translateY, "px)")
      }
    }) : null, typeof trailColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: trailGradiantRef,
      id: "react-js-progrssBar-trail",
      stop1: trailColor[0],
      stop2: trailColor[1]
    }) : null, trailColor === 'none' || trailWidth === 0 ? null : /*#__PURE__*/_react.default.createElement("path", {
      ref: trailRef,
      d: "M200 100 C200 45 155 0 100 0 C45 0 0 45 0 100",
      strokeWidth: trailWidth + 'px',
      stroke: typeof trailColor === 'object' ? "url(#react-js-progrssBar-trail".concat(svgId, ")") : trailColor,
      strokeLinecap: strokeLinecap,
      style: {
        transform: "translateY(".concat(translateY, "px)")
      }
    }), typeof strokeColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: pathGradiantRef,
      id: "react-js-progrssBar-path",
      stop1: strokeColor[0],
      stop2: strokeColor[1]
    }) : null, /*#__PURE__*/_react.default.createElement("path", {
      d: "M200 100 C200 45 155 0 100 0 C45 0 0 45 0 100",
      ref: pathRef,
      strokeWidth: strokeWidth + 'px',
      stroke: typeof strokeColor === 'object' ? "url(#react-js-progrssBar-path".concat(svgId, ")") : strokeColor,
      strokeDashoffset: oldProgressValue !== null ? oldProgressValue : circumference + 'px',
      strokeDasharray: circumference + 'px',
      strokeLinecap: strokeLinecap,
      mask: dashed ? "url(#react-js-progrssBar-dashes".concat(svgId, ")") : null,
      style: {
        transform: "translateY(".concat(translateY, "px)")
      }
    }), dashed ? /*#__PURE__*/_react.default.createElement("mask", {
      maskUnits: "userSpaceOnUse",
      x: maskCord,
      y: maskCord,
      id: 'react-js-progrssBar-dashes' + svgId
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M199.999 100C200 99.83 200 99.66 200 99.4898C200 44.5431 155.228 0 100 0C44.7715 0 0 44.5431 0 99.4898C0 99.66 0.000429398 99.83 0.00128722 100",
      stroke: "white",
      strokeWidth: strokeWidth + 'px',
      strokeDasharray: "".concat(dashesSize, "px ").concat(dashesGap, "px")
    })) : null, props.customText === '' ? null : /*#__PURE__*/_react.default.createElement("text", {
      ref: textRef,
      x: textPosition.x,
      y: textPosition.y,
      dy: textShift,
      dx: -textShift,
      textAnchor: "middle",
      dominantBaseline: "central",
      style: _objectSpread({}, textStyle)
    }, textValue), props.children ? /*#__PURE__*/_react.default.createElement("foreignObject", {
      x: trailWidth > strokeWidth ? -trailWidth / 2 : -strokeWidth / 2,
      y: trailWidth > strokeWidth ? trailWidth / 2 : strokeWidth / 2,
      width: "100%",
      height: "100%"
    }, props.children) : null); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);
  const FullCircle = (0, _react.useCallback)(() => {
    const textShift = trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2;
    return /*#__PURE__*/_react.default.createElement("svg", {
      width: size,
      height: size,
      viewBox: viewBoxExpand,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none"
    }, typeof backgroundColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: backgroundColorGradiantRef,
      id: "react-js-progrssBar-background",
      stop1: backgroundColor[0],
      stop2: backgroundColor[1]
    }) : null, backgroundColor !== 'none' ? /*#__PURE__*/_react.default.createElement("circle", {
      ref: backgroundColorRef,
      cx: "100",
      cy: "100",
      r: R - strokeWidth / 2 + 0.5,
      transform: "rotate(270)",
      fill: typeof backgroundColor === 'object' ? "url(#react-js-progrssBar-background".concat(svgId, ")") : backgroundColor,
      style: {
        transformOrigin: 'center'
      }
    }) : null, typeof trailColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: trailGradiantRef,
      id: "react-js-progrssBar-trail",
      stop1: trailColor[0],
      stop2: trailColor[1]
    }) : null, trailColor === 'none' || trailWidth === 0 ? null : /*#__PURE__*/_react.default.createElement("circle", {
      ref: trailRef,
      cx: "100",
      cy: "100",
      r: R,
      strokeWidth: trailWidth + 'px',
      stroke: typeof trailColor === 'object' ? "url(#react-js-progrssBar-trail".concat(svgId, ")") : trailColor,
      transform: "rotate(270)",
      style: {
        transformOrigin: 'center'
      }
    }), typeof strokeColor === 'object' ? /*#__PURE__*/_react.default.createElement(Gradiant, {
      ref: pathGradiantRef,
      id: "react-js-progrssBar-path",
      stop1: strokeColor[0],
      stop2: strokeColor[1]
    }) : null, /*#__PURE__*/_react.default.createElement("circle", {
      ref: pathRef,
      cx: "100",
      cy: "100",
      r: R,
      strokeWidth: strokeWidth + 'px',
      stroke: typeof strokeColor === 'object' ? "url(#react-js-progrssBar-path".concat(svgId, ")") : strokeColor,
      strokeDashoffset: oldProgressValue !== null ? oldProgressValue : circumference + 'px',
      strokeDasharray: circumference + 'px',
      strokeLinecap: strokeLinecap,
      transform: "rotate(270)",
      mask: dashed ? "url(#react-js-progrssBar-dashes".concat(svgId, ")") : null,
      style: {
        transformOrigin: 'center',
        filter: strokeShadow
      }
    }), dashed ? /*#__PURE__*/_react.default.createElement("mask", {
      maskUnits: "userSpaceOnUse",
      x: maskCord,
      y: maskCord,
      id: 'react-js-progrssBar-dashes' + svgId
    }, /*#__PURE__*/_react.default.createElement("circle", {
      cx: "100",
      cy: "100",
      r: R,
      stroke: "white",
      strokeWidth: strokeWidth + 'px',
      strokeDasharray: "".concat(dashesSize, "px ").concat(dashesGap, "px")
    })) : null, props.customText === '' ? null : /*#__PURE__*/_react.default.createElement("text", {
      ref: textRef,
      x: textPosition.x,
      y: textPosition.y,
      dy: textShift,
      dx: -textShift,
      textAnchor: "middle",
      dominantBaseline: "central",
      style: _objectSpread({}, textStyle)
    }, textValue), props.children ? /*#__PURE__*/_react.default.createElement("foreignObject", {
      x: trailWidth > strokeWidth ? -trailWidth / 2 - trailShadowBlur / 2 : -strokeWidth / 2 - pathShadowBlur / 2,
      y: trailWidth > strokeWidth ? trailWidth / 2 + trailShadowBlur / 2 : strokeWidth / 2 + pathShadowBlur / 2,
      width: "100%",
      height: "100%"
    }, props.children) : null); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]); // update props when input changes

  const updateProps = (0, _react.useCallback)(() => {
    // path
    if (pathRef.current) {
      pathRef.current.style.stroke = typeof strokeColor === 'object' ? "url(#react-js-progrssBar-path".concat(svgId, ")") : strokeColor;
    }

    if (pathGradiantRef.current && typeof strokeColor === 'object') {
      pathGradiantRef.current.children[0].style.stopColor = strokeColor[0];
      pathGradiantRef.current.children[1].style.stopColor = strokeColor[1];
    } // trail


    if (trailRef.current) {
      trailRef.current.style.stroke = typeof trailColor === 'object' ? "url(#react-js-progrssBar-trail".concat(svgId, ")") : trailColor;
    }

    if (trailGradiantRef.current && typeof trailColor === 'object') {
      trailGradiantRef.current.children[0].style.stopColor = trailColor[0];
      trailGradiantRef.current.children[1].style.stopColor = trailColor[1];
    } // background


    if (backgroundColorRef.current) {
      backgroundColorRef.current.style.fill = typeof backgroundColor === 'object' ? "url(#react-js-progrssBar-background".concat(svgId, ")") : backgroundColor;
    }

    if (backgroundColorGradiantRef.current && typeof backgroundColor === 'object') {
      backgroundColorGradiantRef.current.children[0].style.stopColor = backgroundColor[0];
      backgroundColorGradiantRef.current.children[1].style.stopColor = backgroundColor[1];
    } // text


    if (textRef.current) {
      Object.keys(textStyle).forEach(key => textRef.current.style[key] = textStyle[key]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [props.input]);
  (0, _react.useEffect)(() => {
    // update props when input changes without re-rendering
    if (!isFirstMount) updateProps(); // exit if animate on mount disabled.

    if (isFirstMount && !animation.animateOnMount) {
      setoldProgressValue(calcProgress);
      setoldTextValue(input);
      setIsFirstMount(false);
      return;
    } // exit if animate on input change disabled.


    if (!isFirstMount && !animation.animateOnInputChange) {
      setoldProgressValue(calcProgress);
      setoldTextValue(input);
      return;
    } // animate path


    (0, _requestAnimationNumber.requestNum)({
      from: oldProgressValue ? oldProgressValue : circumference * (clockwise ? 1 : -1),
      to: calcProgress,
      duration: animation.duration,
      delay: animation.delay,
      easingFunction: animation.ease
    }, x => {
      // do nothing if unmounted
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = x + 'px';
        if (x === calcProgress) setoldProgressValue(calcProgress);
      }
    }); // animate text if it's not cutom text

    if (!props.customText && props.customText !== '' && animateText) {
      (0, _requestAnimationNumber.requestNum)({
        from: oldTextValue !== null && oldTextValue !== void 0 ? oldTextValue : 0,
        to: input,
        duration: animation.duration,
        delay: animation.delay,
        easingFunction: animation.ease
      }, t => {
        // do nothing if unmounted
        if (textRef.current) {
          textRef.current.innerHTML = t.toFixed(0) + '%';
          if (t === input) setoldTextValue(input);
        }
      }); // update cutstom text
    } else if (textRef.current) textRef.current.innerHTML = props.customText;

    setIsFirstMount(false); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.input]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, type === 'semi circle' ? /*#__PURE__*/_react.default.createElement(SemiCircle, null) : type === 'arc' ? /*#__PURE__*/_react.default.createElement(Arc, null) : /*#__PURE__*/_react.default.createElement(FullCircle, null));
}