import {userAgent} from "./functions.js";

export const hasWindowSupport = typeof window !== 'undefined';
export const hasDocumentSupport = typeof document !== 'undefined';
export const hasNavigatorSupport = typeof navigator !== 'undefined';


export const isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport;

export const isClient = isBrowser

export const isIE = /msie|trident/.test(userAgent);

export const hasIntersectionObserverSupport =
    isBrowser &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    // Edge 15 and UC Browser lack support for `isIntersecting`
    // but we an use intersectionRatio > 0 instead
    // 'isIntersecting' in window.IntersectionObserverEntry.prototype &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;

export const isValidColor = (val) =>  (new Option().style.color = val) === val;

export const isValidSize = (val)  =>  !isNaN(val) || ['rem', 'px', 'em', '%'].some(suffix => val.endsWith(suffix));

export const isString = (value) =>  typeof value === 'string' || value instanceof String;

export const isNumber = (value) => typeof value === 'number' && isFinite(value);

export const isArray = (value) => value && typeof value === 'object' && value.constructor === Array;

export const isFunction = (value) => typeof value === 'function';

export const isObject = (value) =>  value && true && typeof value === 'object' && value.constructor === Object;

export const isUndefined = (value) => typeof value === 'undefined';

export const isNull = (value) => value === null;

export const isBoolean = (value) =>  typeof value === 'boolean';

export const isRegExp = (value) => value && typeof value === 'object' && value.constructor === RegExp;

export const isDate = (value) => value instanceof Date;

export const isSymbol = (value) => typeof value === 'symbol';

export const isScriptLoaded = (src) => document.querySelectorAll(`script[src="${src}"]`).length > 0;

export const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
