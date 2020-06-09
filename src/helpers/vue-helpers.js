import Vue from 'vue';

import { addEventListenerBinding, removeEventListenerBinding, attachEventBinding, detachEventBinding } from './events.js';

/**
 * Manually trigger an event
 *
 * mouseenter, mouseleave, mouseover, keyup, change, click
 *
 * @param {Element} element
 * @param {String} name
 * @param {*} opts
 */
export const triggerEvent = (element, name, options) => {
    if (Vue.prototype.$isServer || !document) { return; }

    let eventName;

    options = {
        bubbles: false,
        cancelable: true,
        ...options
    };

    if (/^mouse|click/.test(name)) {
        eventName = 'MouseEvents';
    } else if (/^key/.test(name)) {
        eventName = 'KeyboardEvent';
    } else {
        eventName = 'HTMLEvents';
    }

    const evt = document.createEvent(eventName);
    evt.initEvent(name, options.bubbles, options.cancelable);

    Object.keys(options).forEach((optionName) => {
        if (optionName !== 'bubbles' && optionName !== 'cancelable') {
            evt[optionName] = options[optionName];
        }
    });

    element.dispatchEvent
        ? element.dispatchEvent(evt)
        : element.fireEvent('on' + name, evt);

    return element;
}

export const on = () => {
    if (!Vue.prototype.$isServer && typeof window !== 'undefined' && window.document.addEventListener) {
        return addEventListenerBinding;
    } else {
        return attachEventBinding;
    }
};

export const off = () => {
    if (!Vue.prototype.$isServer && typeof window !== 'undefined' && window.document.removeEventListener) {
        return removeEventListenerBinding;
    } else {
        return detachEventBinding;
    }
};


export const once = function(el, event, fn) {
    const listener = function() {
        if (fn) {
            fn.apply(this, arguments);
        }

        off(el, event, listener);
    };

    on(el, event, listener);
};

export const getStyleProperty = (element, property) => {
    if (!element || !property || Vue.prototype.$isServer && !window) { return; }

    if (element.currentStyle) {
        return element.currentStyle[property];
    }

    if (window.getComputedStyle.getPropertyValue) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    } else {
        return window.getComputedStyle(element)[property];
    }
}